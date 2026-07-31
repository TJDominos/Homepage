const fs = require('fs');
let content = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf-8');

// Change Title
content = content.replace(
  '<h2 className="text-[16px] font-[600] text-slate-800 mb-2 px-1">Bonus</h2>',
  '<h2 className="text-[16px] font-[600] text-slate-800 mb-2 px-1">Bonus & Gcoin Swap</h2>'
);

// Change Font size of description
content = content.replace(
  '<div className="text-[14px] text-slate-500 leading-relaxed font-normal mb-5 px-1">',
  '<div className="text-[12px] text-slate-500 leading-relaxed font-normal mb-5 px-1">'
);

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', content);
