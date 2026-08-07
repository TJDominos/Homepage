const fs = require('fs');

let wt = fs.readFileSync('src/frontend/money/tabs/WithdrawTab.tsx', 'utf-8');

// Replace the balance/fee rendering block (around line 220-290)
const blockStart = wt.indexOf('{asset === "WLT" && (');
const blockEnd = wt.indexOf('{asset === "WLT" && wltBalanceType === "locked" && (');

if (blockStart !== -1 && blockEnd !== -1) {
  const newBlock = `
            {asset === "WLT" && (
              <div className="flex flex-col gap-1 w-full">
                {wltBalanceType === "available" ? (
                  <div className="flex items-center gap-1">
                    <span className="whitespace-nowrap">Available: 0.00 {asset}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <span className="whitespace-nowrap">Locked: 0.00 {asset}</span>
                    <div 
                      className="cursor-pointer w-4 h-4 rounded-full bg-black/20 hover:bg-black/30 transition-colors flex items-center justify-center text-[10px] shrink-0 font-bold text-black/60 relative z-10" 
                      onClick={(e) => { 
                        e.stopPropagation();
                        setFaqLockedExpanded(true); 
                        setTimeout(() => {
                          const el = document.getElementById(window.innerWidth < 768 ? 'faq-locked-mobile' : 'faq-locked-desktop');
                          if (el) { el.focus({ preventScroll: true }); el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
                        }, 100); 
                      }}
                    >?</div>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <span className="whitespace-nowrap">Network fee: 0.5 {crypto}</span>
                  <div 
                    className="cursor-pointer w-4 h-4 rounded-full bg-black/20 hover:bg-black/30 transition-colors flex items-center justify-center text-[10px] shrink-0 font-bold text-black/60 relative z-10" 
                    onClick={(e) => { 
                      e.stopPropagation();
                      setFaqFeeExpanded(true); 
                      setTimeout(() => {
                        const el = document.getElementById(window.innerWidth < 768 ? 'faq-fee-mobile' : 'faq-fee-desktop');
                        if (el) { el.focus({ preventScroll: true }); el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
                      }, 100); 
                    }}
                  >?</div>
                </div>
                {['USDC', 'USDT'].includes(crypto) && (
                  <div className="flex items-center gap-1">
                    <span className="whitespace-nowrap">Conversion fee: 0.00 {crypto}</span>
                  </div>
                )}
              </div>
            )}
            {asset === "Gcoin" && (
              <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center gap-1">
                  <span className="whitespace-nowrap">Balance: 123.3K {asset}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="whitespace-nowrap">Network fee: 0.5 {crypto}</span>
                  <div 
                    className="cursor-pointer w-4 h-4 rounded-full bg-black/20 hover:bg-black/30 transition-colors flex items-center justify-center text-[10px] shrink-0 font-bold text-black/60 relative z-10" 
                    onClick={(e) => { 
                      e.stopPropagation();
                      setFaqFeeExpanded(true); 
                      setTimeout(() => {
                        const el = document.getElementById(window.innerWidth < 768 ? 'faq-fee-mobile' : 'faq-fee-desktop');
                        if (el) { el.focus({ preventScroll: true }); el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
                      }, 100); 
                    }}
                  >?</div>
                </div>
                {['USDC', 'USDT'].includes(crypto) && (
                  <div className="flex items-center gap-1">
                    <span className="whitespace-nowrap">Conversion fee: 0.00 {crypto}</span>
                  </div>
                )}
              </div>
            )}
            {asset !== "WLT" && asset !== "Gcoin" && (
              <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center gap-1">
                  <span className="whitespace-nowrap">Available: 0.00 {asset}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="whitespace-nowrap">Network fee: 0.5 {crypto}</span>
                  <div 
                    className="cursor-pointer w-4 h-4 rounded-full bg-black/20 hover:bg-black/30 transition-colors flex items-center justify-center text-[10px] shrink-0 font-bold text-black/60 relative z-10" 
                    onClick={(e) => { 
                      e.stopPropagation();
                      setFaqFeeExpanded(true); 
                      setTimeout(() => {
                        const el = document.getElementById(window.innerWidth < 768 ? 'faq-fee-mobile' : 'faq-fee-desktop');
                        if (el) { el.focus({ preventScroll: true }); el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
                      }, 100); 
                    }}
                  >?</div>
                </div>
              </div>
            )}
            `;
  wt = wt.substring(0, blockStart) + newBlock.trimStart() + wt.substring(blockEnd);
}

wt = wt.replace(/id=\{isMobile \? "faq-fee-mobile" : "faq-fee-desktop"\} className="flex flex-col cursor-pointer"/, 
  'id={isMobile ? "faq-fee-mobile" : "faq-fee-desktop"} tabIndex={-1} className="flex flex-col cursor-pointer outline-none"');

wt = wt.replace(/id=\{isMobile \? "faq-locked-mobile" : "faq-locked-desktop"\} className="flex flex-col cursor-pointer"/, 
  'id={isMobile ? "faq-locked-mobile" : "faq-locked-desktop"} tabIndex={-1} className="flex flex-col cursor-pointer outline-none"');

fs.writeFileSync('src/frontend/money/tabs/WithdrawTab.tsx', wt);

