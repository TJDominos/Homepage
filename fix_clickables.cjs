const fs = require('fs');
let content = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf-8');

// 1. Remove the onClick collapse from the widget headers
const regex = /<div \n                  className=\{\`flex flex-col items-center w-full \$\{!isDesktop \? "cursor-pointer" : ""\}\`\}\n                  onClick=\{\(\) => \{ if \(!isDesktop\) setExpandedWidget\(null\); \}\}\n                >/g;

content = content.replace(regex, '<div className="flex flex-col items-center w-full">');

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', content);
