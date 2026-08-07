const fs = require('fs');

let wt = fs.readFileSync('src/frontend/money/tabs/WithdrawTab.tsx', 'utf-8');

const balanceDisplayRegex = /<div className="flex flex-col gap-1 mt-1 px-2 text-\[14px\] text-black\/65 font-medium">.*?<\/div>\s*<\/div>/s;

const newBalanceDisplay = `<div className="flex flex-col gap-1 mt-1 px-2 text-[14px] text-black/65 font-medium">
            {asset === "WLT" && (
              <>
                {wltBalanceType === "available" ? (
                  <div className="flex flex-wrap items-center gap-x-1 gap-y-0.5">
                    <span className="whitespace-nowrap">Available: 0.00 {asset}</span>
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
                ) : (
                  <div className="flex flex-wrap items-center gap-x-1 gap-y-0.5">
                    <span className="whitespace-nowrap">Locked: 0.00 {asset}</span>
                    <div 
                      className="cursor-pointer w-4 h-4 rounded-full bg-black/20 hover:bg-black/30 transition-colors flex items-center justify-center text-[10px] shrink-0 font-bold text-black/60 relative z-10" 
                      onClick={(e) => { 
                        e.stopPropagation();
                        setFaqLockedExpanded(true); 
                        setTimeout(() => document.getElementById('faq-locked')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100); 
                      }}
                    >?</div>
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
              </>
            )}
            {asset === "Gcoin" && (
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
            {asset !== "WLT" && asset !== "Gcoin" && (
              <div className="flex flex-wrap items-center gap-x-1 gap-y-0.5">
                <span className="whitespace-nowrap">Available: 0.00 {asset}</span>
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
            {asset === "WLT" && wltBalanceType === "locked" && (
              <div className="text-[12px] text-[#6A3FE6] font-medium leading-snug mt-1">
                *Locked tokens can be withdrawn subject to 30-day lockup +
                360-day linear vesting.
              </div>
            )}
          </div>
        </div>`;

wt = wt.replace(balanceDisplayRegex, newBalanceDisplay);

// Update grammar for locked faq
wt = wt.replace(
  'Bonus to token is conditional reward, locked token is withhold into escrow account on chain and will be automatically distributed to withdrawed account on schedule.',
  'Bonus-to-token conversion is a conditional reward. Locked tokens are withheld in an on-chain escrow account and will be automatically distributed to the withdrawal address on schedule.'
);

fs.writeFileSync('src/frontend/money/tabs/WithdrawTab.tsx', wt);
