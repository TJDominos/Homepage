const fs = require('fs');
let code = fs.readFileSync('src/frontend/money/tabs/RewardsTab.tsx', 'utf8');

code = code.replace(/<\/>\s*}$/, '</>\n  );\n}');
fs.writeFileSync('src/frontend/money/tabs/RewardsTab.tsx', code);
