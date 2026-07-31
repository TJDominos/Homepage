const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

// 1. Fix Game header centering
content = content.replace(
  /<th className="pl-4 sm:pl-6 pr-3 py-3\.5 md:pr-4 md:py-4 text-center">Game<\/th>/,
  '<th className="pl-4 sm:pl-6 pr-3 py-3.5 md:pr-4 md:py-4 text-left">Game</th>'
);

content = content.replace(
  /<th className="pl-2 pr-1\.5 py-2 sm:px-2 whitespace-nowrap text-center">Game<\/th>/,
  '<th className="pl-4 sm:pl-6 pr-1.5 py-2 sm:pr-2 whitespace-nowrap text-left">Game</th>'
);

// 2. Fix Game logo centering in rows
content = content.replace(
  /<td className="pl-4 sm:pl-6 pr-3 py-3 md:pr-4 md:py-3\.5 whitespace-nowrap">\s*<div className="flex items-center justify-center">/g,
  '<td className="pl-4 sm:pl-6 pr-3 py-3 md:pr-4 md:py-3.5 whitespace-nowrap">\n                                <div className="flex items-center">'
);

content = content.replace(
  /<td className="pl-2 pr-1\.5 py-2\.5 sm:px-2">\s*<div className="flex items-center justify-center">/g,
  '<td className="pl-4 sm:pl-6 pr-1.5 py-2.5 sm:pr-2">\n                                <div className="flex items-center">'
);

// 3. Fix Total Rewards header padding
content = content.replace(
  /k="paid"\s*label="Total Rewards"\s*className="pr-2 md:pr-0"/g,
  `k="paid"
                        label="Total Rewards"
                        className="pr-4 sm:pr-6"`
);

// 4. Fix Total Rewards cell padding
content = content.replace(
  /<td className="px-2 py-3 md:px-3 md:py-3\.5 text-right font-medium tabular-nums text-black">/g,
  '<td className="pl-2 pr-4 sm:pr-6 py-3 md:pl-3 md:py-3.5 text-right font-medium tabular-nums text-black">'
);

fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
console.log("Updated padding for Game and Total Rewards");
