import { useState, useCallback, useEffect } from "react";
import { ethers } from "ethers";
import { UserInventoryItem, RollResult } from "../types";

import {
  initSDK,
  createInstance,
  SepoliaConfig,
} from "@zama-fhe/relayer-sdk/bundle";
import { JsonRpcSigner } from "ethers";
const init = async () => {
  await initSDK(); // Load FHE
  const config = { ...SepoliaConfig, network: window.ethereum };
  return createInstance(config);
};

init().then((instance) => {
  console.log(instance);
});

export const CONTRACT_ADDRESS = "0x0842A24806Deb96c70576e2b380042042c009F83";

const LOOT_ABI = [
  "function addTier(string name, uint256 modulo_target, uint256 rarity) public returns (uint256)",
  "function addBlueprint(uint256 tier_rarity, string name, uint256 max_supply) public",
  "function buyTicket(string memory _seed, uint256 amount) public payable",
  "function loot(string memory seed) public",
  "function getTicketPrice() public view returns (uint256)",
  "event minedSuccessfully(address indexed player, string name, uint256 blockNumber, string tierName, string blueprintName, uint256 rarity)",
];

export const useLootContract = (signer: any, account: string | null) => {
  const [loading, setLoading] = useState(false);
  const [ticketPriceWei, setTicketPriceWei] = useState<bigint>(0n);
  const [ticketPriceEth, setTicketPriceEth] = useState<string>("...");
  const [inventory, setInventory] = useState<UserInventoryItem[]>([]);

  useEffect(() => {
    (async () => {
      if (!signer) return;

      const contract = new ethers.Contract(CONTRACT_ADDRESS, LOOT_ABI, signer);
      const userAddress = await signer.getAddress(); // ensure correct checksum
      const filter = contract.filters.minedSuccessfully(userAddress);

      const fromBlock = 0; // or the block you deployed the contract
      const logs = await contract.queryFilter(filter, fromBlock, "latest");

      console.log("fetched logs:", logs);

      const items: UserInventoryItem[] = logs.map((log) => {
        const parsed = contract.interface.parseLog(log); // parse raw log
        return {
          mintId: log.transactionHash,
          tierName: parsed.args.tier_name,
          blueprintName: parsed.args.blueprint_name,
          timestamp: Date.now(),
          itemId: parsed.args.rarity.toString(),
        };
      });

      setInventory(items.reverse());
    })();
  }, [signer]);

  const fetchConfig = useCallback(async () => {
    if (!signer) return;
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, LOOT_ABI, signer);
      const price = await contract.getTicketPrice();
      setTicketPriceWei(price);
      setTicketPriceEth(ethers.formatEther(price));
      console.log(
        "Current contract ticket price:",
        ethers.formatEther(price),
        "ETH"
      );
    } catch (e) {
      console.error("Failed to fetch price:", e);
    }
  }, [signer]);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  const buyTicket = async (seed: string, amount: number) => {
    if (!signer)
      throw new Error("Wallet not connected. Please connect MetaMask.");
    setLoading(true);
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, LOOT_ABI, signer);

      // RE-FETCH PRICE IMMEDIATELY: Don't trust stale component state for money-handling
      let currentPriceWei = ticketPriceWei;
      if (currentPriceWei === 0n) {
        console.log("Price not in state, fetching fresh price...");
        currentPriceWei = await contract._ticket_price();
      }

      if (currentPriceWei === 0n) {
        throw new Error("Could not determine ticket price. Please try again.");
      }

      const totalCost = currentPriceWei * BigInt(amount);
      console.log(
        `Sending buyTicket. Amount: ${amount}. Total Wei: ${totalCost.toString()}`
      );

      // Call the contract
      const tx = await contract.buyTicket(seed, amount, {
        value: totalCost,
        gasLimit: 400000, // Slightly increased for safety
      });

      const receipt = await tx.wait();
      return receipt.hash;
    } catch (e: any) {
      console.error("Buy ticket error details:", e);
      if (e.code === "ACTION_REJECTED")
        throw new Error("Transaction was rejected.");
      throw new Error(
        e.reason || e.message || "Smart contract transaction failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const loot = async (seed: string): Promise<RollResult> => {
    if (!signer) throw new Error("Wallet not connected.");
    setLoading(true);
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, LOOT_ABI, signer);
      const tx = await contract.loot(seed, {
        gasLimit: 6000000,
      });

      const receipt = await tx.wait();
      let result: RollResult = {
        success: false,
        transactionHash: receipt.hash,
      };

      for (const log of receipt.logs) {
        try {
          const parsedLog = contract.interface.parseLog(log as any);
          if (parsedLog?.name === "minedSuccessfully") {
            result = {
              success: true,
              tierName: parsedLog.args.tierName,
              blueprintName: parsedLog.args.blueprintName,
              transactionHash: receipt.hash,
            };

            const newItem: UserInventoryItem = {
              mintId: receipt.hash,
              tierName: parsedLog.args.tierName,
              blueprintName: parsedLog.args.blueprintName,
              timestamp: Date.now(),
              itemId: parsedLog.args.blueprintName,
            };
            setInventory((prev) => [newItem, ...prev]);
          }
        } catch (e) {}
      }
      return result;
    } catch (e: any) {
      console.error("Mine error details:", e);
      throw new Error(e.reason || e.message || "Mining failed.");
    } finally {
      setLoading(false);
    }
  };

  const createTier = async (name: string, target: number, rarity: number) => {
    if (!signer) throw new Error("Wallet not connected");
    setLoading(true);
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, LOOT_ABI, signer);
      const tx = await contract.addTier(name, target, rarity, {
        gasLimit: 250000,
      });
      await tx.wait();
    } finally {
      setLoading(false);
    }
  };

  const createBlueprint = async (
    tierRarity: number,
    name: string,
    supply: number
  ) => {
    if (!signer) throw new Error("Wallet not connected");
    setLoading(true);
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, LOOT_ABI, signer);
      const tx = await contract.addBlueprint(tierRarity, name, supply, {
        gasLimit: 250000,
      });
      await tx.wait();
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    ticketPrice: ticketPriceEth,
    inventory,
    buyTicket,
    loot: loot,
    createTier,
    createBlueprint,
  };
};
