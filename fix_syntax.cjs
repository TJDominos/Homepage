const fs = require('fs');

let wt = fs.readFileSync('src/frontend/money/tabs/WithdrawTab.tsx', 'utf-8');

wt = wt.replace(
  `            )  </>
            )}`,
  `            )}
          </div>
        </div>`
);

fs.writeFileSync('src/frontend/money/tabs/WithdrawTab.tsx', wt);
