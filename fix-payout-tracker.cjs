const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

const targetToRemove = `            <div className="mb-5">
              <button 
                onClick={() => setSubTab("Assets")}
                className="w-full payout-card p-4 flex items-center justify-between hover:bg-black/[0.02] transition-colors group cursor-pointer text-left"
              >
                <div className="flex flex-col">
                  <span className="font-bold text-(--text-primary) text-[15px] group-hover:text-blue-600 transition-colors">Asset Withdrawals Tracker</span>
                  <span className="text-[13px] text-(--text-subtle) mt-0.5">Explore real-time data on withdrawn tokens, amounts and users</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-black/40 group-hover:bg-blue-500/10 group-hover:text-blue-600 transition-colors shrink-0">
                  <ArrowRight size={16} />
                </div>
              </button>
            </div>`;

content = content.replace(targetToRemove, '');

const oldTotalPayout = `<div className="payout-card p-5">
                  <div className="flex items-center gap-1.5 text-sm font-medium text-(--text-subtle)">
                    <Coins size={14} className="text-(--color-coin)" aria-hidden />
                    Total Payout
                  </div>
                  <div className="mt-1 text-[24px] font-bold leading-none tracking-tight text-(--text-primary)">
                    {fmtUsd(Math.round(heroPaidOut))}
                  </div>
                  <div className="mt-2 text-xs text-(--color-black-alpha-50)">
                    Across all games, lifetime
                  </div>
                </div>`;

const newTotalPayout = `<button 
                  onClick={() => setSubTab("Assets")}
                  className="payout-card p-5 flex flex-col text-left hover:bg-black/[0.02] transition-colors group cursor-pointer relative"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-1.5 text-sm font-medium text-(--text-subtle)">
                      <Coins size={14} className="text-(--color-coin)" aria-hidden />
                      Total Payout
                    </div>
                    <div className="w-6 h-6 rounded-full bg-black/5 flex items-center justify-center text-black/40 group-hover:bg-blue-500/10 group-hover:text-blue-600 transition-colors shrink-0">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                  <div className="mt-1 text-[24px] font-bold leading-none tracking-tight text-(--text-primary)">
                    {fmtUsd(Math.round(heroPaidOut))}
                  </div>
                  <div className="mt-2 text-xs text-(--color-black-alpha-50) flex items-center justify-between w-full">
                    <span>Across all games, lifetime</span>
                    <span className="text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ml-2">
                      Asset Tracker
                    </span>
                  </div>
                </button>`;

content = content.replace(oldTotalPayout, newTotalPayout);

fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
console.log('Fixed total payout card link');
