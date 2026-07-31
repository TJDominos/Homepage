const fs = require('fs');
let content = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf-8');

if (!content.includes('ArrowRightLeft,')) {
  content = content.replace(/ArrowRight,/g, "ArrowRight,\n  ArrowRightLeft,");
}

const convertWidgetStart = content.indexOf('{/* Convert Gcoin Widget */}');
let before = content.substring(0, convertWidgetStart);
let convertWidget = content.substring(convertWidgetStart);

// Replace the main ArrowRight
convertWidget = convertWidget.replace(
  /<ArrowRight\s+className="w-\[40px\] h-\[40px\] text-blue-500"\s+strokeWidth=\{1\.5\}\s+\/>/,
  '<ArrowRightLeft className="w-[40px] h-[40px] text-[#FFD700]" strokeWidth={1.5} />'
);

// Replace the swap direction layout
const oldSwapDirection = `<div className="flex items-center gap-1 mb-4">
                  <button onClick={() => setGcoinDirection(gcoinDirection === "toGcoin" ? "fromGcoin" : "toGcoin")} className="text-[12px] text-blue-600 font-medium hover:underline flex items-center gap-1">
                    Swap Direction <ArrowRight size={12} className={gcoinDirection === "fromGcoin" ? "rotate-180" : ""} />
                  </button>
                </div>`;

const newSwapDirection = `<div className="flex items-center gap-2 mb-4 bg-black/5 px-3 py-1.5 rounded-full mt-1">
                  {gcoinDirection === "toGcoin" ? (
                    <>
                      <div className="flex items-center gap-1.5">
                        <AssetIcon type={gcoinCurrency} className="w-4 h-4" />
                        <span className="text-[12px] font-medium text-black">{gcoinCurrency}</span>
                      </div>
                      <button onClick={() => setGcoinDirection("fromGcoin")} className="p-1 hover:bg-black/10 rounded-full transition-colors text-black/40 hover:text-black">
                        <ArrowRightLeft size={14} />
                      </button>
                      <div className="flex items-center gap-1.5">
                        <AssetIcon type="Gcoin" className="w-4 h-4" />
                        <span className="text-[12px] font-medium text-black">Gcoin</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-1.5">
                        <AssetIcon type="Gcoin" className="w-4 h-4" />
                        <span className="text-[12px] font-medium text-black">Gcoin</span>
                      </div>
                      <button onClick={() => setGcoinDirection("toGcoin")} className="p-1 hover:bg-black/10 rounded-full transition-colors text-black/40 hover:text-black">
                        <ArrowRightLeft size={14} />
                      </button>
                      <div className="flex items-center gap-1.5">
                        <AssetIcon type={gcoinCurrency} className="w-4 h-4" />
                        <span className="text-[12px] font-medium text-black">{gcoinCurrency}</span>
                      </div>
                    </>
                  )}
                </div>`;

convertWidget = convertWidget.replace(oldSwapDirection, newSwapDirection);

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', before + convertWidget);
console.log("Patched");
