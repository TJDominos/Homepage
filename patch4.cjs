const fs = require('fs');
let content = fs.readFileSync('src/frontend/MoneyPage.tsx', 'utf-8');

content = content.replace(
  /\`\$\{Number\\(price\\.toFixed\\(6\\)\\)\\.toString\\(\\)\}\`/,
  '\`$$\${Number(price.toFixed(6)).toString()}\`'
);

fs.writeFileSync('src/frontend/MoneyPage.tsx', content);
