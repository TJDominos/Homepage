const fs = require('fs');
let content = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf-8');

const r3 = /<div className="w-full flex flex-col justify-end gap-3 mt-auto">/;
console.log("r3:", !!content.match(r3));

