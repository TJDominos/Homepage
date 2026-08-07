const fs = require('fs');

let wt = fs.readFileSync('src/frontend/money/tabs/WithdrawTab.tsx', 'utf-8');

wt = wt.replace(/                \{\['USDC', 'USDT'\]\.includes\(crypto\) && \(\n                  <div className="flex items-center gap-1">\n                    <span className="whitespace-nowrap">Conversion fee: 0\.00 \{crypto\}<\/span>\n                  <\/div>\n                \)\}\n/g, '');

fs.writeFileSync('src/frontend/money/tabs/WithdrawTab.tsx', wt);

