import React, { useState } from 'react';
import { UserInventoryItem, RollResult } from '../types';
import {CONTRACT_ADDRESS} from "../hooks/useLootContract"

interface UserViewProps {
  account: string | null;
  connectWallet: () => void;
  inventory: UserInventoryItem[];
  buyTicket: (seed: string, amount: number) => Promise<string | null>;
  loot: () => Promise<RollResult>;
  isLooting: boolean;
  ticketPrice: string;
}

const UserView: React.FC<UserViewProps> = ({
  account,
  connectWallet,
  inventory,
  buyTicket,
  loot,
  isLooting,
  ticketPrice
}) => {
  const [step, setStep] = useState<'buy' | 'wait' | 'mine'>('buy');
  const [seed, setSeed] = useState(Math.floor(Math.random() * Math.pow(10, 16)).toString());
  const [amount, setAmount] = useState(1);
  const [lastResult, setLastResult] = useState<RollResult | null>(null);

  const isPriceReady = ticketPrice !== "..." && ticketPrice !== "0.0";

  const handleBuy = async () => {
    if (!account) {
      connectWallet();
      return;
    }
    try {
      console.log("Bought with seed", seed)
      const hash = await buyTicket(seed, amount);
      if (hash) setStep('wait');
    } catch (e: any) {
      console.error(e);
      alert(e.message || "Transaction failed.");
    }
  };

  const handleMine = async () => {
    try {
      console.log("Looting by seed", seed)
      const result = await loot(seed);
      setLastResult(result);
    } catch (e: any) {
      console.error(e);
      alert(e.message || "Mining failed.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-12 text-center relative overflow-hidden min-h-[550px] flex flex-col justify-center">
            {step === 'buy' && (
              <div className="space-y-6 relative z-10">
                <div className="w-24 h-24 mx-auto bg-indigo-500/10 rounded-[2rem] flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h2 className="text-4xl font-black tracking-tight">Acquire Tickets</h2>
                  <p className="text-slate-400 max-w-sm mx-auto">Purchase valid entries into the loot protocol. Waiting for price verification...</p>
                </div>
                
                {account ? (
                  <>
                    <div className="max-w-xs mx-auto space-y-4 bg-white/5 p-6 rounded-3xl border border-white/5">
                      <div className="form-control">
                        <label className="label-text text-[10px] font-bold text-slate-500 uppercase mb-1">Entropy Seed</label>
                        <input type="text" placeholder="Random string" className="input input-bordered bg-slate-950/50 rounded-xl" value={seed} onChange={e => setSeed(e.target.value)} />
                      </div>
                      <div className="form-control">
                        <label className="label-text text-[10px] font-bold text-slate-500 uppercase mb-1">Batch Amount</label>
                        <input type="number" min="1" max="10" className="input input-bordered bg-slate-950/50 rounded-xl" value={amount} onChange={e => setAmount(parseInt(e.target.value))} />
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-white/5">
                        <span className="text-xs text-slate-500 uppercase font-bold">Total Cost</span>
                        <span className="text-sm font-bold text-indigo-400">
                          {isPriceReady ? `${(parseFloat(ticketPrice) * amount).toFixed(4)} ETH` : 'Loading...'}
                        </span>
                      </div>
                    </div>

                    <button 
                      onClick={handleBuy} 
                      disabled={isLooting || !isPriceReady} 
                      className="btn btn-primary btn-lg rounded-2xl px-12 shadow-xl shadow-indigo-500/20 w-full max-w-xs mx-auto"
                    >
                      {!isPriceReady ? 'Fetching Price...' : isLooting ? <span className="loading loading-spinner"></span> : 'Broadcast Purchase'}
                    </button>
                  </>
                ) : (
                  <button onClick={connectWallet} className="btn btn-primary btn-lg rounded-2xl px-12 shadow-xl shadow-indigo-500/20 w-full max-w-xs mx-auto">
                    Connect MetaMask
                  </button>
                )}
              </div>
            )}

            {step === 'wait' && (
              <div className="space-y-8 py-12 animate-in zoom-in duration-300">
                <div className="relative w-32 h-32 mx-auto">
                   <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"></div>
                   <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                   <div className="absolute inset-0 flex items-center justify-center font-mono text-xl font-bold">...</div>
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold">Maturation Period</h2>
                  <p className="text-slate-400 max-w-xs mx-auto">The network is mining the target block. Please wait for at least one confirmation.</p>
                </div>
                <div className="flex justify-center gap-4">
                  <button onClick={() => setStep('mine')} className="btn btn-primary rounded-2xl px-8 shadow-lg shadow-indigo-500/20">Go to Finalize</button>
                  <button onClick={() => setStep('buy')} className="btn btn-ghost rounded-2xl text-slate-500">Back</button>
                </div>
              </div>
            )}

            {step === 'mine' && (
              <div className="space-y-6 relative z-10 animate-in fade-in duration-500">
                <div className="w-24 h-24 mx-auto bg-emerald-500/10 rounded-[2rem] flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                   <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.628.288a2 2 0 01-1.4.153l-1.397-.4a2 2 0 01-1.301-1.17l-1.455-3.489a2 2 0 00-1.748-1.218l-2.32-.232a.75.75 0 00-.537 1.341l1.68 1.4a2 2 0 01.71 1.766l-.459 2.296a2 2 0 001.373 2.306l1.205.301a2 2 0 002.046-1.192l.142-.284a2 2 0 011.83-1.087h1.432a2 2 0 001.62-.835l.413-.62a2 2 0 011.08-.871l.995-.332a2 2 0 011.332.122l.504.252a.75.75 0 00.916-1.036l-.37-.741z" />
                   </svg>
                </div>
                <h2 className="text-4xl font-black">Mine Challenges</h2>
                <p className="text-slate-400 max-w-sm mx-auto">Extract results using the matured blockhash.</p>
                
                <div className="space-y-4">
                  <button onClick={handleMine} disabled={isLooting} className="btn bg-emerald-600 hover:bg-emerald-500 border-none btn-lg rounded-2xl px-12 text-white shadow-xl shadow-emerald-500/20 w-full max-w-xs mx-auto">
                    {isLooting ? <span className="loading loading-spinner"></span> : 'Claim Artifacts'}
                  </button>
                  <button onClick={() => { setStep('buy'); setLastResult(null); }} className="btn btn-link btn-xs text-slate-500 no-underline">New Cycle</button>
                </div>

                {lastResult && (
                  <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-3xl animate-in zoom-in">
                    {lastResult.success ? (
                      <div className="space-y-3">
                        <div className="text-emerald-400 font-bold uppercase text-xs tracking-widest">Protocol Hit Detected</div>
                        <h4 className="text-2xl font-black">{lastResult.blueprintName}</h4>
                        <div className="badge badge-emerald badge-outline text-[10px] font-bold">{lastResult.tierName} Artifact</div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="text-slate-500 uppercase text-xs font-bold tracking-widest">Challenge Failed</div>
                        <p className="text-slate-400 italic text-sm">No match found for this seed and block combination.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold px-2">Recently Mined</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {inventory.slice(0, 6).map((item, idx) => (
                <div key={idx} className="bg-slate-900/50 border border-white/5 rounded-2xl p-4 flex gap-4 items-center text-left">
                  <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 border border-indigo-500/10">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold truncate">{item.blueprintName}</h4>
                    <p className="text-[10px] font-mono text-slate-500 uppercase">{item.tierName} • {item.mintId.slice(0, 12)}...</p>
                  </div>
                </div>
              ))}
              {inventory.length === 0 && (
                <div className="col-span-2 py-12 text-center text-slate-600 italic border border-dashed border-white/10 rounded-[2rem]">
                  Vault currently empty.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-8 sticky top-32 space-y-8">
            <h3 className="text-xl font-bold mb-6">Execution Flow</h3>
            <div className="space-y-6 text-slate-400">
              <div className="flex gap-4">
                <div className="flex-none w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center font-bold text-indigo-400 border border-indigo-500/20">1</div>
                <div>
                  <h4 className="font-bold text-sm text-white">Purchase (buyTicket)</h4>
                  <p className="text-xs leading-relaxed">Sends Ether to the contract and records the next block as your source of luck.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-none w-10 h-10 rounded-full bg-white/5 flex items-center justify-center font-bold text-slate-400 border border-white/5">2</div>
                <div>
                  <h4 className="font-bold text-sm text-white">Confirmation</h4>
                  <p className="text-xs leading-relaxed">Wait for the maturation block to be solved by the network.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-none w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center font-bold text-emerald-400 border border-emerald-500/20">3</div>
                <div>
                  <h4 className="font-bold text-sm text-white">Extraction (mine)</h4>
                  <p className="text-xs leading-relaxed">Finalizes the modulo check and mints your NFT.</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5">
              <div className="bg-black/40 p-4 rounded-3xl border border-white/5 text-center">
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">Active Contract</p>
                 <code className="text-[10px] block truncate text-indigo-300 font-mono">
                    {CONTRACT_ADDRESS}
                 </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserView;