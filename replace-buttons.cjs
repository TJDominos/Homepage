const fs = require('fs');
let code = fs.readFileSync('src/components/MoneyTabs/BonusTab.tsx', 'utf-8');
code = code.replace(/isDesktop\s*\?\s*\"w-\[80px\] h-\[28px\] text-\[13px\] rounded-full mx-auto\"\s*:\s*\"w-full py-3 rounded-full text-\[14px\]\"/g, '\"w-[80px] h-[28px] text-[13px] rounded-full mx-auto\"');
fs.writeFileSync('src/components/MoneyTabs/BonusTab.tsx', code);
console.log('done.');
