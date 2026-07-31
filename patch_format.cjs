const fs = require('fs');
let content = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf-8');

content = content.replace(
  /return num\.toLocaleString\("en-US", { maximumFractionDigits: 2 }\);/g,
  'return (num || 0).toLocaleString("en-US", { maximumFractionDigits: 2 });'
);

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', content);
