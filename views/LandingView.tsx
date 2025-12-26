import React from 'react';

interface SellingPointProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const SellingPoint: React.FC<SellingPointProps> = ({ title, description, icon }) => (
  <div className="p-8 bg-slate-900/50 border border-white/5 rounded-3xl hover:border-indigo-500/30 transition-all group">
    <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
  </div>
);

interface LandingViewProps {
  onEnterApp: () => void;
  onEnterDev: () => void;
}

const LandingView: React.FC<LandingViewProps> = ({ onEnterApp, onEnterDev }) => {
  return (
    <div className="animate-in fade-in duration-700">
      <section className="relative py-24 md:py-32 px-6 overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl aspect-square bg-indigo-600/10 blur-[120px] rounded-full -z-10"></div>
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xs font-bold text-indigo-400 uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            On-Chain Randomness Engine
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-tight">
            Transparent Loot.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Verifiable Rarity.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
            The world's first lootbox protocol where the odds are immutable, the ownership is absolute, and the randomness is provable on the blockchain.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button onClick={onEnterApp} className="btn btn-primary btn-lg rounded-2xl px-12 text-lg shadow-xl shadow-indigo-500/20">
              Enter User Portal
            </button>
            <button onClick={onEnterDev} className="btn btn-ghost btn-lg rounded-2xl border border-white/10 px-12 text-lg">
              Developer Portal
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Why Native Looting?</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Traditional gaming lootboxes are black boxes. We've decoded the process and moved it to the ledger.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SellingPoint 
            title="Provably Fair RNG"
            description="No more guessing. Every roll is powered by on-chain VRF (Verifiable Random Function), ensuring the developer cannot tamper with individual outcomes."
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>}
          />
          <SellingPoint 
            title="Immutable Drop Rates"
            description="Drop rates are hard-coded into the smart contract. Developers can't 'stealth-nerf' an item's rarity without a visible, public transaction on the blockchain."
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>}
          />
          <SellingPoint 
            title="Instant Interoperability"
            description="Every item you loot is a standard ERC-721 NFT. Move them instantly to marketplaces, use them in other compatible dApps, or hold them as rare digital assets."
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>}
          />
          <SellingPoint 
            title="Absolute Ownership"
            description="Unlike centralized games, no one can take your loot away. It lives in your wallet, protected by your private keys. Not the company's servers."
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>}
          />
          <SellingPoint 
            title="Secondary Market Liquidity"
            description="Loot it, then sell it. On-chain lootboxes create an immediate economy. Rare drops are liquid assets that can be swapped for stablecoins instantly."
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
          />
          <SellingPoint 
            title="Provable History"
            description="Every mint generates a permanent record on the blockchain, preserving the rarity and historical data of your artifact forever."
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
          />
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="bg-indigo-600 rounded-[3rem] p-12 md:p-20 text-center space-y-8 shadow-2xl shadow-indigo-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Ready to Roll?</h2>
          <p className="text-indigo-100/80 text-lg max-w-xl mx-auto">Join thousands of users minting the next generation of digital artifacts on a fair playing field.</p>
          <button onClick={onEnterApp} className="btn bg-white text-indigo-600 hover:bg-slate-100 border-none btn-lg rounded-2xl px-12">
            Launch User Dapp
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingView;