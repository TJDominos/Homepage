const fs = require('fs');

let wt = fs.readFileSync('src/frontend/money/tabs/WithdrawTab.tsx', 'utf-8');

const regex = /const rightColumnContent = \(\s*<div className="flex flex-col mt-1 mb-1 w-full max-w-2xl">.*?<div className="md:hidden">\{faqContent\}<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*\);/s;

// We just replace everything inside the balance display and leave everything else alone. Oh wait, my regex is too large.
// Let's replace the whole WithdrawTab.tsx with a known good state, except we can't because it's not in git.
// BUT I can fetch the file from the other repo or use sed to replace just the balance block.
