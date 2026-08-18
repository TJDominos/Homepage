const fs = require('fs');
let code = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf8');

const swapSuccessTarget = `<motion.p
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-[14px] text-slate-500 mb-8 max-w-[200px]"
                >
                  On-chain transfer is processing. Your balance will update shortly.
                </motion.p>`;
const swapSuccessReplacement = `<motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mb-6"
                >
                  <div className="text-[24px] font-bold text-blue-500 mb-1">
                    +{formatNumber(calculateTokenFromSwap())} {swapCurrency}
                  </div>
                  <p className="text-[14px] text-slate-500 max-w-[200px] mx-auto">
                    On-chain transfer is processing. Your balance will update shortly.
                  </p>
                </motion.div>`;
code = code.replace(swapSuccessTarget, swapSuccessReplacement);

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', code);
console.log('Swap Bonus updated');
