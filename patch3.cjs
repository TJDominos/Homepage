const fs = require('fs');
let content = fs.readFileSync('src/frontend/MoneyPage.tsx', 'utf-8');

const oldCode = `{['USDC', ...SUPPORTED_ASSETS.filter(a => a !== 'Gcoin')].map(asset => {
                  const price = asset === 'USDC' ? 1 : (prices[asset]?.priceUsd || 0);
                  const bal = asset === 'USDC' ? 0.97 : (asset === 'WLT' ? 123322 : 0);
                  return (
                    <div key={asset} className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[14px] font-medium text-black/80">
                        <AssetIcon type={asset} className="w-5 h-5" />
                        <span>{asset}</span>
                        <span className="text-[12px] text-black/40 font-normal">
                          {asset === 'USDC' ? '1 USDC = 1 USD' : \`$\${price.toFixed(6)}\`}
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
                })}`;

const newCode = `{['USDC', 'USDT', ...SUPPORTED_ASSETS.filter(a => a !== 'Gcoin')].map(asset => {
                  const price = (asset === 'USDC' || asset === 'USDT') ? 1 : (prices[asset]?.priceUsd || 0);
                  const bal = asset === 'USDC' ? 0.97 : (asset === 'USDT' ? 0 : (asset === 'WLT' ? 123322 : 0));
                  return (
                    <div key={asset} className="flex flex-col gap-2 border-b border-black/5 pb-3 pt-1 first:pt-0 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[14px] font-medium text-black/80">
                          <AssetIcon type={asset} className="w-5 h-5" />
                          <span>{asset}</span>
                          <span className="text-[12px] text-black/40 font-normal">
                            {asset === 'USDC' || asset === 'USDT' ? \`1 \${asset} = $1\` : \`$\${Number(price.toFixed(6)).toString()}\`}
                          </span>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="flex items-center gap-1.5 font-bold text-[14px] text-black">
                            <span>{bal.toLocaleString()}</span>
                          </div>
                          <span className="text-[12px] text-black/40 font-medium min-w-[60px] text-right">
                            ≈ \$\${(bal * price).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      {(asset === 'USDC' || asset === 'USDT') && (
                        <div className="flex justify-start ml-[28px] mt-[-4px]">
                          <button className="text-[10px] sm:text-[11px] bg-[#EAEAEA] hover:bg-[#D9D9D9] text-black/80 px-2.5 py-1 rounded-full transition-colors font-medium">
                            Convert to Gcoin (1:10)
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}`;

content = content.replace(oldCode, newCode);
fs.writeFileSync('src/frontend/MoneyPage.tsx', content);
