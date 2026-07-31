const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

// 1. Fix the table headers
const oldHeaders = `                    <tr>
                      <th className="pl-4 sm:pl-6 pr-3 py-3.5 md:pr-4 md:py-4">Game</th>
                      <SortTh k="jackpot" label="Prize Pool" />
                      <SortTh
                        k="theo"
                        label="Target RTP"
                        tip="The share of incomes a game is designed to reward players."
                      />
                      <SortTh
                        k="actual"
                        label="Actual RTP"
                        tip="Realized rewards ÷ total incomes to date. Low-volume games swing above and below theory."
                        className="pr-3"
                      />
                      <SortTh
                        k="plays"
                        label="Total Plays"
                      />
                      <SortTh
                        k="paid"
                        label="Total Rewards"
                        className="pr-2 md:pr-0"
                      />
                      <th
                        className="hidden w-10 px-2 py-3.5 md:table-cell"
                        aria-label="Details"
                      />
                    </tr>`;

const newHeaders = `                    <tr>
                      <th className="pl-4 sm:pl-6 pr-3 py-3.5 md:pr-4 md:py-4">Game</th>
                      {gameCategory === "Randball" && (
                        <SortTh k="jackpot" label="Prize Pool" />
                      )}
                      {gameCategory === "Rand Game" && (
                        <>
                          <SortTh
                            k="theo"
                            label="Target RTP"
                            tip="The share of incomes a game is designed to reward players."
                          />
                          <SortTh
                            k="actual"
                            label="Actual RTP"
                            tip="Realized rewards ÷ total incomes to date. Low-volume games swing above and below theory."
                            className="pr-3"
                          />
                        </>
                      )}
                      <SortTh
                        k="plays"
                        label="Total Plays"
                      />
                      <SortTh
                        k="paid"
                        label="Total Rewards"
                        className="pr-2 md:pr-0"
                      />
                      <th
                        className="hidden w-10 px-2 py-3.5 md:table-cell"
                        aria-label="Details"
                      />
                    </tr>`;

content = content.replace(oldHeaders, newHeaders);

// 2. Fix the table skeleton
const oldSkeleton = `                            {[
                              "", // Live Jackpot
                              "", // Theoretical RTP
                              "", // Actual RTP
                              "", // Total Plays
                              "", // Paid Out
                            ].map((cls, j) => (
                              <td key={j} className={\`px-1.5 py-4 md:px-3 \${cls}\`}>
                                <div className="ml-auto h-4 w-16 rounded-(--radius-sm) bg-(--color-black-alpha-5)" />
                              </td>
                            ))}`;

const newSkeleton = `                            {[
                              gameCategory === "Randball" ? "" : null, // Live Jackpot
                              gameCategory === "Rand Game" ? "" : null, // Theoretical RTP
                              gameCategory === "Rand Game" ? "" : null, // Actual RTP
                              "", // Total Plays
                              "", // Paid Out
                            ].filter(cls => cls !== null).map((cls, j) => (
                              <td key={j} className={\`px-1.5 py-4 md:px-3 \${cls}\`}>
                                <div className="ml-auto h-4 w-16 rounded-(--radius-sm) bg-(--color-black-alpha-5)" />
                              </td>
                            ))}`;

content = content.replace(oldSkeleton, newSkeleton);

// 3. Fix the table body cells
const oldRowCells = `                              <td className="px-1.5 py-3 text-right md:px-3 md:py-3.5">
                                {g.jackpotUsd === null ? (
                                  <span className="text-(--text-disabled)">–</span>
                                ) : (
                                  <span className="inline-flex items-center justify-end gap-1 whitespace-nowrap text-[13px] font-semibold tabular-nums text-(--text-primary) md:text-sm">
                                    {fmtGcoin(g.jackpotUsd, 2)}
                                  </span>
                                )}
                              </td>
                              <td className="px-3 py-3.5 text-right tabular-nums text-(--text-subtle)">
                                {fmtPct(g.theoreticalRtp)}
                              </td>
                              <td className="py-3 pl-1.5 pr-3 text-right md:py-3.5 md:pl-3">
                                {g.actualRtp === null ? (
                                  <div className="flex flex-col items-end">
                                    <span className="text-black/30">–</span>
                                    <span className="text-[11px] text-black/30 mt-0.5">no plays yet</span>
                                  </div>
                                ) : (
                                  <div className="flex flex-col items-end">
                                    <span className="text-[13px] font-bold tabular-nums md:text-[15px] text-black">
                                      {fmtPct(g.actualRtp)}
                                    </span>
                                    <span className={\`mt-0.5 text-[11px] font-medium tabular-nums \${g.actualRtp > g.theoreticalRtp ? "text-emerald-600" : g.actualRtp < g.theoreticalRtp ? "text-rose-500" : "text-black/40"}\`}>
                                      {g.actualRtp > g.theoreticalRtp ? "+" : ""}{fmtPct(g.actualRtp - g.theoreticalRtp)}
                                    </span>
                                  </div>
                                )}
                              </td>`;

const newRowCells = `                              {gameCategory === "Randball" && (
                                <td className="px-1.5 py-3 text-right md:px-3 md:py-3.5">
                                  {g.jackpotUsd === null ? (
                                    <span className="text-(--text-disabled)">–</span>
                                  ) : (
                                    <span className="inline-flex items-center justify-end gap-1 whitespace-nowrap text-[13px] font-semibold tabular-nums text-(--text-primary) md:text-sm">
                                      {fmtGcoin(g.jackpotUsd, 2)}
                                    </span>
                                  )}
                                </td>
                              )}
                              {gameCategory === "Rand Game" && (
                                <>
                                  <td className="px-3 py-3.5 text-right tabular-nums text-(--text-subtle)">
                                    {fmtPct(g.theoreticalRtp)}
                                  </td>
                                  <td className="py-3 pl-1.5 pr-3 text-right md:py-3.5 md:pl-3">
                                    {g.actualRtp === null ? (
                                      <div className="flex flex-col items-end">
                                        <span className="text-black/30">–</span>
                                        <span className="text-[11px] text-black/30 mt-0.5">no plays yet</span>
                                      </div>
                                    ) : (
                                      <div className="flex flex-col items-end">
                                        <span className="text-[13px] font-bold tabular-nums md:text-[15px] text-black">
                                          {fmtPct(g.actualRtp)}
                                        </span>
                                        <span className={\`mt-0.5 text-[11px] font-medium tabular-nums \${g.actualRtp > g.theoreticalRtp ? "text-emerald-600" : g.actualRtp < g.theoreticalRtp ? "text-rose-500" : "text-black/40"}\`}>
                                          {g.actualRtp > g.theoreticalRtp ? "+" : ""}{fmtPct(g.actualRtp - g.theoreticalRtp)}
                                        </span>
                                      </div>
                                    )}
                                  </td>
                                </>
                              )}`;

content = content.replace(oldRowCells, newRowCells);

// 4. Update colSpan in expanded row
content = content.replace(
  'const colCount = 7;',
  'const colCount = gameCategory === "Randball" ? 6 : 7;'
);

fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
console.log("Updated table columns and cells");
