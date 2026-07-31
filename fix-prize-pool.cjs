const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

// 1. Fix the headers
content = content.replace(
  /<SortTh k="jackpot" label="Prize Pool" className=\{gameCategory === "Rand Game" \? "hidden md:table-cell" : ""\} \/>/g,
  '<SortTh k="jackpot" label="Prize Pool" />'
);

// 2. Fix the data td for Rand Game
const randGameJackpotHidden = `<td className="hidden md:table-cell px-1.5 py-3 text-right md:px-3 md:py-3.5">
                                    {g.jackpotUsd === null ? (
                                      <span className="text-black/30 text-[12px] md:text-[14px]">–</span>
                                    ) : (
                                      <span className="inline-flex items-center justify-end gap-1 whitespace-nowrap text-[12px] font-semibold tabular-nums text-black md:text-[15px]">
                                        {fmtGcoin(g.jackpotUsd, 2)}
                                      </span>
                                    )}
                                  </td>`;

const randGameJackpotVisible = `<td className="px-1.5 py-3 text-right md:px-3 md:py-3.5">
                                    {g.jackpotUsd === null ? (
                                      <span className="text-black/30 text-[12px] md:text-[14px]">–</span>
                                    ) : (
                                      <span className="inline-flex items-center justify-end gap-1 whitespace-nowrap text-[12px] font-semibold tabular-nums text-black md:text-[15px]">
                                        {fmtGcoin(g.jackpotUsd, 2)}
                                      </span>
                                    )}
                                  </td>`;

content = content.replace(randGameJackpotHidden, randGameJackpotVisible);

fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
console.log("Restored Prize Pool on mobile");
