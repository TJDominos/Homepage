const fs = require('fs');
let content = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf-8');

content = content.replace(
  'placeholder="Min 1,000 Bonus"',
  'placeholder="Min: 1,000 Bonus"'
);

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', content);
