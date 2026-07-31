const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

const oldCategoryFilter = `{/* ---------- Category Filter ---------- */}
            <div className="mb-5 inline-flex items-center gap-1 bg-black/5 p-1 rounded-2xl">
              <button
                onClick={() => { setGameCategory("Rand Game"); setSortKey("actual"); }}
                className={\`w-[112px] h-[28px] p-0 flex items-center justify-center rounded-[12px] text-[14px] leading-[20px] font-medium transition-all \${
                  gameCategory === "Rand Game"
                    ? "bg-white text-black shadow-sm ring-1 ring-black/5"
                    : "text-black/60 hover:text-black"
                }\`}
              >
                Rand Game
              </button>
              <button
                onClick={() => { setGameCategory("Randball"); setSortKey("jackpot"); }}
                className={\`w-[112px] h-[28px] p-0 flex items-center justify-center rounded-[12px] text-[14px] leading-[20px] font-medium transition-all \${
                  gameCategory === "Randball"
                    ? "bg-white text-black shadow-sm ring-1 ring-black/5"
                    : "text-black/60 hover:text-black"
                }\`}
              >
                Randball
              </button>
            </div>`;

const newCategoryFilter = `{/* ---------- Category Filter ---------- */}
            <div className="mb-5 flex w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="inline-flex items-center gap-1 bg-black/5 p-1 rounded-2xl shrink-0">
                <button
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
                >
                  Randball
                </button>
              </div>
            </div>`;

content = content.replace(oldCategoryFilter, newCategoryFilter);
fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
console.log("Updated category filter style to be responsive");
