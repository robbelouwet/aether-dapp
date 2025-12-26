
import React from 'react';
import { LootItem, Rarity } from '../types';

interface ItemDisplayProps {
  item: LootItem;
}

const ItemDisplay: React.FC<ItemDisplayProps> = ({ item }) => {
  const getBadgeClass = (rarity: Rarity) => {
    switch (rarity) {
      case Rarity.LEGENDARY: return 'badge-warning';
      case Rarity.EPIC: return 'badge-secondary';
      case Rarity.RARE: return 'badge-primary';
      case Rarity.UNCOMMON: return 'badge-success';
      default: return 'badge-ghost';
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl border border-base-content/10 transition-all hover:scale-105 hover:border-primary/50">
      <figure className="px-4 pt-4">
        <img src={item.imageUrl} alt={item.name} className="rounded-xl h-40 w-full object-cover" />
      </figure>
      <div className="card-body p-4 items-center text-center">
        <div className={`badge ${getBadgeClass(item.rarity)} mb-2`}>{item.rarity}</div>
        <h2 className={`card-title font-cinzel text-lg ${item.colorClass}`}>{item.name}</h2>
        <p className="text-xs opacity-70 mb-2">{item.description}</p>
        <div className="text-sm font-bold opacity-90">
          Odds: <span className="text-accent">{(item.odds * 100).toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
};

export default ItemDisplay;
