const fs = require('fs');
let code = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf8');

code = code.replace(
  '<div className="h-[20px] flex items-center justify-center mt-1 w-full">',
  '<div className="flex flex-col items-center justify-center mt-1 w-full gap-1">'
);

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', code);
console.log("Widget 1 fee container fixed");
