const fs = require('fs');
let code = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf8');

// Replace ArrowUpCircle with AssetIcon type="Bonus"
code = code.replace(
  /<ArrowUpCircle className="w-6 h-6 text-green-500" \/>/g,
  '<AssetIcon type="Bonus" className="w-6 h-6" />'
);

code = code.replace(
  /<ArrowUpCircle\s*className="w-\[40px\] h-\[40px\] text-green-500"\s*strokeWidth=\{1\.5\}\s*\/>/g,
  '<AssetIcon type="Bonus" className="w-[40px] h-[40px]" />'
);

code = code.replace(
  /<ArrowUpCircle\s*className="w-8 h-8 text-green-500"\s*strokeWidth=\{1\.5\}\s*\/>/g,
  '<AssetIcon type="Bonus" className="w-8 h-8" />'
);

// Add bonus amount to success screen
const topUpSuccessTarget = `<motion.p
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-[14px] text-slate-500 mb-8 max-w-[200px]"
                >
                  Your bonus balance has been updated.
                </motion.p>`;
const topUpSuccessReplacement = `<motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mb-6"
                >
                  <div className="text-[24px] font-bold text-green-600 mb-1">
                    +{formatNumber(calculateBonusFromTopUp())} Bonus
                  </div>
                  <p className="text-[14px] text-slate-500 max-w-[200px] mx-auto">
                    Your bonus balance has been updated.
                  </p>
                </motion.div>`;
code = code.replace(topUpSuccessTarget, topUpSuccessReplacement);

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', code);
console.log('Top Up Bonus updated');
