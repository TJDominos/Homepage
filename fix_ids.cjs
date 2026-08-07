const fs = require('fs');
let wt = fs.readFileSync('src/frontend/money/tabs/WithdrawTab.tsx', 'utf-8');

wt = wt.replace(/const faqContent = \(/, 'const faqContent = (isMobile: boolean) => (');

wt = wt.replace(/className="flex flex-col cursor-pointer faq-fee-element"/, 'id={isMobile ? "faq-fee-mobile" : "faq-fee-desktop"} className="flex flex-col cursor-pointer"');
wt = wt.replace(/className="flex flex-col cursor-pointer faq-locked-element"/, 'id={isMobile ? "faq-locked-mobile" : "faq-locked-desktop"} className="flex flex-col cursor-pointer"');

wt = wt.replace(/<div className="hidden md:block w-full max-w-2xl mx-auto mt-2">\s*\{faqContent\}\s*<\/div>/, '<div className="hidden md:block w-full max-w-2xl mx-auto mt-2">\n            {faqContent(false)}\n          </div>');

wt = wt.replace(/<div className="md:hidden">\{faqContent\}<\/div>/, '<div className="md:hidden">{faqContent(true)}</div>');


wt = wt.replace(/Array\.from\(document\.querySelectorAll\('\.faq-fee-element'\)\)\.find\(el => window\.getComputedStyle\(el\)\.display !== 'none'\)\?\.scrollIntoView/g, 
  "document.getElementById(window.innerWidth < 768 ? 'faq-fee-mobile' : 'faq-fee-desktop')?.scrollIntoView");

wt = wt.replace(/Array\.from\(document\.querySelectorAll\('\.faq-locked-element'\)\)\.find\(el => window\.getComputedStyle\(el\)\.display !== 'none'\)\?\.scrollIntoView/g, 
  "document.getElementById(window.innerWidth < 768 ? 'faq-locked-mobile' : 'faq-locked-desktop')?.scrollIntoView");


fs.writeFileSync('src/frontend/money/tabs/WithdrawTab.tsx', wt);
