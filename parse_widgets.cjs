const fs = require('fs');
const content = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf-8');

const claimIdx = content.indexOf('{/* Claim Bonus Code Widget */}');
const convertIdx = content.indexOf('{/* Convert Gcoin Widget */}');
const topUpIdx = content.indexOf('{/* Top up bonus Widget */}');
const swapIdx = content.indexOf('{/* Swap Bonus Widget */}');

console.log('Claim:', claimIdx);
console.log('Convert:', convertIdx);
console.log('Top Up:', topUpIdx);
console.log('Swap:', swapIdx);
