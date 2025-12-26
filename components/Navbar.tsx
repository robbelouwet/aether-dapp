
import React from 'react';

interface NavbarProps {
  activePortal: 'landing' | 'user' | 'dev';
  setActivePortal: (portal: 'landing' | 'user' | 'dev') => void;
  account: string | null;
  connectWallet: () => void;
  isConnecting: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ 
  activePortal, 
  setActivePortal, 
  account, 
  connectWallet, 
  isConnecting 
}) => {
  return (
    <nav className="border-b border-white/10 px-6 py-4 flex justify-between items-center backdrop-blur-md sticky top-0 z-50 bg-slate-950/80">
      <div className="flex items-center gap-8">
        <h1 
          className="text-2xl font-black tracking-tighter text-indigo-400 cursor-pointer" 
          onClick={() => setActivePortal('landing')}
        >
          LOOTBOX.DAPP
        </h1>
        <div className="hidden md:flex gap-2">
          <button 
            onClick={() => setActivePortal('landing')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${activePortal === 'landing' ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-slate-400'}`}
          >
            Home
          </button>
          <button 
            onClick={() => setActivePortal('user')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${activePortal === 'user' ? 'bg-indigo-600 text-white' : 'hover:bg-white/5 text-slate-400'}`}
          >
            User Portal
          </button>
          <button 
            onClick={() => setActivePortal('dev')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${activePortal === 'dev' ? 'bg-emerald-600 text-white' : 'hover:bg-white/5 text-slate-400'}`}
          >
            Developer Portal
          </button>
        </div>
      </div>

      <button 
        onClick={connectWallet}
        disabled={isConnecting}
        className={`btn btn-sm sm:btn-md ${account ? 'btn-ghost border border-white/10' : 'btn-primary rounded-full px-6'}`}
      >
        {isConnecting ? (
          <span className="loading loading-spinner loading-xs"></span>
        ) : account ? (
          `${account.slice(0, 6)}...${account.slice(-4)}`
        ) : (
          'Connect MetaMask'
        )}
      </button>
    </nav>
  );
};

export default Navbar;
