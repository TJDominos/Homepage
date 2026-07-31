const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

// Fix My stats table game column padding to align at 16px exactly
// Container is px-2 (8px), so we need pl-2 (8px) on th and td. 8 + 8 = 16px.

content = content.replace(
  '<th className="px-1.5 py-2 sm:px-2 whitespace-nowrap">Game</th>',
  '<th className="pl-2 pr-1.5 py-2 sm:px-2 whitespace-nowrap">Game</th>'
);

content = content.replace(
  '<td className="px-1.5 py-2.5 sm:px-2">',
  '<td className="pl-2 pr-1.5 py-2.5 sm:px-2">'
);

fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
console.log("Updated My Stats padding");
