
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-24 py-12 border-t border-white/5 text-center">
      <p className="text-slate-500 text-sm">© 2025 LOOTBOX.DAPP | Built for the decentralized future.</p>
      <div className="flex justify-center gap-6 mt-4 grayscale opacity-50">
        <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=032" className="h-6" alt="ETH" />
        <img src="https://cryptologos.cc/logos/metamask-mask-logo.png?v=032" className="h-6" alt="MetaMask" />
      </div>
    </footer>
  );
};

export default Footer;
