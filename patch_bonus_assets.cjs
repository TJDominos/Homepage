const fs = require('fs');
let content = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf-8');

// Change default WLT to USDC
content = content.replace(
  'const [topUpCurrency, setTopUpCurrency] = useState<string>("WLT");',
  'const [topUpCurrency, setTopUpCurrency] = useState<string>("USDC");'
);
content = content.replace(
  'const [swapCurrency, setSwapCurrency] = useState<string>("WLT");',
  'const [swapCurrency, setSwapCurrency] = useState<string>("USDC");'
);

// Add labels for top up
const topUpContainerRegex = /<div className="flex gap-2">\s*<div\s*className="relative shrink-0 w-\[40%\] min-w-\[90px\]"\s*ref=\{dropdownRef\}\s*>/m;
content = content.replace(topUpContainerRegex, `<div className="flex gap-2 items-end">
                      <div
                        className="flex flex-col gap-1 relative shrink-0 w-[40%] min-w-[90px]"
                        ref={dropdownRef}
                      >
                        <label className="text-[13px] font-normal text-black text-left pl-2">Assets</label>`);

// Add label for top up input
const topUpInputRegex = /<\/div>\s*<input\s*type="text"\s*placeholder="Amount"\s*disabled=\{topUpStatus === "processing"\}/m;
content = content.replace(topUpInputRegex, `</div>
                      <div className="flex flex-col gap-1 flex-1 w-2/3">
                        <label className="text-[13px] font-normal text-black text-left pl-2">Amount</label>
                        <input
                          type="text"
                          placeholder="Amount"
                          disabled={topUpStatus === "processing"}`);

// Add closing div for top up input
const topUpInputCloseRegex = /className=\{\`flex-1 w-2\/3 bg-black\/5 focus:bg-white rounded-full px-3 py-3 outline-none text-\[14px\] text-center text-black placeholder-black\/40 focus:ring-2 focus:ring-black\/10 transition-all font-medium \$\{topUpStatus === "processing" \? "opacity-60 cursor-not-allowed" : ""\}\`\}\s*\/>\s*<\/div>/m;
content = content.replace(topUpInputCloseRegex, `className={\`w-full bg-black/5 focus:bg-white rounded-full px-3 py-3 outline-none text-[14px] text-center text-black placeholder-black/40 focus:ring-2 focus:ring-black/10 transition-all font-medium \${topUpStatus === "processing" ? "opacity-60 cursor-not-allowed" : ""}\`}
                        />
                      </div>
                    </div>`);

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', content);
