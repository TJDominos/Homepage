const fs = require('fs');

let wt = fs.readFileSync('src/frontend/money/tabs/WithdrawTab.tsx', 'utf-8');

const regex = /\{asset === "WLT" && wltBalanceType === "locked" && \(\s*<div className="text-\[12px\] text-\[\#6A3FE6\] font-medium leading-snug mt-1">\s*\*Locked tokens can be withdrawn subject to 30-day lockup \+\s*360-day linear vesting\.\s*<\/div>\s*\)\}\s*<\/div>\s*<\/div>.*?<\/div>\s*<\/div>/s;

wt = wt.replace(regex, `{asset === "WLT" && wltBalanceType === "locked" && (
              <div className="text-[12px] text-[#6A3FE6] font-medium leading-snug mt-1">
                *Locked tokens can be withdrawn subject to 30-day lockup +
                360-day linear vesting.
              </div>
            )}
          </div>
        </div>`);

fs.writeFileSync('src/frontend/money/tabs/WithdrawTab.tsx', wt);
