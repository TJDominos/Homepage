const fs = require('fs');
let code = fs.readFileSync('src/frontend/money/tabs/RewardsTab.tsx', 'utf8');

const lastIndex = code.lastIndexOf('</>}');
if (lastIndex !== -1) {
  code = code.substring(0, lastIndex) + '</>\n  );\n}\n';
  fs.writeFileSync('src/frontend/money/tabs/RewardsTab.tsx', code);
  console.log('Fixed syntax');
} else {
  console.log('Could not find suffix');
}
