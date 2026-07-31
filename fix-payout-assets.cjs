const fs = require('fs');

let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

// Imports
if (!content.includes('import { AssetIcon }')) {
  content = content.replace(
    'import { getSysAvatar } from "../utils/avatar";',
    'import { getSysAvatar } from "../utils/avatar";\nimport { AssetIcon } from "../components/shared/AssetIcon";'
  );
}

const rankingMock = `
const ASSETS_RANKING = [
  { symbol: "JUP", users: 124, lastTime: "2 mins ago" },
  { symbol: "Bonk", users: 98, lastTime: "5 mins ago" },
  { symbol: "RAY", users: 76, lastTime: "12 mins ago" },
  { symbol: "WLT", users: 65, lastTime: "15 mins ago" },
  { symbol: "Gcoin", users: 54, lastTime: "30 mins ago" },
  { symbol: "TRUMP", users: 45, lastTime: "1 hr ago" },
  { symbol: "PUMP", users: 22, lastTime: "3 hrs ago" },
  { symbol: "ANSEM", users: 12, lastTime: "5 hrs ago" },
  { symbol: "Fartcoin", users: 5, lastTime: "1 day ago" },
];
`;
content = content.replace('export function PayoutPage() {', rankingMock + '\nexport function PayoutPage() {');

const newAssetsTab = `        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-12 gap-4 px-4 py-2 text-[12px] font-semibold uppercase tracking-wide text-(--color-black-alpha-50)">
            <div className="col-span-1 text-center">Rank</div>
            <div className="col-span-5 sm:col-span-4">Asset</div>
            <div className="col-span-3 text-right">Users</div>
            <div className="col-span-3 sm:col-span-4 text-right">Last Withdrawn</div>
          </div>
          <div className="flex flex-col gap-2">
            {ASSETS_RANKING.map((item, i) => (
              <div key={item.symbol} className="grid grid-cols-12 gap-4 items-center payout-card px-4 py-3 transition-colors hover:bg-black/5">
                <div className="col-span-1 text-center font-bold text-black/40 text-[14px]">
                  {i + 1}
                </div>
                <div className="col-span-5 sm:col-span-4 flex items-center gap-2">
                  <AssetIcon type={item.symbol} className="w-6 h-6 sm:w-8 sm:h-8" />
                  <span className="font-semibold text-[14px] text-black">{item.symbol}</span>
                </div>
                <div className="col-span-3 text-right font-medium text-[13px] text-black/80">
                  {item.users.toLocaleString()}
                </div>
                <div className="col-span-3 sm:col-span-4 text-right text-[12px] text-black/50">
                  {item.lastTime}
                </div>
              </div>
            ))}
          </div>
        </div>`;

const replaceRegex = /<div className="payout-card p-8 text-center text-sm text-\(--text-subtle\)">\s*No assets data available yet.\s*<\/div>/;
content = content.replace(replaceRegex, newAssetsTab);

fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
console.log('Fixed PayoutPage');
