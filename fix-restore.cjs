const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

const regexToReplace = /<th className="px-1\.5 py-2 text-right sm:px-2 whitespace-nowrap">Reward%<\/th>\s*<\/tr>\s*<\/React\.Fragment>\s*\);\s*}\)}\s*<\/tbody>\s*<\/table>\s*<\/div>\s*<\/div>\s*{\/\* ---------- Smallprint ---------- \*\//;

const replacementText = `<th className="px-1.5 py-2 text-right sm:px-2 whitespace-nowrap">Reward%</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-(--color-purple-100)">
                          {filteredMyStats.games.map((r) => (
                            <tr key={r.gameId}>
                              <td className="pl-2 pr-1.5 py-2.5 sm:px-2">
                                <div className="flex items-center gap-1.5">
                                  <ProductLogo
                                    src={r.logo}
                                    alt={r.name}
                                    className="h-5 w-5 shrink-0 rounded-md border border-(--color-black-alpha-10) object-cover"
                                  />
                                  <span className="truncate text-xs font-semibold text-(--text-primary)">
                                    {r.name}
                                  </span>
                                </div>
                              </td>
                              <td className="hidden px-1.5 py-2.5 text-right tabular-nums text-(--text-subtle) sm:table-cell sm:px-2">
                                {r.plays.toLocaleString("en-US")}
                              </td>
                              
                              <td className="px-2 py-2.5 text-right tabular-nums text-black/80">
                                <div className="flex flex-col items-end">
                                  <span>{fmtGcoin(r.wonUsd, 2)}</span>
                                  <span className="text-[11px] text-black/40 sm:hidden mt-0.5">{r.plays.toLocaleString("en-US")} plays</span>
                                </div>
                              </td>
                              
                              <td className="px-1.5 py-2.5 text-right tabular-nums sm:px-2">
                                <div className="flex flex-col items-end">
                                  <span className="text-[13px] font-bold md:text-[15px] text-black">
                                    {fmtPct(r.rtp)}
                                  </span>
                                  <span className={\`text-[11px] font-medium mt-0.5 \${r.rtp > 100 ? "text-emerald-600" : r.rtp < 100 ? "text-rose-500" : "text-black/40"}\`}>
                                    {r.rtp > 100 ? "+" : ""}{fmtPct(r.rtp - 100)}
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
            {/* ---------- Games table ---------- */}
            <div className="payout-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead className="payout-thead border-none">
                    <tr>
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
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-(--color-black-alpha-5) text-sm">
                    {loading
                      ? [...Array(7)].map((_, i) => (
                          <tr key={i} className="animate-pulse">
                            <td className="px-3 py-4 md:px-4">
                              <div className="flex items-center gap-2 md:gap-3">
                                <div className="h-8 w-8 rounded-(--radius-md) bg-(--color-black-alpha-10) md:h-9 md:w-9" />
                                <div className="h-4 w-24 rounded-(--radius-sm) bg-(--color-black-alpha-10)" />
                              </div>
                            </td>
                            {[
                              gameCategory === "Randball" ? "" : null, // Live Jackpot
                              gameCategory === "Rand Game" ? "" : null, // Theoretical RTP
                              gameCategory === "Rand Game" ? "" : null, // Actual RTP
                              "", // Total Plays
                              "", // Paid Out
                            ].filter(cls => cls !== null).map((cls, j) => (
                              <td key={j} className={\`px-1.5 py-4 md:px-3 \${cls}\`}>
                                <div className="ml-auto h-4 w-16 rounded-(--radius-sm) bg-(--color-black-alpha-5)" />
                              </td>
                            ))}
                          </tr>
                        ))
                      : sortedGames.map((g) => {
                          return (
                            <React.Fragment key={g.gameId}>
                            <tr
                              className="payout-row transition-colors hover:bg-black/[0.02]"
                            >
                              <td className="pl-4 sm:pl-6 pr-3 py-3 md:pr-4 md:py-3.5 whitespace-nowrap">
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
                              </td>
                              {gameCategory === "Randball" && (
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
                              )}
                              <td className="px-3 py-3.5 text-right tabular-nums text-black/60">
                                {g.totalPlays === 0
                                  ? "–"
                                  : g.totalPlays.toLocaleString("en-US")}
                              </td>
                              <td className="px-2 py-3 md:px-3 md:py-3.5 text-right font-medium tabular-nums text-black">
                                <div className="flex flex-col items-end">
                                  <span>
                                    {g.totalPaidOutUsd === 0
                                      ? "–"
                                      : fmtGcoin(
                                          g.totalPaidOutUsd,
                                          g.totalPaidOutUsd < 10 ? 2 : 0,
                                        )}
                                  </span>
                                  
                                </div>
                              </td>
                            </tr>
                            </React.Fragment>
                          );
                        })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ---------- Smallprint ---------- */}`;

content = content.replace(regexToReplace, replacementText);

fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
console.log("Restored missing syntax!");
