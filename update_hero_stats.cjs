const fs = require('fs');

let pt = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

pt = pt.replace(
  /<div className="mt-1 text-\[24px\] font-bold leading-none tracking-tight text-\(--text-primary\)">\s*\{fmtGcoin\(Math\.round\(heroPaidOut\)\)\}\s*<\/div>/,
  `<div className="mt-1 text-[24px] font-bold leading-none tracking-tight text-(--text-primary)">
                    <div className="flex items-center gap-3 flex-wrap">
                      {fmtGcoin(Math.round(heroPaidOut))}
                      <span className="text-black/30 font-light text-[20px] hidden sm:inline">/</span>
                      <span className="text-[20px] sm:text-[24px]">{fmtBonus(Math.round(heroPaidOut), 0)}</span>
                    </div>
                  </div>`
);

fs.writeFileSync('src/frontend/PayoutPage.tsx', pt);
