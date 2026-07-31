const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

const oldTabSwitcher = `onClick={() => setGameCategory("Rand Game")}`;
const newTabSwitcher = `onClick={() => { setGameCategory("Rand Game"); setSortKey("actual"); }}`;

const oldTabSwitcher2 = `onClick={() => setGameCategory("Randball")}`;
const newTabSwitcher2 = `onClick={() => { setGameCategory("Randball"); setSortKey("jackpot"); }}`;

content = content.replace(oldTabSwitcher, newTabSwitcher);
content = content.replace(oldTabSwitcher2, newTabSwitcher2);

fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
console.log("Updated sort key reset on tab switch");
