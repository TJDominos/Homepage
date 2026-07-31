const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

const oldHeroStats = `{/* ---------- Hero stats ---------- */}
            {loading || !totals ? (
              <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                {[0, 1].map((i) => (
                  <div
                    key={i}
                    className="h-[104px] animate-pulse rounded-(--radius-lg) bg-(--color-black-alpha-5)"
                  />
                ))}
              </div>
            ) : (
              <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                <button 
                  onClick={() => setSubTab("Assets")}
                  className="payout-card p-5 flex flex-col text-left hover:bg-black/[0.02] transition-colors group cursor-pointer relative"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-1.5 text-sm font-medium text-(--text-subtle)">
                      <Coins size={14} className="text-(--color-coin)" aria-hidden />
                      Total Rewards
                    </div>
                    <div className="w-6 h-6 rounded-full bg-black/5 flex items-center justify-center text-black/40 group-hover:bg-purple-500/10 group-hover:text-purple-600 transition-colors shrink-0">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                  <div className="mt-1 text-[24px] font-bold leading-none tracking-tight text-(--text-primary)">
                    {fmtGcoin(Math.round(heroPaidOut))}
                  </div>
                  <div className="mt-2 text-xs text-(--color-black-alpha-50) flex items-center justify-between w-full">
                    <span>Across all games, lifetime</span>
                    <span className="text-black font-medium group-hover:text-purple-600 transition-colors whitespace-nowrap ml-2">
                      Asset Tracker
                    </span>
                  </div>
                </button>
                {gameCategory === "Rand Game" && (
                  <div className="payout-card p-5">
                    <div className="text-sm font-medium text-(--text-subtle)">
                      Actual RTP
                    </div>
                    <div className="mt-1 text-[24px] font-bold leading-none tracking-tight text-(--text-primary)">
                      {totals.overallActual === null
                        ? "–"
                        : fmtPct(totals.overallActual)}
                    </div>
                    <div className="mt-2 text-xs text-(--color-black-alpha-50)">
                      vs {totals.weightedTheo.toFixed(2)}% weighted theoretical
                    </div>
                  </div>
                )}
              </div>
            )}`;

const newHeroStats = `{/* ---------- Hero stats ---------- */}
            {loading || !totals ? (
              <div className="mb-5">
                <div className="h-[104px] animate-pulse rounded-(--radius-lg) bg-(--color-black-alpha-5)" />
              </div>
            ) : (
              <div className="mb-5">
                <button 
                  onClick={() => setSubTab("Assets")}
                  className="payout-card p-5 flex flex-col text-left hover:bg-black/[0.02] transition-colors group cursor-pointer relative w-full"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-1.5 text-sm font-medium text-(--text-subtle)">
                      <Coins size={14} className="text-(--color-coin)" aria-hidden />
                      Total Rewards
                    </div>
                    <div className="w-6 h-6 rounded-full bg-black/5 flex items-center justify-center text-black/40 group-hover:bg-purple-500/10 group-hover:text-purple-600 transition-colors shrink-0">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                  <div className="mt-1 text-[24px] font-bold leading-none tracking-tight text-(--text-primary)">
                    {fmtGcoin(Math.round(heroPaidOut))}
                  </div>
                  <div className="mt-2 text-xs text-(--color-black-alpha-50) flex items-center justify-between w-full">
                    <span>Across all games, lifetime</span>
                    <span className="text-black font-medium group-hover:text-purple-600 transition-colors whitespace-nowrap ml-2">
                      Asset Tracker
                    </span>
                  </div>
                </button>
              </div>
            )}`;

content = content.replace(oldHeroStats, newHeroStats);
fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
console.log("Updated hero stats layout");
