const fs = require('fs');
let content = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf-8');

// Change "Swap Token" to "Redeem Bonus"
content = content.replace(/<h3 className="text-\[16px\] font-semibold text-black mb-1">\s*Swap Token\s*<\/h3>/, '<h3 className="text-[16px] font-semibold text-black mb-1">\n                  Redeem Bonus\n                </h3>');

// Remove USDC and USDT from the options
content = content.replace(/\{\[\.\.\.SUPPORTED_ASSETS\]\.filter\(a => a !== 'Gcoin'\)\.sort\(\(a, b\) => a\.localeCompare\(b\)\)\.map\(asset => \(/g, 
"{[...SUPPORTED_ASSETS].filter(a => a !== 'Gcoin' && a !== 'USDC' && a !== 'USDT').sort((a, b) => a.localeCompare(b)).map(asset => (");

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', content);
console.log("Patched swap to redeem.");
