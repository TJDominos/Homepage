const fs = require('fs');
let code = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf8');

const targetSuccess = `<motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-[14px] text-slate-500 mb-8 max-w-[200px]"
                >
                  Your {gcoinDirection === "toGcoin" ? "Gcoin" : gcoinCurrency} has been credited to your balance.
                </motion.p>`;

const replacementSuccess = `<motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center mb-6"
                >
                  <div className="text-[24px] font-bold text-blue-600 mb-1">
                    +{formatNumber(calculateGcoinSwap())} {gcoinDirection === "toGcoin" ? "Gcoin" : gcoinCurrency}
                  </div>
                  <p className="text-[14px] text-slate-500 max-w-[200px] mx-auto">
                    Your {gcoinDirection === "toGcoin" ? "Gcoin" : gcoinCurrency} has been credited to your balance.
                  </p>
                </motion.div>`;

code = code.replace(targetSuccess, replacementSuccess);

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', code);
console.log('Gcoin Success updated');
