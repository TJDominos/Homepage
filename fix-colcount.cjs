const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

content = content.replace(
  'const colCount = gameCategory === "Randball" ? 6 : 7;',
  'const colCount = gameCategory === "Randball" ? 5 : 6;'
);

fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
console.log("Updated colCount");
