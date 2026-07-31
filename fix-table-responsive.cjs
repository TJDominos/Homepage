const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

// 1. ASSETS_RANKING Table Headers
content = content.replace(
  /<th className="px-2 md:px-4 py-3 md:py-4 text-right">Users<\/th>/,
  '<th className="hidden sm:table-cell px-2 md:px-4 py-3 md:py-4 text-right">Users</th>'
);
content = content.replace(
  /<th className="px-2 md:px-4 py-3 md:py-4 text-right whitespace-nowrap">Last Withdrawn<\/th>/,
  '<th className="hidden md:table-cell px-2 md:px-4 py-3 md:py-4 text-right whitespace-nowrap">Last Withdrawn</th>'
);

// 2. ASSETS_RANKING Table Body
const oldAssetCell = `<td className="px-2 md:px-4 py-3 md:py-4">
                      <div className="flex items-center space-x-2 md:space-x-4">
                        <AssetIcon type={item.symbol} className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-transparent" />
                        <span className="font-semibold text-[14px] sm:text-[16px] text-black">{item.symbol}</span>
                      </div>
                    </td>
                    <td className="px-2 md:px-4 py-3 md:py-4 text-right">`;

const newAssetCell = `<td className="px-2 md:px-4 py-3 md:py-4">
                      <div className="flex items-center space-x-2 md:space-x-4">
                        <AssetIcon type={item.symbol} className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-transparent" />
                        <div>
                          <div className="font-semibold text-[14px] sm:text-[16px] text-black">{item.symbol}</div>
                          <div className="sm:hidden text-[12px] text-black/50 mt-0.5">{item.users.toLocaleString()} users</div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell px-2 md:px-4 py-3 md:py-4 text-right">`;

content = content.replace(oldAssetCell, newAssetCell);

content = content.replace(
  /<td className="px-2 md:px-4 py-3 md:py-4 text-right whitespace-nowrap">\s*<span className="text-\[12px\] sm:text-\[14px\] text-zinc-400">/g,
  '<td className="hidden md:table-cell px-2 md:px-4 py-3 md:py-4 text-right whitespace-nowrap">\n                      <span className="text-[12px] sm:text-[14px] text-zinc-400">'
);

// 3. Games Table Headers
content = content.replace(
  /<SortTh\s*k="theo"\s*label="Target RTP"\s*tip="The share of incomes a game is designed to reward players."\s*\/>/,
  `<SortTh
                            k="theo"
                            label="Target RTP"
                            tip="The share of incomes a game is designed to reward players."
                            className="hidden md:table-cell"
                          />`
);

content = content.replace(
  /<SortTh\s*k="plays"\s*label="Total Plays"\s*\/>/,
  `<SortTh
                        k="plays"
                        label="Total Plays"
                        className="hidden sm:table-cell"
                      />`
);

// 4. Games Table Body
content = content.replace(
  /<td className="px-3 py-3\.5 text-right tabular-nums text-\(--text-subtle\)">\s*\{fmtPct\(g\.theoreticalRtp\)\}\s*<\/td>/,
  `<td className="hidden md:table-cell px-3 py-3.5 text-right tabular-nums text-(--text-subtle)">
                                    {fmtPct(g.theoreticalRtp)}
                                  </td>`
);

content = content.replace(
  /<td className="px-3 py-3\.5 text-right tabular-nums text-black\/60">\s*\{g\.totalPlays === 0\s*\?\s*"–"\s*:\s*g\.totalPlays\.toLocaleString\("en-US"\)\}\s*<\/td>/,
  `<td className="hidden sm:table-cell px-3 py-3.5 text-right tabular-nums text-black/60">
                                {g.totalPlays === 0
                                  ? "–"
                                  : g.totalPlays.toLocaleString("en-US")}
                              </td>`
);

// Add total plays text under total rewards
const oldTotalRewards = `<td className="px-2 py-3 md:px-3 md:py-3.5 text-right font-medium tabular-nums text-black">
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
                              </td>`;

const newTotalRewards = `<td className="px-2 py-3 md:px-3 md:py-3.5 text-right font-medium tabular-nums text-black">
                                <div className="flex flex-col items-end">
                                  <span>
                                    {g.totalPaidOutUsd === 0
                                      ? "–"
                                      : fmtGcoin(
                                          g.totalPaidOutUsd,
                                          g.totalPaidOutUsd < 10 ? 2 : 0,
                                        )}
                                  </span>
                                  <span className="sm:hidden mt-0.5 text-[11px] text-black/40 font-normal">{g.totalPlays.toLocaleString("en-US")} plays</span>
                                </div>
                              </td>`;

content = content.replace(oldTotalRewards, newTotalRewards);

fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
console.log("Updated tables for responsiveness");
