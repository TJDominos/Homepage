const fs = require('fs');

// 1. Update mock data
let mock = fs.readFileSync('src/api/payoutMock.ts', 'utf-8');
mock = mock.replace(/name: "Fruits Garden",[\s\S]*?jackpotUsd: \d+\.\d+,/m, 
  (match) => match.replace(/jackpotUsd: \d+\.\d+/, 'jackpotUsd: 150')
);
fs.writeFileSync('src/api/payoutMock.ts', mock, 'utf-8');
console.log("Updated mock data");

// 2. Update PayoutPage.tsx table headers and body
let page = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

page = page.replace(
  /{gameCategory === "Rand Game" && \(\s*<>\s*<SortTh\s*k="theo"/,
  `{gameCategory === "Rand Game" && (
                        <>
                          <SortTh k="jackpot" label="Live Prize Pool" />
                          <SortTh
                            k="theo"`
);

page = page.replace(
  /gameCategory === "Randball" \? "" : null, \/\/ Live Jackpot\s*gameCategory === "Rand Game" \? "" : null, \/\/ Theoretical RTP/,
  `gameCategory === "Randball" ? "" : null, // Live Jackpot
                              gameCategory === "Rand Game" ? "" : null, // Live Prize Pool
                              gameCategory === "Rand Game" ? "" : null, // Theoretical RTP`
);

const oldRow = `{gameCategory === "Rand Game" && (
                                <>
                                  <td className="px-3 py-3.5 text-right tabular-nums text-(--text-subtle)">
                                    {fmtPct(g.theoreticalRtp)}
                                  </td>`;

const newRow = `{gameCategory === "Rand Game" && (
                                <>
                                  <td className="px-1.5 py-3 text-right md:px-3 md:py-3.5">
                                    {g.jackpotUsd === null ? (
                                      <span className="text-black/30">–</span>
                                    ) : (
                                      <span className="inline-flex items-center justify-end gap-1 whitespace-nowrap text-[13px] font-semibold tabular-nums text-black md:text-[15px]">
                                        {fmtGcoin(g.jackpotUsd, 2)}
                                      </span>
                                    )}
                                  </td>
                                  <td className="px-3 py-3.5 text-right tabular-nums text-(--text-subtle)">
                                    {fmtPct(g.theoreticalRtp)}
                                  </td>`;

page = page.replace(oldRow, newRow);

fs.writeFileSync('src/frontend/PayoutPage.tsx', page, 'utf-8');
console.log("Updated table structure");
