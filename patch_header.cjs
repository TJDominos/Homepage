const fs = require('fs');
let content = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf-8');

content = content.replace(
  'Bonuses can be used for gameplay or converted to WLT. Claim a bonus\\n        code, or top up by converting your Gcoin and WLT.',
  'Bonuses can be used for gameplay or converted to Tokens. Claim a bonus\\n        code, or top up by converting your Tokens.'
);

content = content.replace(
  'Bonuses can be used for gameplay or converted to WLT. Claim a bonus\n        code, or top up by converting your Gcoin and WLT.',
  'Bonuses can be used for gameplay or converted to Tokens. Claim a bonus\n        code, or top up by converting your Tokens.'
);

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', content);
