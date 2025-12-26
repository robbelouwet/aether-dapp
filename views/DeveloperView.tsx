import React, { useState } from 'react';

interface DeveloperViewProps {
    account: string | null;
  connectWallet: () => void;
  onAddTier: (name: string, target: number, rarity: number) => Promise<void>;
  onAddBlueprint: (tierId: number, name: string, supply: number) => Promise<void>;
  loading: boolean;
}

const DeveloperView: React.FC<DeveloperViewProps> = ({ account, connectWallet,onAddTier, onAddBlueprint, loading }) => {
  const [tierData, setTierData] = useState({ name: '', target: 0, rarity: 10 });
  const [bpData, setBpData] = useState({ tierId: 10, name: '', supply: 100 });

  const handleTierSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onAddTier(tierData.name, tierData.target, tierData.rarity);
      setTierData({ name: '', target: 0, rarity: 10 });
    } catch (err: any) {
      alert(err.reason || err.message || "Failed to create tier");
    }
  };

  const handleBpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onAddBlueprint(bpData.tierId, bpData.name, bpData.supply);
      setBpData({ tierId: 10, name: '', supply: 100 });
    } catch (err: any) {
      alert(err.reason || err.message || "Failed to create blueprint");
    }
  };

  if (!account) {
    return (
      <div className="max-w-md mx-auto py-32 text-center space-y-8 animate-in fade-in zoom-in">
        <div className="w-24 h-24 mx-auto bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400">
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Admin Connection Required</h2>
          <p className="text-slate-400">You must connect your authorized wallet to access the Architect Portal configuration.</p>
        </div>
        <button onClick={connectWallet} className="btn btn-primary rounded-2xl px-12">Connect Admin Wallet</button>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 space-y-12 animate-in fade-in slide-in-from-bottom-4">
      <div className="text-center space-y-4">
         <div className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">Architect Portal</div>
         <h2 className="text-4xl font-bold">Protocol Configuration</h2>
         <p className="text-slate-400">Manage the underlying tiers and item blueprints for the Sepolia Sepolia Contract.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Tier Section */}
        <div className="bg-slate-900 border border-white/5 rounded-3xl p-8 space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm">01</span>
            Add New Tier
          </h3>
          <form onSubmit={handleTierSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label-text text-[10px] uppercase font-bold text-slate-500 mb-1">Tier Name (e.g. Exotic)</label>
              <input type="text" className="input input-bordered bg-slate-800 rounded-xl" value={tierData.name} onChange={e => setTierData({...tierData, name: e.target.value})} required />
            </div>
            <div className="form-control">
              <label className="label-text text-[10px] uppercase font-bold text-slate-500 mb-1">Modulo Target</label>
              <input type="number" className="input input-bordered bg-slate-800 rounded-xl" value={tierData.target} onChange={e => setTierData({...tierData, target: parseInt(e.target.value)})} required />
            </div>
            <div className="form-control">
              <label className="label-text text-[10px] uppercase font-bold text-slate-500 mb-1">Rarity (Modulo Base)</label>
              <input type="number" className="input input-bordered bg-slate-800 rounded-xl" value={tierData.rarity} onChange={e => setTierData({...tierData, rarity: parseInt(e.target.value)})} required />
            </div>
            <button type="submit" disabled={loading} className="btn btn-block btn-primary rounded-xl mt-4">
              {loading ? <span className="loading loading-spinner"></span> : 'Deploy Tier'}
            </button>
          </form>
        </div>

        {/* Blueprint Section */}
        <div className="bg-slate-900 border border-white/5 rounded-3xl p-8 space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm">02</span>
            Add Blueprint
          </h3>
          <form onSubmit={handleBpSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label-text text-[10px] uppercase font-bold text-slate-500 mb-1">Tier Rarity ID</label>
              <input type="number" className="input input-bordered bg-slate-800 rounded-xl" value={bpData.tierId} onChange={e => setBpData({...bpData, tierId: parseInt(e.target.value)})} required />
            </div>
            <div className="form-control">
              <label className="label-text text-[10px] uppercase font-bold text-slate-500 mb-1">Blueprint Name</label>
              <input type="text" className="input input-bordered bg-slate-800 rounded-xl" value={bpData.name} onChange={e => setBpData({...bpData, name: e.target.value})} required />
            </div>
            <div className="form-control">
              <label className="label-text text-[10px] uppercase font-bold text-slate-500 mb-1">Max Supply</label>
              <input type="number" className="input input-bordered bg-slate-800 rounded-xl" value={bpData.supply} onChange={e => setBpData({...bpData, supply: parseInt(e.target.value)})} required />
            </div>
            <button type="submit" disabled={loading} className="btn btn-block bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl mt-4 border-none">
              {loading ? <span className="loading loading-spinner"></span> : 'Deploy Blueprint'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeveloperView;