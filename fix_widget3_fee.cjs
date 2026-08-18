const fs = require('fs');
let code = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf8');

code = code.replace(
  '<div className="h-[20px] flex items-center justify-center mt-1 w-full"></div>',
  `<div className="flex flex-col items-center justify-center mt-1 w-full gap-1">
                      <span className="text-[11px] text-slate-400 font-medium leading-[1]">
                        No conversion fee
                      </span>
                    </div>`
);

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', code);
console.log("Widget 3 fee fixed");
