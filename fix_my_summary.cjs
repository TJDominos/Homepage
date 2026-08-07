const fs = require('fs');

let pt = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

pt = pt.replace(
  /<div className="text-base font-semibold tabular-nums text-\(--text-primary\)">\s*\{fmtGcoin\(filteredMyStats\.wonUsd, 2\)\}\s*<\/div>/,
  `<div className="text-base font-semibold tabular-nums text-(--text-primary) flex flex-col gap-0.5">
                          {fmtGcoin(filteredMyStats.wonUsd, 2)}
                          <span className="text-[13px]">{fmtBonus(filteredMyStats.wonUsd, 0)}</span>
                        </div>`
);

fs.writeFileSync('src/frontend/PayoutPage.tsx', pt);
