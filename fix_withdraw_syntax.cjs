const fs = require('fs');

let wt = fs.readFileSync('src/frontend/money/tabs/WithdrawTab.tsx', 'utf-8');

wt = wt.replace(
  `}
          </div>
        </div>
              </>
            )}`,
  `  </>
            )}`
);

wt = wt.replace(
  `<div className="text-red-500 font-medium text-[13px] px-2 mb-4">
            Insufficient balance
          </div>
        )}`,
  `</div></div>
        {parseFloat(amount.replace(/,/g, "") || "0") >
          (asset !== "Gcoin" ? 0 : 123322) && (
          <div className="text-red-500 font-medium text-[13px] px-2 mb-4">
            Insufficient balance
          </div>
        )}`
);

fs.writeFileSync('src/frontend/money/tabs/WithdrawTab.tsx', wt);
