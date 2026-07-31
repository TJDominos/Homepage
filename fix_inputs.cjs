const fs = require('fs');
let content = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf-8');

content = content.replace(/py-3 rounded-full/g, "h-[32px] rounded-full");
content = content.replace(/px-3 py-3/g, "px-3 h-[32px]");
content = content.replace(/px-5 py-3/g, "px-5 h-[32px]");

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', content);
