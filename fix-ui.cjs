const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

// 1. Text below reward & assets button
const oldHeader = `<div className="mb-5 flex flex-col items-start gap-3">
        <h1 className="text-[16px] font-bold text-black mb-3 text-left hidden">
          Rewards
        </h1>
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
        {subTab === "Rewards" && (
          <p className="mt-1 text-sm text-(--text-subtle)">
            Site-wide rewards &amp; return-to-player statistics
          </p>
        )}
      </div>`;

const newHeader = `<div className="mb-5 flex flex-col items-start gap-3">
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

content = content.replace(oldHeader, newHeader);

// 2. Category Selector font size
const oldCategoryButtons = `<button
                  onClick={() => { setGameCategory("Rand Game"); setSortKey("actual"); }}
                  className={\`px-4 min-w-[112px] h-[28px] flex shrink-0 items-center justify-center rounded-[12px] text-[14px] leading-[20px] font-medium transition-all \${
                    gameCategory === "Rand Game"
                      ? "bg-white text-black shadow-sm ring-1 ring-black/5"
                      : "text-black/60 hover:text-black"
                  }\`}
                >
                  Rand Game
                </button>
                <button
                  onClick={() => { setGameCategory("Randball"); setSortKey("jackpot"); }}
                  className={\`px-4 min-w-[112px] h-[28px] flex shrink-0 items-center justify-center rounded-[12px] text-[14px] leading-[20px] font-medium transition-all \${
                    gameCategory === "Randball"
                      ? "bg-white text-black shadow-sm ring-1 ring-black/5"
                      : "text-black/60 hover:text-black"
                  }\`}
                >`;

const newCategoryButtons = `<button
                  onClick={() => { setGameCategory("Rand Game"); setSortKey("actual"); }}
                  className={\`px-4 min-w-[112px] h-[28px] flex shrink-0 items-center justify-center rounded-[12px] text-[12px] md:text-[14px] leading-[20px] font-medium transition-all \${
                    gameCategory === "Rand Game"
                      ? "bg-white text-black shadow-sm ring-1 ring-black/5"
                      : "text-black/60 hover:text-black"
                  }\`}
                >
                  Rand Game
                </button>
                <button
                  onClick={() => { setGameCategory("Randball"); setSortKey("jackpot"); }}
                  className={\`px-4 min-w-[112px] h-[28px] flex shrink-0 items-center justify-center rounded-[12px] text-[12px] md:text-[14px] leading-[20px] font-medium transition-all \${
                    gameCategory === "Randball"
                      ? "bg-white text-black shadow-sm ring-1 ring-black/5"
                      : "text-black/60 hover:text-black"
                  }\`}
                >`;
                
content = content.replace(oldCategoryButtons, newCategoryButtons);

// 3. Highlight most recently withdrawn assets
const oldAssetsMapping = `{ASSETS_RANKING.map((item, index) => (
                  <tr
                    key={item.symbol}
                    className="hover:bg-black/5 transition-colors"
                  >
                    <td className="px-2 md:px-4 py-3 md:py-4 text-black/60 font-medium text-center">
                      {index + 1}
                    </td>
                    <td className="px-2 md:px-4 py-3 md:py-4">
                      <div className="flex items-center space-x-2 md:space-x-4">
                        <AssetIcon type={item.symbol} className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-transparent" />
                        <div>
                          <div className="font-semibold text-[14px] sm:text-[16px] text-black">{item.symbol}</div>
                          <div className="sm:hidden text-[12px] text-black/50 mt-0.5">{item.users.toLocaleString()} users</div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell px-2 md:px-4 py-3 md:py-4 text-right">
                      <div className="font-medium text-[13px] sm:text-[15px] text-black/80">
                        {item.users.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-2 md:px-4 py-3 md:py-4 text-right">
                      <div className="flex flex-col items-end whitespace-nowrap">
                        <span className="font-semibold text-[13px] sm:text-[15px] text-black">{item.amount} {item.symbol}</span>
                        <span className="text-[12px] text-black/50 mt-0.5">{item.usdValue}</span>
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-2 md:px-4 py-3 md:py-4 text-right whitespace-nowrap">
                      <span className="text-[12px] sm:text-[14px] text-zinc-400">
                        {item.lastTime}
                      </span>
                    </td>
                  </tr>
                ))}`;

const newAssetsMapping = `{ASSETS_RANKING.map((item, index) => {
                  const isRecent = index === 0;
                  return (
                  <tr
                    key={item.symbol}
                    className={\`transition-colors \${isRecent ? 'bg-emerald-50/50 hover:bg-emerald-50' : 'hover:bg-black/5'}\`}
                  >
                    <td className={\`px-2 md:px-4 py-3 md:py-4 font-medium text-center \${isRecent ? 'text-emerald-600' : 'text-black/60'}\`}>
                      {index + 1}
                    </td>
                    <td className="px-2 md:px-4 py-3 md:py-4">
                      <div className="flex items-center space-x-2 md:space-x-4">
                        <AssetIcon type={item.symbol} className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-transparent" />
                        <div>
                          <div className={\`font-semibold text-[14px] sm:text-[16px] \${isRecent ? 'text-emerald-900' : 'text-black'}\`}>{item.symbol}</div>
                          <div className="sm:hidden text-[12px] text-black/50 mt-0.5">{item.users.toLocaleString()} users</div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell px-2 md:px-4 py-3 md:py-4 text-right">
                      <div className={\`font-medium text-[13px] sm:text-[15px] \${isRecent ? 'text-emerald-700' : 'text-black/80'}\`}>
                        {item.users.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-2 md:px-4 py-3 md:py-4 text-right">
                      <div className="flex flex-col items-end whitespace-nowrap">
                        <span className={\`font-semibold text-[13px] sm:text-[15px] \${isRecent ? 'text-emerald-900' : 'text-black'}\`}>{item.amount} {item.symbol}</span>
                        <span className="text-[12px] text-black/50 mt-0.5">{item.usdValue}</span>
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-2 md:px-4 py-3 md:py-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center justify-end gap-2">
                        {isRecent && (
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                        )}
                        <span className={\`text-[12px] sm:text-[14px] \${isRecent ? 'text-emerald-600 font-medium' : 'text-zinc-400'}\`}>
                          {item.lastTime}
                        </span>
                      </div>
                    </td>
                  </tr>
                )})}`;

content = content.replace(oldAssetsMapping, newAssetsMapping);
fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
console.log("Updated PayoutPage UI tweaks");
