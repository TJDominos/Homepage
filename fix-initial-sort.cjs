const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

content = content.replace(
  'const [sortKey, setSortKey] = useState<SortKey>("jackpot");',
  'const [sortKey, setSortKey] = useState<SortKey>("actual");'
);

fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
console.log("Updated initial sort key");
