const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

content = content.replace(
  'My overall Reward Rate',
  'Reward Rate'
);

content = content.replace(
  '<th className="pl-4 pr-3 py-3.5 md:px-4 md:py-4">Game</th>',
  '<th className="pl-4 sm:pl-6 pr-3 py-3.5 md:pr-4 md:py-4">Game</th>'
);

content = content.replace(
  '<td className="pl-4 pr-3 py-3 md:px-4 md:py-3.5 whitespace-nowrap">',
  '<td className="pl-4 sm:pl-6 pr-3 py-3 md:pr-4 md:py-3.5 whitespace-nowrap">'
);

fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
console.log("Updated alignments and text");
