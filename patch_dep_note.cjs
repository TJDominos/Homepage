const fs = require('fs');
let content = fs.readFileSync('src/frontend/money/tabs/DepositTab.tsx', 'utf-8');

content = content.replace(
  'Deposit is processed through the blockchain networks, wrong address will result in the loss of funds',
  'USDC and USDT deposits are converted to Gcoin. All other assets are converted to Bonus.'
);

fs.writeFileSync('src/frontend/money/tabs/DepositTab.tsx', content);
