import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";

const SEPOLIA_CHAIN_ID = "0xaa36a7"; // 11155111 in hex

export const useWeb3 = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const switchNetwork = async () => {
    if (!(window as any).ethereum) return;
    try {
      await (window as any).ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: SEPOLIA_CHAIN_ID }],
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await (window as any).ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: SEPOLIA_CHAIN_ID,
                chainName: "Sepolia Test Network",
                nativeCurrency: {
                  name: "Sepolia Ether",
                  symbol: "ETH",
                  decimals: 18,
                },
                rpcUrls: ["https://rpc.sepolia.org"],
                blockExplorerUrls: ["https://sepolia.etherscan.io"],
              },
            ],
          });
        } catch (addError) {
          console.error("Failed to add Sepolia network:", addError);
        }
      }
    }
  };

  const connect = useCallback(async () => {
    if (!(window as any).ethereum) {
      alert("MetaMask not found!");
      return;
    }
    setIsConnecting(true);
    try {
      const _provider = new ethers.BrowserProvider((window as any).ethereum);

      // Check network first
      const network = await _provider.getNetwork();
      const currentChainId = "0x" + network.chainId.toString(16);
      setChainId(currentChainId);

      if (currentChainId !== SEPOLIA_CHAIN_ID) {
        await switchNetwork();
      }

      const accounts = await _provider.send("eth_requestAccounts", []);
      const _signer = await _provider.getSigner();

      setProvider(_provider);
      setSigner(_signer);
      setAccount(accounts[0]);
    } catch (err) {
      console.error("Connection error:", err);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  useEffect(() => {
    if ((window as any).ethereum) {
      (window as any).ethereum.on("accountsChanged", (accounts: string[]) => {
        setAccount(accounts[0] || null);
        if (!accounts[0]) setSigner(null);
      });
      (window as any).ethereum.on("chainChanged", (hexId: string) => {
        setChainId(hexId);
        window.location.reload();
      });
    }
  }, []);

  return {
    account,
    provider,
    signer,
    chainId,
    connect,
    isConnecting,
    switchNetwork,
  };
};
