const fs = require('fs');

let wt = fs.readFileSync('src/frontend/money/tabs/WithdrawTab.tsx', 'utf-8');

wt = wt.replace(
  /\*Locked Balance can be withdrawn subject to 30-day lockup \+.*?(?=\{parseFloat\(amount\.replace)/s,
  `*Locked Balance can be withdrawn subject to 30-day lockup +
                360-day linear vesting.
              </div>
            )}
          </div>
        </div>
        `
);

fs.writeFileSync('src/frontend/money/tabs/WithdrawTab.tsx', wt);
