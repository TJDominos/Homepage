const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

// Update imports
content = content.replace(
  'import { ChevronDown, ChevronsUpDown, Coins, Info } from "lucide-react";',
  'import { ChevronDown, ChevronsUpDown, Coins, Info, ArrowRight } from "lucide-react";'
);

// Update mock data
const oldRanking = `const ASSETS_RANKING = [
  { symbol: "JUP", users: 124, lastTime: "2 mins ago" },
  { symbol: "Bonk", users: 98, lastTime: "5 mins ago" },
  { symbol: "RAY", users: 76, lastTime: "12 mins ago" },
  { symbol: "WLT", users: 65, lastTime: "15 mins ago" },
  { symbol: "Gcoin", users: 54, lastTime: "30 mins ago" },
  { symbol: "TRUMP", users: 45, lastTime: "1 hr ago" },
  { symbol: "PUMP", users: 22, lastTime: "3 hrs ago" },
  { symbol: "ANSEM", users: 12, lastTime: "5 hrs ago" },
  { symbol: "Fartcoin", users: 5, lastTime: "1 day ago" },
];`;

const newRanking = `const ASSETS_RANKING = [
  { symbol: "JUP", users: 124, lastTime: "2 mins ago", amount: "12,300", usdValue: "$2,384.10" },
  { symbol: "Bonk", users: 98, lastTime: "5 mins ago", amount: "450M", usdValue: "$1,377.00" },
  { symbol: "RAY", users: 76, lastTime: "12 mins ago", amount: "420", usdValue: "$630.00" },
  { symbol: "WLT", users: 65, lastTime: "15 mins ago", amount: "3.2M", usdValue: "$480.00" },
  { symbol: "Gcoin", users: 54, lastTime: "30 mins ago", amount: "4,000", usdValue: "$400.00" },
  { symbol: "TRUMP", users: 45, lastTime: "1 hr ago", amount: "15,000", usdValue: "$150.00" },
  { symbol: "PUMP", users: 22, lastTime: "3 hrs ago", amount: "10M", usdValue: "$100.00" },
  { symbol: "ANSEM", users: 12, lastTime: "5 hrs ago", amount: "4.5M", usdValue: "$90.00" },
  { symbol: "Fartcoin", users: 5, lastTime: "1 day ago", amount: "1M", usdValue: "$5.00" },
];`;
content = content.replace(oldRanking, newRanking);

// Insert entry button
const targetHtml = `</div>
            ) : (
              <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-2">`;
const entryButton = `</div>
            ) : (
              <div className="mb-5 flex flex-col gap-3">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">`;
// Actually, it's easier to insert it AFTER the grid of Hero stats.
const insertAfterHeroStats = `Across all games, lifetime
                  </div>
                </div>
              </div>
            )}`;
const entryHtml = `Across all games, lifetime
                  </div>
                </div>
              </div>
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
              </div>
            )}`;

content = content.replace(insertAfterHeroStats, entryHtml);

fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
console.log('Fixed PayoutPage entry button');
