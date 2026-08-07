const fs = require('fs');

let pt = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

pt = pt.replace(
  /<span className="text-\[12px\] md:text-\[14px\]">\{fmtGcoin\(r\.wonUsd, 2\)\}<\/span>/,
  `<div className="flex flex-col items-end gap-0.5">
                                    <span className="text-[12px] md:text-[14px]">{fmtGcoin(r.wonUsd, 2)}</span>
                                    <span className="text-[12px] md:text-[14px]">{fmtBonus(r.wonUsd, 0)}</span>
                                  </div>`
);

fs.writeFileSync('src/frontend/PayoutPage.tsx', pt);
