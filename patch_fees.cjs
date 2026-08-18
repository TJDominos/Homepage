const fs = require('fs');
let code = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf8');

// Patch Widget 1
const topUpSearch = `                      ) : null}
                    </div>
                  </div>
                  <button`;
const topUpReplace = `                      ) : null}
                      <span className="text-[11px] text-slate-400 font-medium leading-[1]">
                        {0 > 0 ? \`Conversion fee: 0.00 Bonus\` : "No conversion fee"}
                      </span>
                    </div>
                  </div>
                  <button`;
code = code.replace(topUpSearch, topUpReplace);

// Patch Widget 2
const swapSearch = `                      )}
                      <span className="text-[11px] text-slate-400 font-medium leading-[1]">
                        Conversion fee: 0.00 {swapCurrency}
                      </span>
                    </div>
                  </div>
                  <button`;
const swapReplace = `                      )}
                      <span className="text-[11px] text-slate-400 font-medium leading-[1]">
                        {0 > 0 ? \`Conversion fee: 0.00 Bonus\` : "No conversion fee"}
                      </span>
                    </div>
                  </div>
                  <button`;
code = code.replace(swapSearch, swapReplace);

// Patch Widget 4
const gcoinSearch = `                      {gcoinDirection === 'fromGcoin' && ['USDC', 'USDT'].includes(gcoinCurrency) && (
                        <span className="text-[11px] text-slate-400 font-medium leading-[1]">
                          Conversion fee: 0.00 {gcoinCurrency}
                        </span>
                      )}
                    </div>
                  </div>
                  <button`;
const gcoinReplace = `                      <span className="text-[11px] text-slate-400 font-medium leading-[1]">
                        {0 > 0 ? \`Conversion fee: 0.00 Gcoin\` : "No conversion fee"}
                      </span>
                    </div>
                  </div>
                  <button`;
code = code.replace(gcoinSearch, gcoinReplace);


fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', code);
console.log("Fees patched!");
