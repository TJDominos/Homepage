const fs = require('fs');

let pt = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

pt = pt.replace(
  /<span className="inline-flex items-center justify-end gap-1 whitespace-nowrap text-\[12px\] font-semibold tabular-nums text-\(--text-primary\) md:text-sm">\s*\{fmtGcoin\(g\.jackpotUsd, 2\)\}\s*<span className="text-black\/30 mx-1">\/<\/span>\s*\{fmtBonus\(g\.jackpotUsd, 0\)\}\s*<\/span>/g,
  `<div className="flex flex-col items-end gap-0.5 whitespace-nowrap text-[12px] font-semibold tabular-nums text-(--text-primary) md:text-sm">
                                      {fmtGcoin(g.jackpotUsd, 2)}
                                      {fmtBonus(g.jackpotUsd, 0)}
                                    </div>`
);

pt = pt.replace(
  /<span className="inline-flex items-center justify-end gap-1 whitespace-nowrap text-\[12px\] font-semibold tabular-nums text-black md:text-\[15px\]">\s*\{fmtGcoin\(g\.jackpotUsd, 2\)\}\s*<span className="text-black\/30 mx-1">\/<\/span>\s*\{fmtBonus\(g\.jackpotUsd, 0\)\}\s*<\/span>/g,
  `<div className="flex flex-col items-end gap-0.5 whitespace-nowrap text-[12px] font-semibold tabular-nums text-black md:text-[15px]">
                                        {fmtGcoin(g.jackpotUsd, 2)}
                                        {fmtBonus(g.jackpotUsd, 0)}
                                      </div>`
);

fs.writeFileSync('src/frontend/PayoutPage.tsx', pt);
