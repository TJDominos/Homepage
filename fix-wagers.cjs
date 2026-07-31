const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

content = content.replace(
  'tip="The share of wagers a game is designed to return to players over the long run."',
  'tip="The share of incomes a game is designed to reward players."'
);

content = content.replace(
  'tip="Realized rewards ÷ total wagers to date. Low-volume games swing above and below theory."',
  'tip="Realized rewards ÷ total incomes to date. Low-volume games swing above and below theory."'
);

content = content.replace(
  'rewards ÷ wagers to date and naturally swings while volume is low —',
  'rewards ÷ incomes to date and naturally swings while volume is low —'
);

fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
console.log("Updated wagers to incomes");
