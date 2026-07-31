const fs = require('fs');

let menuBar = fs.readFileSync('src/frontend/money/components/WalletMenuBar.tsx', 'utf-8');
menuBar = menuBar.replace(/{ id: "bonus", label: "Bonus & Gcoin Swap" }/, '{ id: "bonus", label: "Bonus" }');
fs.writeFileSync('src/frontend/money/components/WalletMenuBar.tsx', menuBar);

let moneyPage = fs.readFileSync('src/frontend/MoneyPage.tsx', 'utf-8');
moneyPage = moneyPage.replace(/<span>Bonus & Gcoin Swap<\/span>/, '<span>Bonus</span>');
fs.writeFileSync('src/frontend/MoneyPage.tsx', moneyPage);
