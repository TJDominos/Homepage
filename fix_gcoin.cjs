const fs = require('fs');

let wt = fs.readFileSync('src/frontend/money/tabs/WithdrawTab.tsx', 'utf-8');

wt = wt.replace(
  /\{asset !== "WLT" && asset !== "Gcoin" && \(/,
  `{asset === "Gcoin" && (
              <div className="flex flex-wrap items-center gap-x-1 gap-y-0.5">
                <span className="whitespace-nowrap">Balance: 123.3K {asset}</span>
                <span className="hidden sm:inline mx-1">,</span>
                <span className="whitespace-nowrap">Network fee: 0.5 {crypto}</span>
                <div 
                  className="cursor-pointer w-4 h-4 rounded-full bg-black/20 hover:bg-black/30 transition-colors flex items-center justify-center text-[10px] shrink-0 font-bold text-black/60 relative z-10" 
                  onClick={(e) => { 
                    e.stopPropagation();
                    setFaqFeeExpanded(true); 
                    setTimeout(() => document.getElementById('faq-fee')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100); 
                  }}
                >?</div>
              </div>
            )}
            {asset !== "WLT" && asset !== "Gcoin" && (`
);

fs.writeFileSync('src/frontend/money/tabs/WithdrawTab.tsx', wt);
