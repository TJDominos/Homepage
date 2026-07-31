const fs = require('fs');
let content = fs.readFileSync('src/frontend/MoneyPage.tsx', 'utf-8');

const regex = /<\/AnimatePresence>`\}[\s\S]*?      \)}/;
content = content.replace(regex, '</AnimatePresence>');
fs.writeFileSync('src/frontend/MoneyPage.tsx', content);
