const fs = require('fs');
let content = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf-8');
content = content.replace(/<div className="w-full flex-1 flex flex-col justify-end gap-3 mt-auto">/g, '<div className="w-full flex flex-col justify-end gap-3 mt-auto">');
fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', content);
