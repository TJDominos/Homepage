const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

// 1. Hide "Prize Pool" on mobile for "Rand Game"
content = content.replace(
  /<SortTh k="jackpot" label="Prize Pool" \/>/g,
  '<SortTh k="jackpot" label="Prize Pool" className={gameCategory === "Rand Game" ? "hidden md:table-cell" : ""} />'
);

// We need to target the exact td for jackpotUsd inside gameCategory === "Rand Game"
// It's `<td className="px-1.5 py-3 text-right md:px-3 md:py-3.5">` after `{gameCategory === "Rand Game" && (`
const randGameJackpotOld = `<td className="px-1.5 py-3 text-right md:px-3 md:py-3.5">
                                    {g.jackpotUsd === null ? (
                                      <span className="text-black/30">–</span>
                                    ) : (
                                      <span className="inline-flex items-center justify-end gap-1 whitespace-nowrap text-[12px] font-semibold tabular-nums text-black md:text-[15px]">
                                        {fmtGcoin(g.jackpotUsd, 2)}
                                      </span>
                                    )}
                                  </td>`;

const randGameJackpotNew = `<td className="hidden md:table-cell px-1.5 py-3 text-right md:px-3 md:py-3.5">
                                    {g.jackpotUsd === null ? (
                                      <span className="text-black/30 text-[12px] md:text-[14px]">–</span>
                                    ) : (
                                      <span className="inline-flex items-center justify-end gap-1 whitespace-nowrap text-[12px] font-semibold tabular-nums text-black md:text-[15px]">
                                        {fmtGcoin(g.jackpotUsd, 2)}
                                      </span>
                                    )}
                                  </td>`;
content = content.replace(randGameJackpotOld, randGameJackpotNew);

// Target RTP
const theoRtpOld = `<td className="hidden md:table-cell px-3 py-3.5 text-right tabular-nums text-(--text-subtle)">
                                    {fmtPct(g.theoreticalRtp)}
                                  </td>`;
const theoRtpNew = `<td className="hidden md:table-cell px-3 py-3.5 text-right tabular-nums text-[12px] md:text-[14px] text-(--text-subtle)">
                                    {fmtPct(g.theoreticalRtp)}
                                  </td>`;
content = content.replace(theoRtpOld, theoRtpNew);

// Total Plays
const totalPlaysOld = `<td className="hidden sm:table-cell px-3 py-3.5 text-right tabular-nums text-black/60">
                                {g.totalPlays === 0
                                  ? "–"
                                  : g.totalPlays.toLocaleString("en-US")}
                              </td>`;
const totalPlaysNew = `<td className="hidden sm:table-cell px-3 py-3.5 text-right tabular-nums text-[12px] md:text-[14px] text-black/60">
                                {g.totalPlays === 0
                                  ? "–"
                                  : g.totalPlays.toLocaleString("en-US")}
                              </td>`;
content = content.replace(totalPlaysOld, totalPlaysNew);

// My Stats fixes
content = content.replace(
  /<span>\{fmtGcoin\(r\.wonUsd, 2\)\}<\/span>/g,
  '<span className="text-[12px] md:text-[14px]">{fmtGcoin(r.wonUsd, 2)}</span>'
);

content = content.replace(
  /<span className="text-\[13px\] font-bold md:text-\[15px\] text-black">/g,
  '<span className="text-[12px] font-bold md:text-[15px] text-black">'
);

// Randball Prize pool empty state
content = content.replace(
  /<span className="text-\(--text-disabled\)">–<\/span>/g,
  '<span className="text-[12px] md:text-[14px] text-(--text-disabled)">–</span>'
);

fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
console.log("Updated mobile table columns and fonts");
