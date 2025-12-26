import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingView from './views/LandingView';
import UserView from './views/UserView';
import DeveloperView from './views/DeveloperView';
import { useWeb3 } from './hooks/useWeb3';
import { useLootContract } from './hooks/useLootContract';

const App: React.FC = () => {
  const [activePortal, setActivePortal] = useState<'landing' | 'user' | 'dev'>('landing');
  const { account, signer, connect, isConnecting } = useWeb3();
  const { 
    inventory, 
    loading, 
    ticketPrice, 
    buyTicket, 
    mine, 
    createTier, 
    createBlueprint 
  } = useLootContract(signer, account);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar 
        activePortal={activePortal} 
        setActivePortal={setActivePortal}
        account={account}
        connectWallet={connect}
        isConnecting={isConnecting}
      />

      <main className="w-full">
        {activePortal === 'landing' && (
          <LandingView 
            onEnterApp={() => setActivePortal('user')} 
            onEnterDev={() => setActivePortal('dev')} 
          />
        )}
        
        {activePortal === 'user' && (
          <UserView
                      account={account}
            connectWallet={connect}
             
            inventory={inventory}
            buyTicket={buyTicket}
            mine={mine}
            isLooting={loading}
            ticketPrice={ticketPrice}
          />
        )}

        {activePortal === 'dev' && (
          <DeveloperView
                      account={account}
            connectWallet={connect} 
            onAddTier={createTier}
            onAddBlueprint={createBlueprint}
            loading={loading}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;