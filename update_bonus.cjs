const fs = require('fs');

let bt = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf-8');

// Replace Redeem token bottom part
bt = bt.replace(/<div className="h-\[20px\] flex items-center justify-center mt-1 w-full">\s*\{parseFloat\(swapAmount\.replace\(\/,\/g, ""\)\) >= 1000 \? \(\s*<span className="text-\[12px\] font-medium text-purple-600 leading-\[1\]">\s*≈ \{formatNumber\(calculateTokenFromSwap\(\)\)\} \{swapCurrency\}\s*<\/span>\s*\) : swapAmount \? \(\s*<span className="text-\[12px\] font-medium text-red-500 leading-\[1\]">\s*Minimum 1,000 Bonus\s*<\/span>\s*\) : \(\s*<span className="text-\[11px\] text-slate-400 font-medium leading-\[1\]">\s*Rate: 1,000 Bonus =\{" "\}\s*\{formatNumber\(1000 \* BONUS_PRICE_USD \/ \(prices\[swapCurrency\]\?\.priceUsd \|\| 1\)\)\} \{swapCurrency\}\s*<\/span>\s*\)\}\s*<\/div>/,
`<div className="flex flex-col items-center justify-center mt-1 w-full gap-1">
                      {parseFloat(swapAmount.replace(/,/g, "")) >= 1000 ? (
                        <span className="text-[12px] font-medium text-purple-600 leading-[1]">
                          ≈ {formatNumber(calculateTokenFromSwap())} {swapCurrency}
                        </span>
                      ) : swapAmount ? (
                        <span className="text-[12px] font-medium text-red-500 leading-[1]">
                          Minimum 1,000 Bonus
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-medium leading-[1]">
                          Rate: 1,000 Bonus ={" "}
                          {formatNumber(1000 * BONUS_PRICE_USD / (prices[swapCurrency]?.priceUsd || 1))} {swapCurrency}
                        </span>
                      )}
                      <span className="text-[11px] text-slate-400 font-medium leading-[1]">
                        Conversion fee: 0.00 {swapCurrency}
                      </span>
                    </div>`
);

// Replace Gcoin bottom part
bt = bt.replace(/<div className="h-\[20px\] flex items-center justify-center mt-1 w-full">\s*\{gcoinAmount && parseFloat\(gcoinAmount\.replace\(\/,\/g, ""\)\) > 0 \? \(\s*<span className="text-\[12px\] font-medium text-blue-600 leading-\[1\]">\s*≈ \{formatNumber\(calculateGcoinSwap\(\)\)\} \{gcoinDirection === "toGcoin" \? "Gcoin" : gcoinCurrency\}\s*<\/span>\s*\) : \(\s*<span className="text-\[11px\] text-slate-400 font-medium leading-\[1\]">\s*Rate: 1 \{gcoinCurrency\} = 10 Gcoin\s*<\/span>\s*\)\}\s*<\/div>/,
`<div className="flex flex-col items-center justify-center mt-1 w-full gap-1">
                      {gcoinAmount && parseFloat(gcoinAmount.replace(/,/g, "")) > 0 ? (
                        <span className="text-[12px] font-medium text-blue-600 leading-[1]">
                          ≈ {formatNumber(calculateGcoinSwap())} {gcoinDirection === "toGcoin" ? "Gcoin" : gcoinCurrency}
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-medium leading-[1]">
                          Rate: 1 {gcoinCurrency} = 10 Gcoin
                        </span>
                      )}
                      {['USDC', 'USDT'].includes(gcoinCurrency) && (
                        <span className="text-[11px] text-slate-400 font-medium leading-[1]">
                          Conversion fee: 0.00 {gcoinCurrency}
                        </span>
                      )}
                    </div>`
);

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', bt);
