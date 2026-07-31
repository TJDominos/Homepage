const fs = require('fs');
let content = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf-8');

const oldStr = `<div className="flex items-center gap-2 mb-4 bg-black/5 px-3 py-1.5 rounded-full mt-1">
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

const newStr = `<button 
                  onClick={() => setGcoinDirection(gcoinDirection === "toGcoin" ? "fromGcoin" : "toGcoin")}
                  className="flex items-center gap-2 mb-4 bg-black/5 hover:bg-black/10 px-3 py-1.5 rounded-full mt-1 cursor-pointer transition-colors"
                >
                  {gcoinDirection === "toGcoin" ? (
                    <>
                      <div className="flex items-center gap-1.5">
                        <AssetIcon type={gcoinCurrency} className="w-4 h-4" />
                        <span className="text-[12px] font-medium text-black">{gcoinCurrency}</span>
                      </div>
                      <div className="p-1 rounded-full transition-colors text-black/40">
                        <ArrowRightLeft size={14} />
                      </div>
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
                      <div className="p-1 rounded-full transition-colors text-black/40">
                        <ArrowRightLeft size={14} />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <AssetIcon type={gcoinCurrency} className="w-4 h-4" />
                        <span className="text-[12px] font-medium text-black">{gcoinCurrency}</span>
                      </div>
                    </>
                  )}
                </button>`;

if (content.includes(oldStr)) {
  content = content.replace(oldStr, newStr);
  fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', content);
  console.log("Success");
} else {
  console.log("String not found. Normalizing whitespace for a regex match...");
  const oldRegex = /<div className="flex items-center gap-2 mb-4 bg-black\/5 px-3 py-1\.5 rounded-full mt-1">[\s\S]*?<\/div>\s*<div className="w-full flex flex-col justify-end gap-3 mt-auto">/;
  // let's do this directly with regex
  const regexNew = newStr + '\n                <div className="w-full flex flex-col justify-end gap-3 mt-auto">';
  content = content.replace(oldRegex, regexNew);
  fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', content);
  console.log("Replaced with regex.");
}
