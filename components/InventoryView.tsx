import React from 'react';
import { UserInventoryItem, LootItem } from '../types';
import { CATALOG } from '../constants';

interface InventoryViewProps {
  inventory: UserInventoryItem[];
}

const InventoryView: React.FC<InventoryViewProps> = ({ inventory }) => {
  if (inventory.length === 0) {
    return (
      <div className="text-center py-10 border-2 border-dashed border-base-content/20 rounded-box">
        <p className="opacity-50 italic">Your vault is currently empty...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {inventory.map((entry) => {
        const item = CATALOG.find(c => c.id === entry.itemId);
        if (!item) return null;

        return (
          <div key={entry.mintId} className="card bg-base-200 shadow-md border border-base-content/5">
            <div className="card-body p-4">
              <div className="flex items-center gap-3">
                <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                <div>
                  <h3 className={`font-cinzel text-md ${item.colorClass}`}>{item.name}</h3>
                  <p className="text-[10px] opacity-50">Mint: {entry.mintId.slice(0, 12)}...</p>
                </div>
              </div>
              <div className="card-actions justify-end mt-2">
                <div className="text-[10px] opacity-40">
                  {new Date(entry.timestamp).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InventoryView;