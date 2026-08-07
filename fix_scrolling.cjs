const fs = require('fs');
let wt = fs.readFileSync('src/frontend/money/tabs/WithdrawTab.tsx', 'utf-8');

wt = wt.replace(/document\.getElementById\('faq-fee'\)\?\.scrollIntoView\(\{ behavior: 'smooth', block: 'center' \}\)/g, "document.querySelectorAll('.faq-fee-element').forEach(el => { if (el.offsetParent !== null) el.scrollIntoView({ behavior: 'smooth', block: 'center' }); })");

wt = wt.replace(/document\.getElementById\('faq-locked'\)\?\.scrollIntoView\(\{ behavior: 'smooth', block: 'center' \}\)/g, "document.querySelectorAll('.faq-locked-element').forEach(el => { if (el.offsetParent !== null) el.scrollIntoView({ behavior: 'smooth', block: 'center' }); })");

wt = wt.replace(/id="faq-fee"/g, 'className="flex flex-col cursor-pointer faq-fee-element"');
wt = wt.replace(/className="flex flex-col cursor-pointer"\n\s*onClick=\{\(\) => setFaqFeeExpanded\(\!faqFeeExpanded\)\}/g, 'onClick={() => setFaqFeeExpanded(!faqFeeExpanded)}');

wt = wt.replace(/id="faq-locked"/g, 'className="flex flex-col cursor-pointer faq-locked-element"');
wt = wt.replace(/className="flex flex-col cursor-pointer"\n\s*onClick=\{\(\) => setFaqLockedExpanded\(\!faqLockedExpanded\)\}/g, 'onClick={() => setFaqLockedExpanded(!faqLockedExpanded)}');

fs.writeFileSync('src/frontend/money/tabs/WithdrawTab.tsx', wt);
