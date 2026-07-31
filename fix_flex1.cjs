const fs = require('fs');
let content = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf-8');

content = content.replace(/mb-4 flex-1/g, 'mb-4');

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', content);
