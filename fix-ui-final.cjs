const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

// 1. Move Title
const oldHeader = `<div className="mb-5 flex flex-col items-start gap-3">
        <div className="flex flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {["Rewards", "Assets"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSubTab(tab)}
                className={\`w-[60px] sm:w-[80px] h-[28px] rounded-2xl text-[12px] sm:text-sm font-medium transition-colors flex items-center justify-center \${
                  subTab === tab
                    ? "bg-black text-white"
                    : "bg-black/5 text-black/60 hover:text-black hover:bg-black/10"
                }\`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        <h1 className="text-[16px] font-bold text-black mt-2 text-left">
          Site-wide rewards &amp; assets statistics
        </h1>
      </div>`;

const newHeader = `<div className="mb-5 flex flex-col items-start gap-3">
        <h1 className="text-[16px] font-bold text-black text-left">
          Site-wide rewards &amp; assets statistics
        </h1>

        <div className="flex flex-row items-center justify-between gap-2 mt-1">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {["Rewards", "Assets"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSubTab(tab)}
                className={\`w-[60px] sm:w-[80px] h-[28px] rounded-2xl text-[12px] sm:text-sm font-medium transition-colors flex items-center justify-center \${
                  subTab === tab
                    ? "bg-black text-white"
                    : "bg-black/5 text-black/60 hover:text-black hover:bg-black/10"
                }\`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>`;

content = content.replace(oldHeader, newHeader);

// 2. Remove Game name in My Stats
const oldMyStatsGame = `<div className="flex items-center gap-1.5">
                                  <ProductLogo
                                    src={r.logo}
                                    alt={r.name}
                                    className="h-5 w-5 shrink-0 rounded-md border border-(--color-black-alpha-10) object-cover"
                                  />
                                  <span className="truncate text-xs font-semibold text-(--text-primary)">
                                    {r.name}
                                  </span>
                                </div>`;
const newMyStatsGame = `<div className="flex items-center justify-center">
                                  <ProductLogo
                                    src={r.logo}
                                    alt={r.name}
                                    className="h-5 w-5 shrink-0 rounded-md border border-(--color-black-alpha-10) object-cover"
                                  />
                                </div>`;
content = content.replace(oldMyStatsGame, newMyStatsGame);

// 3. Remove Game name in Main Stats
const oldMainStatsGame = `<div className="flex items-center gap-2 md:gap-3">
                                  <ProductLogo
                                    src={g.logo}
                                    alt={g.name}
                                    className="h-8 w-8 shrink-0 rounded-xl border border-black/10 object-cover sm:h-10 sm:w-10"
                                  />
                                  <div className="min-w-0 truncate text-[13px] font-semibold text-black sm:text-[15px]">
                                    {g.name}
                                  </div>
                                </div>`;
const newMainStatsGame = `<div className="flex items-center justify-center">
                                  <ProductLogo
                                    src={g.logo}
                                    alt={g.name}
                                    className="h-8 w-8 shrink-0 rounded-xl border border-black/10 object-cover sm:h-10 sm:w-10"
                                  />
                                </div>`;
content = content.replace(oldMainStatsGame, newMainStatsGame);

// Fix column headers for Game text
content = content.replace(
  /<th className="pl-4 sm:pl-6 pr-3 py-3\.5 md:pr-4 md:py-4">Game<\/th>/,
  '<th className="pl-4 sm:pl-6 pr-3 py-3.5 md:pr-4 md:py-4 text-center">Game</th>'
);

content = content.replace(
  /<th className="pl-2 pr-1\.5 py-2 sm:px-2 whitespace-nowrap">Game<\/th>/,
  '<th className="pl-2 pr-1.5 py-2 sm:px-2 whitespace-nowrap text-center">Game</th>'
);

fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
console.log("Updated title position and removed game names");
