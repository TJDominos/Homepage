const fs = require('fs');
let content = fs.readFileSync('src/frontend/MoneyPage.tsx', 'utf-8');

content = content.replace(
  /\{asset === 'USDC' \|\| asset === 'USDT' \? \`1 \$\{asset\} = \\\$1\` : \`\$\{Number\(price.toFixed\(6\)\).toString\(\)\}\`\}/,
  "{asset === 'USDC' || asset === 'USDT' ? `1 ${asset} = $1` : `\\$${Number(price.toFixed(6)).toString()}`}"
);

fs.writeFileSync('src/frontend/MoneyPage.tsx', content);
