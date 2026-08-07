const fs = require('fs');
let wt = fs.readFileSync('src/frontend/money/tabs/WithdrawTab.tsx', 'utf-8');

wt = wt.replace(/document\.querySelectorAll\('\.faq-fee-element'\)\.forEach\(el => \{ if \(el\.offsetParent !== null\) el\.scrollIntoView\(\{ behavior: 'smooth', block: 'center' \}\); \}\)/g, "Array.from(document.querySelectorAll('.faq-fee-element')).find(el => window.getComputedStyle(el).display !== 'none')?.scrollIntoView({ behavior: 'smooth', block: 'center' })");

wt = wt.replace(/document\.querySelectorAll\('\.faq-locked-element'\)\.forEach\(el => \{ if \(el\.offsetParent !== null\) el\.scrollIntoView\(\{ behavior: 'smooth', block: 'center' \}\); \}\)/g, "Array.from(document.querySelectorAll('.faq-locked-element')).find(el => window.getComputedStyle(el).display !== 'none')?.scrollIntoView({ behavior: 'smooth', block: 'center' })");

fs.writeFileSync('src/frontend/money/tabs/WithdrawTab.tsx', wt);
