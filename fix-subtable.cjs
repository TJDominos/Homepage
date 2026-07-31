const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

const oldSubtable = `                            {expanded && (
                              <tr className="payout-panel hidden md:table-row">
                                <td className="px-4 py-4" />
                                <td className="px-3 py-4 align-top">
                                  {/* No jackpot pool → leave the cell empty rather
                                      than show a dash under the row's dash. */}
                                  {g.jackpotByCurrency && (
                                    <div className="w-0 min-w-full">
                                      <CurrencyLines splits={g.jackpotByCurrency} />
                                    </div>
                                  )}
                                </td>
                                <td />
                                <td />
                                <td />
                                <td className="px-3 py-4 align-top">
                                  <div className="w-0 min-w-full">
                                    <CurrencyLines splits={g.paidOutByCurrency} />
                                  </div>
                                </td>
                                <td />
                              </tr>
                            )}`;

const newSubtable = `                            {expanded && (
                              <tr className="payout-panel hidden md:table-row">
                                <td className="px-4 py-4" />
                                {gameCategory === "Randball" && (
                                  <td className="px-3 py-4 align-top">
                                    {g.jackpotByCurrency && (
                                      <div className="w-0 min-w-full">
                                        <CurrencyLines splits={g.jackpotByCurrency} />
                                      </div>
                                    )}
                                  </td>
                                )}
                                {gameCategory === "Rand Game" && (
                                  <>
                                    <td />
                                    <td />
                                  </>
                                )}
                                <td />
                                <td className="px-3 py-4 align-top">
                                  <div className="w-0 min-w-full">
                                    <CurrencyLines splits={g.paidOutByCurrency} />
                                  </div>
                                </td>
                                <td />
                              </tr>
                            )}`;
                            
content = content.replace(oldSubtable, newSubtable);
fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
console.log("Updated expanded row columns");
