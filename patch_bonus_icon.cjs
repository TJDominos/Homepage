const fs = require('fs');
let content = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf-8');

// Replace topUpCurrency button content
const oldTopUpButtonContent = `<span className="truncate flex-1 text-center">
                            {topUpCurrency}
                          </span>
                          <ChevronDown
                            size={14}
                            className="text-black/40 shrink-0"
                          />`;
const newTopUpButtonContent = `<div className="flex items-center gap-2 overflow-hidden flex-1 justify-center">
                            <AssetIcon type={topUpCurrency} className="w-4 h-4 shrink-0" />
                            <span className="truncate text-center">
                              {topUpCurrency}
                            </span>
                          </div>
                          <ChevronDown
                            size={14}
                            className="text-black/40 shrink-0"
                          />`;

content = content.replace(oldTopUpButtonContent, newTopUpButtonContent);

// Replace swapCurrency button content
const oldSwapButtonContent = `<span className="truncate flex-1 text-center">
                            {swapCurrency}
                          </span>
                          <ChevronDown
                            size={14}
                            className="text-black/40 shrink-0"
                          />`;
const newSwapButtonContent = `<div className="flex items-center gap-2 overflow-hidden flex-1 justify-center">
                            <AssetIcon type={swapCurrency} className="w-4 h-4 shrink-0" />
                            <span className="truncate text-center">
                              {swapCurrency}
                            </span>
                          </div>
                          <ChevronDown
                            size={14}
                            className="text-black/40 shrink-0"
                          />`;

content = content.replace(oldSwapButtonContent, newSwapButtonContent);

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', content);
