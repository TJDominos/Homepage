const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

// Fix My Payouts Table
const oldMyStatsHeader = `<thead className="text-xs font-medium text-(--text-subtle)">
                          <tr>
                            <th className="px-1.5 py-2 sm:px-2">Game</th>
                            <th className="px-1.5 py-2 text-right sm:px-2">Plays</th>
                            <th className="hidden px-2 py-2 text-right sm:table-cell">
                              Wagered
                            </th>
                            <th className="hidden px-2 py-2 text-right sm:table-cell">
                              Won
                            </th>
                            <th className="px-1.5 py-2 text-right sm:px-2">Net</th>
                            <th className="px-1.5 py-2 text-right sm:px-2">My RTP</th>
                          </tr>
                        </thead>`;

const newMyStatsHeader = `<thead className="text-xs font-medium text-(--text-subtle)">
                          <tr>
                            <th className="px-1.5 py-2 sm:px-2 whitespace-nowrap">Game</th>
                            <th className="px-1.5 py-2 text-right sm:px-2 whitespace-nowrap">Plays</th>
                            <th className="px-2 py-2 text-right whitespace-nowrap">Wagered</th>
                            <th className="px-2 py-2 text-right whitespace-nowrap">Won</th>
                            <th className="px-1.5 py-2 text-right sm:px-2 whitespace-nowrap">Net</th>
                            <th className="px-1.5 py-2 text-right sm:px-2 whitespace-nowrap">My RTP</th>
                          </tr>
                        </thead>`;
content = content.replace(oldMyStatsHeader, newMyStatsHeader);

const oldMyStatsRow = `<td className="px-1.5 py-2.5 sm:px-2">
                                <div className="flex items-center gap-2 sm:gap-2.5">
                                  <ProductLogo
                                    src={r.logo}
                                    alt={r.name}
                                    className="h-6 w-6 shrink-0 rounded-(--radius-md) object-cover sm:h-7 sm:w-7"
                                  />
                                  <span className="whitespace-nowrap font-medium text-(--text-primary)">
                                    {r.name}
                                  </span>
                                </div>
                              </td>
                              <td className="px-1.5 py-2.5 text-right tabular-nums text-(--text-subtle) sm:px-2">
                                {r.plays.toLocaleString("en-US")}
                              </td>
                              <td className="hidden px-2 py-2.5 text-right tabular-nums text-(--text-primary) sm:table-cell">
                                {fmtUsd(r.wageredUsd, 2)}
                              </td>
                              <td className="hidden px-2 py-2.5 text-right tabular-nums text-(--text-primary) sm:table-cell">
                                {fmtUsd(r.wonUsd, 2)}
                              </td>
                              <td className="px-1.5 py-2.5 text-right tabular-nums text-(--text-primary) sm:px-2">
                                {r.netUsd >= 0 ? "+" : "−"}
                                {fmtUsd(Math.abs(r.netUsd), 2)}
                              </td>
                              <td className="px-1.5 py-2.5 text-right font-semibold tabular-nums text-(--text-accent) sm:px-2">
                                {fmtPct(r.rtp)}
                              </td>`;

const newMyStatsRow = `<td className="px-1.5 py-2.5 sm:px-2">
                                <div className="flex items-center gap-2 sm:gap-2.5">
                                  <ProductLogo
                                    src={r.logo}
                                    alt={r.name}
                                    className="h-8 w-8 shrink-0 rounded-xl border border-black/10 object-cover sm:h-10 sm:w-10"
                                  />
                                  <span className="whitespace-nowrap font-medium text-[13px] sm:text-[15px] text-black">
                                    {r.name}
                                  </span>
                                </div>
                              </td>
                              <td className="px-1.5 py-2.5 text-right tabular-nums text-black/60 sm:px-2">
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
content = content.replace(oldMyStatsRow, newMyStatsRow);


// Fix Game Payouts Table
const oldGameRows1 = `<td className="px-3 py-3 md:px-4 md:py-3.5">
                                <div className="flex items-center gap-2 md:gap-3">
                                  <ProductLogo
                                    src={g.logo}
                                    alt={g.name}
                                    className="h-8 w-8 shrink-0 rounded-(--radius-md) object-cover md:h-9 md:w-9"
                                  />
                                  <div className="min-w-0 truncate text-[13px] font-semibold text-(--text-primary) md:text-sm">
                                    {g.name}
                                  </div>
                                </div>
                              </td>`;

const newGameRows1 = `<td className="px-3 py-3 md:px-4 md:py-3.5 whitespace-nowrap">
                                <div className="flex items-center gap-2 md:gap-3">
                                  <ProductLogo
                                    src={g.logo}
                                    alt={g.name}
                                    className="h-8 w-8 shrink-0 rounded-xl border border-black/10 object-cover sm:h-10 sm:w-10"
                                  />
                                  <div className="min-w-0 truncate text-[13px] font-semibold text-black sm:text-[15px]">
                                    {g.name}
                                  </div>
                                </div>
                              </td>`;
content = content.replace(oldGameRows1, newGameRows1);

const oldGameRowsActualRtp = `<td className="py-3 pl-1.5 pr-3 text-right md:py-3.5 md:pl-3">
                                {g.actualRtp === null ? (
                                  <>
                                    <span className="text-(--text-disabled)">–</span>
                                    <span className="block text-xs text-(--text-disabled)">
                                      no plays yet
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span className="text-[13px] font-semibold tabular-nums text-(--text-primary) md:text-sm">
                                      {fmtPct(g.actualRtp)}
                                    </span>
                                    {/* The Theoretical RTP column is hidden below
                                        md, so surface theo here instead. */}
                                    <span className="mt-0.5 block text-[11px] tabular-nums text-(--color-black-alpha-50) md:hidden">
                                      theo {fmtPct(g.theoreticalRtp)}
                                    </span>
                                  </>
                                )}
                              </td>`;

const newGameRowsActualRtp = `<td className="py-3 pl-1.5 pr-3 text-right md:py-3.5 md:pl-3">
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
                              </td>`;

content = content.replace(oldGameRowsActualRtp, newGameRowsActualRtp);

fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
console.log('Fixed tables');
