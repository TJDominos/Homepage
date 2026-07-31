const fs = require('fs');
let content = fs.readFileSync('src/frontend/money/tabs/WithdrawTab.tsx', 'utf-8');

content = content.replace(
  'Withdraw is processed through the blockchain networks Wrong address\\n          will result in the loss of funds',
  'Withdrawal is processed through the blockchain networks, wrong address\\n          will result in the loss of funds'
);
content = content.replace(
  'Withdraw is processed through the blockchain networks Wrong address\n          will result in the loss of funds',
  'Withdrawal is processed through the blockchain networks, wrong address\n          will result in the loss of funds'
);
content = content.replace(
  /Withdraw is processed through the blockchain networks Wrong address\s*will result in the loss of funds/,
  'Withdrawal is processed through the blockchain networks, wrong address will result in the loss of funds'
);

fs.writeFileSync('src/frontend/money/tabs/WithdrawTab.tsx', content);

let contentDeposit = fs.readFileSync('src/frontend/money/tabs/DepositTab.tsx', 'utf-8');
contentDeposit = contentDeposit.replace(
  /Deposit is processed through the blockchain networks Wrong address\s*will result in the loss of funds/,
  'Deposit is processed through the blockchain networks, wrong address will result in the loss of funds'
);
fs.writeFileSync('src/frontend/money/tabs/DepositTab.tsx', contentDeposit);

