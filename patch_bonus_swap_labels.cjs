const fs = require('fs');
let content = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf-8');

// For Swap Token, we changed the layout earlier:
const swapContainerRegex = /<div className="flex gap-2">\s*<input\s*type="text"\s*placeholder="Min: 1,000 Bonus"/m;
content = content.replace(swapContainerRegex, `<div className="flex gap-2 items-end">
                      <div className="flex flex-col gap-1 flex-1 w-2/3">
                        <label className="text-[13px] font-normal text-black text-left pl-2">Amount</label>
                        <input
                          type="text"
                          placeholder="Min: 1,000 Bonus"`);

const swapSelectorRegex = /className=\{\`flex-1 w-2\/3 bg-black\/5 focus:bg-white rounded-full px-3 py-3 outline-none text-\[14px\] text-center text-black placeholder-black\/40 focus:ring-2 focus:ring-black\/10 transition-all font-medium \$\{swapStatus === "processing" \? "opacity-60 cursor-not-allowed" : ""\}\`\}\s*\/>\s*<div\s*className="relative shrink-0 w-\[40%\] min-w-\[90px\]"/m;
content = content.replace(swapSelectorRegex, `className={\`w-full bg-black/5 focus:bg-white rounded-full px-3 py-3 outline-none text-[14px] text-center text-black placeholder-black/40 focus:ring-2 focus:ring-black/10 transition-all font-medium \${swapStatus === "processing" ? "opacity-60 cursor-not-allowed" : ""}\`}
                        />
                      </div>
                      <div
                        className="flex flex-col gap-1 relative shrink-0 w-[40%] min-w-[90px]"`);

const swapDropdownRegex = /<\/button>\s*\{showSwapCurrencyDropdown && \(\s*<div className="absolute/m;
content = content.replace(swapDropdownRegex, `</button>
                        {showSwapCurrencyDropdown && (
                          <div className="absolute`);

// And we need to add the label above the button
const swapButtonLabelRegex = /className="flex flex-col gap-1 relative shrink-0 w-\[40%\] min-w-\[90px\]"\s*>\s*<button/m;
content = content.replace(swapButtonLabelRegex, `className="flex flex-col gap-1 relative shrink-0 w-[40%] min-w-[90px]"
                      >
                        <label className="text-[13px] font-normal text-black text-left pl-2">Assets</label>
                        <button`);

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', content);
