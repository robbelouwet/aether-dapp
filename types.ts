
export enum Rarity {
  COMMON = 'Common',
  UNCOMMON = 'Uncommon',
  RARE = 'Rare',
  EPIC = 'Epic',
  LEGENDARY = 'Legendary'
}

export interface LootItem {
  id: string;
  name: string;
  rarity: Rarity;
  description: string;
  odds: number;
  imageUrl: string;
  colorClass: string;
}

export interface Tier {
  name: string;
  moduloTarget: number;
  rarity: number; // Used as the Tier ID
}

export interface Blueprint {
  tierRarity: number;
  name: string;
  maxSupply: number;
}

export interface UserTicket {
  targetBlock: number;
  seed: string;
  isProcessed: boolean;
}

export interface UserInventoryItem {
  mintId: string;
  tierName: string;
  blueprintName: string;
  timestamp: number;
  itemId: string;
}

export interface RollResult {
  success: boolean;
  tierName?: string;
  blueprintName?: string;
  transactionHash?: string;
}
