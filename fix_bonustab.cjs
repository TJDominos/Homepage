const fs = require('fs');
let bt = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf-8');

bt = bt.replace('Exchange Tokens to Bonus.', 'Exchange Tokens to Bonus');
bt = bt.replace('Redeem Bonus to Tokens.', 'Exchange Bonus to Tokens');
bt = bt.replace(/<h3 className="text-\[16px\] font-semibold text-black">Redeem Bonus<\/h3>/, '<h3 className="text-[16px] font-semibold text-black">Redeem Token</h3>');
bt = bt.replace(/<h3 className="text-\[16px\] font-semibold text-black mb-1">\s*Redeem Bonus\s*<\/h3>/, '<h3 className="text-[16px] font-semibold text-black mb-1">\n                  Redeem Token\n                </h3>');

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', bt);
