const fs = require('fs');
let content = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf-8');

const regex = /(<motion\.div\s*key="idle"[\s\S]*?className="w-full h-full flex flex-col items-center"\s*>)\s*(?:<div[^>]*cursor-pointer[^>]*>)?\s*(<motion\.div\s*className="mb-4 mt-2 w-16 h-16[^>]*>[\s\S]*?(?:ArrowUpCircle|ArrowRight(?!Left)|Gift|ArrowRightLeft)[\s\S]*?<\/motion\.div>\s*<h3[^>]*>[\s\S]*?<\/h3>\s*(?:<p[^>]*>[\s\S]*?<\/p>)?)\s*(?:<\/div>\s*)?(<div className="w-full flex flex-col justify-end gap-3 mt-auto">)/g;

let matches = 0;
content = content.replace(regex, (match, p1, p2, p3) => {
  matches++;
  return p1 + '\n                <div \n                  className={`flex flex-col items-center w-full ${!isDesktop ? "cursor-pointer" : ""}`}\n                  onClick={() => { if (!isDesktop) setExpandedWidget(null); }}\n                >\n' + p2 + '\n                </div>\n                ' + p3;
});

console.log("Matches:", matches);
fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', content);
