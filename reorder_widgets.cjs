const fs = require('fs');
let content = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf-8');

const claimIdx = content.indexOf('{/* Claim Bonus Code Widget */}');
const convertIdx = content.indexOf('{/* Convert Gcoin Widget */}');
const topUpIdx = content.indexOf('{/* Top up bonus Widget */}');
const swapIdx = content.indexOf('{/* Swap Bonus Widget */}');
const endIdx = content.indexOf('      </div>\n    </div>\n  );\n}');

const claimCode = content.substring(claimIdx, convertIdx);
const convertCode = content.substring(convertIdx, topUpIdx);
const topUpCode = content.substring(topUpIdx, swapIdx);
const swapCode = content.substring(swapIdx, endIdx);

// The user wants:
// 1. Top Up Bonus
// 2. Swap Token
// 3. Claim Bonus Code
// 4. Convert Gcoin

// Also, the grid needs to be changed from 
// "grid grid-cols-2 lg:grid-cols-4 gap-6 items-stretch" to
// "grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch" ? or just "grid grid-cols-3 gap-6 items-stretch" (Wait, what was the grid originally? "grid grid-cols-3 gap-6 items-stretch") Let's use grid-cols-3. Wait, let's keep responsive: "grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch". Currently it's `grid grid-cols-2 lg:grid-cols-4 gap-6 items-stretch`.

const newWidgets = topUpCode + swapCode + claimCode + convertCode;

let newContent = content.substring(0, claimIdx) + newWidgets + content.substring(endIdx);

// change grid cols
newContent = newContent.replace('grid-cols-2 lg:grid-cols-4', 'grid-cols-1 md:grid-cols-3');

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', newContent);
console.log("Done");
