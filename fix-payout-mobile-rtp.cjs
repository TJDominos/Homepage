const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

// 1. My Stats Table - Combining Plays into Won, converting RTP to diff
const oldMyStatsHeader = `<thead className="text-xs font-medium text-(--text-subtle)">
                          <tr>
                            <th className="px-1.5 py-2 sm:px-2 whitespace-nowrap">Game</th>
                            <th className="px-1.5 py-2 text-right sm:px-2 whitespace-nowrap">Plays</th>
                            <th className="px-2 py-2 text-right whitespace-nowrap">Wagered</th>
                            <th className="px-2 py-2 text-right whitespace-nowrap">Won</th>
                            <th className="px-1.5 py-2 text-right sm:px-2 whitespace-nowrap">Net</th>
                            <th className="px-1.5 py-2 text-right sm:px-2 whitespace-nowrap">My RTP</th>
                          </tr>
                        </thead>`;
const newMyStatsHeader = `<thead className="text-xs font-medium text-(--text-subtle)">
                          <tr>
                            <th className="px-1.5 py-2 sm:px-2 whitespace-nowrap">Game</th>
                            <th className="hidden px-1.5 py-2 text-right sm:table-cell sm:px-2 whitespace-nowrap">Plays</th>
                            <th className="px-2 py-2 text-right whitespace-nowrap">Wagered</th>
                            <th className="px-2 py-2 text-right whitespace-nowrap">Won</th>
                            <th className="px-1.5 py-2 text-right sm:px-2 whitespace-nowrap">Net</th>
                            <th className="px-1.5 py-2 text-right sm:px-2 whitespace-nowrap">My RTP</th>
                          </tr>
                        </thead>`;
content = content.replace(oldMyStatsHeader, newMyStatsHeader);

const oldMyStatsRow = `<td className="px-1.5 py-2.5 text-right tabular-nums text-black/60 sm:px-2">
                                {r.plays.toLocaleString("en-US")}
                              </td>
                              <td className="px-2 py-2.5 text-right tabular-nums text-black/80">
                                {fmtUsd(r.wageredUsd, 2)}
                              </td>
                              <td className="px-2 py-2.5 text-right tabular-nums text-black/80">
                                {fmtUsd(r.wonUsd, 2)}
                              </td>
                              <td className="px-1.5 py-2.5 text-right tabular-nums sm:px-2">
                                <span className={r.netUsd > 0 ? "text-emerald-600 font-semibold" : r.netUsd < 0 ? "text-rose-500 font-medium" : "text-black"}>
                                  {r.netUsd >= 0 ? "+" : "−"}
                                  {fmtUsd(Math.abs(r.netUsd), 2)}
                                </span>
                              </td>
                              <td className="px-1.5 py-2.5 text-right font-bold tabular-nums sm:px-2">
                                <span className={r.rtp > 100 ? "text-emerald-600" : r.rtp < 100 ? "text-rose-500" : "text-black"}>
                                  {fmtPct(r.rtp)}
                                </span>
                              </td>`;

const newMyStatsRow = `<td className="hidden px-1.5 py-2.5 text-right tabular-nums text-black/60 sm:table-cell sm:px-2">
                                {r.plays.toLocaleString("en-US")}
                              </td>
                              <td className="px-2 py-2.5 text-right tabular-nums text-black/80">
                                {fmtUsd(r.wageredUsd, 2)}
                              </td>
                              <td className="px-2 py-2.5 text-right tabular-nums text-black/80">
                                <div className="flex flex-col items-end">
                                  <span>{fmtUsd(r.wonUsd, 2)}</span>
                                  <span className="text-[11px] text-black/40 sm:hidden mt-0.5">{r.plays.toLocaleString("en-US")} plays</span>
                                </div>
                              </td>
                              <td className="px-1.5 py-2.5 text-right tabular-nums sm:px-2">
                                <span className={r.netUsd > 0 ? "text-emerald-600 font-semibold" : r.netUsd < 0 ? "text-rose-500 font-medium" : "text-black"}>
                                  {r.netUsd >= 0 ? "+" : "−"}
                                  {fmtUsd(Math.abs(r.netUsd), 2)}
                                </span>
                              </td>
                              <td className="px-1.5 py-2.5 text-right tabular-nums sm:px-2">
                                <div className="flex flex-col items-end">
                                  <span className={\`text-[13px] font-bold md:text-[15px] \${r.rtp > 100 ? "text-emerald-600" : r.rtp < 100 ? "text-rose-500" : "text-black"}\`}>
                                    {r.rtp > 100 ? "+" : ""}{fmtPct(r.rtp - 100)}
                                  </span>
                                  <span className="text-[11px] text-black/40 hidden sm:block mt-0.5">{fmtPct(r.rtp)}</span>
                                </div>
                              </td>`;
content = content.replace(oldMyStatsRow, newMyStatsRow);

// 2. Game Payouts Table - Headers
const oldGameHeaders = `<SortTh
                        k="paid"
                        label="Paid Out"
                        className="hidden md:table-cell"
                      />`;
const newGameHeaders = `<SortTh
                        k="paid"
                        label="Paid Out"
                        className="pr-2 md:pr-0"
                      />`;
content = content.replace(oldGameHeaders, newGameHeaders);

// 3. Game Payouts Table - Rows
const oldGameRowActualRtp = `<td className="py-3 pl-1.5 pr-3 text-right md:py-3.5 md:pl-3">
                                {g.actualRtp === null ? (
                                  <>
                                    <span className="text-(--text-disabled)">–</span>
                                    <span className="block text-xs text-(--text-disabled)">
                                      no plays yet
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span className={\`text-[13px] font-bold tabular-nums md:text-[15px] \${g.actualRtp > g.theoreticalRtp ? "text-emerald-600" : g.actualRtp < g.theoreticalRtp ? "text-rose-500" : "text-black"}\`}>
                                      {fmtPct(g.actualRtp)}
                                    </span>
                                    <span className="mt-0.5 block text-[11px] md:text-[12px] tabular-nums text-black/50">
                                      vs {fmtPct(g.theoreticalRtp)} theo
                                    </span>
                                  </>
                                )}
                              </td>
                              <td className="hidden px-3 py-3.5 text-right tabular-nums text-(--text-subtle) md:table-cell">
                                {g.totalPlays === 0
                                  ? "–"
                                  : g.totalPlays.toLocaleString("en-US")}
                              </td>
                              <td className="hidden px-3 py-3.5 text-right font-medium tabular-nums text-(--text-primary) md:table-cell">
                                {g.totalPaidOutUsd === 0
                                  ? "–"
                                  : fmtUsd(
                                      g.totalPaidOutUsd,
                                      g.totalPaidOutUsd < 10 ? 2 : 0,
                                    )}
                              </td>`;

const newGameRowActualRtp = `<td className="py-3 pl-1.5 pr-3 text-right md:py-3.5 md:pl-3">
                                {g.actualRtp === null ? (
                                  <div className="flex flex-col items-end">
                                    <span className="text-black/30">–</span>
                                    <span className="text-[11px] text-black/30 mt-0.5">no plays yet</span>
                                  </div>
                                ) : (
                                  <div className="flex flex-col items-end">
                                    <span className={\`text-[13px] font-bold tabular-nums md:text-[15px] \${g.actualRtp > g.theoreticalRtp ? "text-emerald-600" : g.actualRtp < g.theoreticalRtp ? "text-rose-500" : "text-black"}\`}>
                                      {g.actualRtp > g.theoreticalRtp ? "+" : ""}{fmtPct(g.actualRtp - g.theoreticalRtp)}
                                    </span>
                                    <span className="mt-0.5 text-[11px] tabular-nums text-black/40">
                                      {fmtPct(g.actualRtp)}
                                    </span>
                                  </div>
                                )}
                              </td>
                              <td className="hidden px-3 py-3.5 text-right tabular-nums text-black/60 md:table-cell">
                                {g.totalPlays === 0
                                  ? "–"
                                  : g.totalPlays.toLocaleString("en-US")}
                              </td>
                              <td className="px-2 py-3 md:px-3 md:py-3.5 text-right font-medium tabular-nums text-black">
                                <div className="flex flex-col items-end">
                                  <span>
                                    {g.totalPaidOutUsd === 0
                                      ? "–"
                                      : fmtUsd(
                                          g.totalPaidOutUsd,
                                          g.totalPaidOutUsd < 10 ? 2 : 0,
                                        )}
                                  </span>
                                  <span className="text-[11px] text-black/40 md:hidden mt-0.5">
                                    {g.totalPlays === 0 ? "0 plays" : \`\${g.totalPlays.toLocaleString("en-US")} plays\`}
                                  </span>
                                </div>
                              </td>`;

content = content.replace(oldGameRowActualRtp, newGameRowActualRtp);

fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
console.log('Fixed mobile layout and RTP displays');
