const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

const targetStr = `              </div>
            )}`;

const replaceStr = `              </div>
            )}
            
            <div className="mb-5">
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

content = content.replace(targetStr, replaceStr);

fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
console.log('Fixed PayoutPage entry button 2');
