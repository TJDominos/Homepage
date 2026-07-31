const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

// Remove CurrencyLines
const currencyLinesRegex = /\/\*\* Renders one or more rows.*?const CurrencyLines.*?\}\);\s*\}\s*<\/div>\s*\);\s*\};/s;
content = content.replace(currencyLinesRegex, '');

// Remove BreakdownGroup
const breakdownGroupRegex = /\/\*\* One labeled group of the below-md expanded panel.*?const BreakdownGroup.*?<\/div>\s*<\/div>\s*\);\s*\};/s;
content = content.replace(breakdownGroupRegex, '');

fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
console.log("Cleaned up unused components");
