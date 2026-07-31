const fs = require('fs');
let content = fs.readFileSync('src/frontend/money/components/WalletMenuBar.tsx', 'utf-8');
content = content.replace(/\{ id: "bonus", label: "Bonus.*?Gcoin Swap" \},/, '{ id: "bonus", label: "Bonus & Gcoin Swap" },');
fs.writeFileSync('src/frontend/money/components/WalletMenuBar.tsx', content);
