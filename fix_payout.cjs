const fs = require('fs');
let pt = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

pt = pt.replace(
  /\{g\.totalPaidOutUsd === 0[\s\S]*?\? "–"[\s\S]*?: \([\s\S]*?<div className="flex flex-col items-end gap-0\.5">[\s\S]*?\{fmtGcoin\(g\.totalPaidOutUsd, g\.totalPaidOutUsd < 10 \? 2 : 0\)\}[\s\S]*?\{fmtBonus\(g\.totalPaidOutUsd, 0\)\}[\s\S]*?<\/div>[\s\S]*?\)\} plays<\/span>/,
  `{g.totalPaidOutUsd === 0
                                      ? "–"
                                      : (
                                        <div className="flex flex-col items-end gap-0.5">
                                          {fmtGcoin(g.totalPaidOutUsd, g.totalPaidOutUsd < 10 ? 2 : 0)}
                                          {fmtBonus(g.totalPaidOutUsd, 0)}
                                        </div>
                                      )}
                                  </span>
                                  <span className="sm:hidden mt-0.5 text-[11px] text-black/40 font-normal">{g.totalPlays.toLocaleString("en-US")} plays</span>`
);

fs.writeFileSync('src/frontend/PayoutPage.tsx', pt);
