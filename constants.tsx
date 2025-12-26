
import { LootItem, Rarity } from './types';

export const TICKETS_PENDING_STORAGE_KEY = 'aether_loot_pending_tickets';

// Catalog of items for display and metadata lookup
export const CATALOG: LootItem[] = [
  {
    id: 'Common Relic',
    name: 'Common Relic',
    rarity: Rarity.COMMON,
    description: 'A simple artifact found in the ancient ruins.',
    odds: 0.6,
    imageUrl: 'https://images.unsplash.com/photo-1614728263952-84ea206f9c41?auto=format&fit=crop&q=80&w=400',
    colorClass: 'text-slate-400'
  },
  {
    id: 'Aether Blade',
    name: 'Aether Blade',
    rarity: Rarity.RARE,
    description: 'A blade forged from pure starlight and high-frequency harmonics.',
    odds: 0.1,
    imageUrl: 'https://images.unsplash.com/photo-1590242421691-860b135c345b?auto=format&fit=crop&q=80&w=400',
    colorClass: 'text-blue-400'
  },
  {
    id: 'Chronos Core',
    name: 'Chronos Core',
    rarity: Rarity.LEGENDARY,
    description: 'The pulsating heart of a fallen temporal titan.',
    odds: 0.01,
    imageUrl: 'https://images.unsplash.com/photo-1506318137071-a8e063b4b47e?auto=format&fit=crop&q=80&w=400',
    colorClass: 'text-amber-400'
  }
];
