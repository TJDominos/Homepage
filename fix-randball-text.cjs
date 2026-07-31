const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

content = content.replace(
  />\s*Randball\s*<\/button>/g,
  '>\n                  Rand Ball\n                </button>'
);

fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
