const fs = require('fs');

let content = fs.readFileSync('src/frontend/MoneyPage.tsx', 'utf-8');

const oldModalPart = `<div className="flex flex-col gap-4 mb-8">`;
const indexOfStart = content.indexOf(oldModalPart);
if (indexOfStart > -1) {
  const newModalPart = `<div className="flex flex-col gap-4 mb-8 overflow-y-auto max-h-[300px] pr-2">
                {SUPPORTED_ASSETS.map(asset => {
                  const price = prices[asset]?.priceUsd || (asset === 'Gcoin' ? 0.1 : 0);
                  const bal = asset === 'Gcoin' ? 0.97 : (asset === 'WLT' ? 123322 : 0);
                  return (
                    <div key={asset} className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[14px] font-medium text-black/80">
                        <AssetIcon type={asset} className="w-5 h-5" />
                        <span>{asset}</span>
                        <span className="text-[12px] text-black/40 font-normal">
                          {asset === 'Gcoin' ? '1 USDC = 10 Gcoin' : \`$\${price.toFixed(6)}\`}
                        </span>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1.5 font-bold text-[14px] text-black">
                          <span>{bal.toLocaleString()}</span>
                        </div>
                        <span className="text-[12px] text-black/40 font-medium min-w-[60px] text-right">
                          ≈ \${(bal * price).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>`;
            
  // Find where this div ends.
  // It's just before </motion.div> maybe, or just before "</div>\n            </div>\n          </div>\n        </div>"
  // Let's just find `</div>\n            </div>\n          </div>\n        </div>\n      )}`
  const targetEnd = `</div>\n            </div>\n          </div>\n        </div>\n      )}`;
  const indexOfEnd = content.indexOf(targetEnd, indexOfStart);
  
  if (indexOfEnd > -1) {
    content = content.substring(0, indexOfStart) + newModalPart + "\n          </div>\n        </div>\n      )}" + content.substring(indexOfEnd + targetEnd.length);
  }
}

fs.writeFileSync('src/frontend/MoneyPage.tsx', content, 'utf-8');
console.log('Fixed MoneyPage balance modal');
