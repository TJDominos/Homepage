const fs = require('fs');
let content = fs.readFileSync('src/frontend/MoneyPage.tsx', 'utf-8');

content = content.split('\`\$\{Number(price.toFixed(6)).toString()\}\`').join('\`\\$\$\{Number(price.toFixed(6)).toString()\}\`');

fs.writeFileSync('src/frontend/MoneyPage.tsx', content);
