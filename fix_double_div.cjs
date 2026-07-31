const fs = require('fs');
let content = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf-8');

// Replace the duplicated div in Top Up Bonus
content = content.replace(/<div \\s*className=\{\`flex flex-col items-center w-full \$\{!isDesktop \? "cursor-pointer" : ""\}\`\}\\s*onClick=\{.*?setExpandedWidget\\(null\\); \}\}\\s*>\\s*<div \\s*className=\{\`flex flex-col items-center w-full \$\{!isDesktop \? "cursor-pointer" : ""\}\`\}\\s*onClick=\{.*?setExpandedWidget\\(null\\); \}\}\\s*>/g, 
\`<div 
                  className={\\\`flex flex-col items-center w-full \$\{!isDesktop ? "cursor-pointer" : ""}\\\`\}
                  onClick={() => { if (!isDesktop) setExpandedWidget(null); }}
                >\`);

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', content);
