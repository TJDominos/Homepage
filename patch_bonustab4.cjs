const fs = require('fs');
let content = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf-8');

content = content.replace(
  "{SUPPORTED_ASSETS.map(asset => (",
  "{[...SUPPORTED_ASSETS].sort((a, b) => a.localeCompare(b)).map(asset => ("
);

content = content.replace(
  "{SUPPORTED_ASSETS.filter(a => a !== 'Gcoin').map(asset => (",
  "{[...SUPPORTED_ASSETS].filter(a => a !== 'Gcoin').sort((a, b) => a.localeCompare(b)).map(asset => ("
);

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', content);
