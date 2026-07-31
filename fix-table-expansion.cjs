const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

// 1. Remove the empty th at the end of thead
content = content.replace(
  /<th\s*className="hidden w-10 px-2 py-3\.5 md:table-cell"\s*aria-label="Details"\s*\/>/,
  ''
);

// 2. Remove tr attributes for expansion
content = content.replace(
  /<tr\s*onClick=\{\(\) =>\s*setExpandedGame\(expanded \? null : g\.gameId\)\s*\}\s*className=\{`payout-row cursor-pointer transition-colors \$\{expanded \? "payout-row--open" : ""\}`\}\s*>/,
  '<tr className="payout-row transition-colors hover:bg-black/[0.02]">'
);

// 3. Remove the td with chevron
const tdChevron = /<td className="hidden px-2 py-3\.5 text-center md:table-cell">[\s\S]*?<\/td>/;
content = content.replace(tdChevron, '');

// 4. Remove the expanded rows (both md:hidden and hidden md:table-row)
// We'll just replace everything from "</tr>" after the chevron to "</React.Fragment>" with just "</tr></React.Fragment>"
const expandedRowsRegex = /<\/tr>[\s\S]*?{\/\* Below md some columns are hidden[\s\S]*?<\/React\.Fragment>/;
content = content.replace(expandedRowsRegex, '</tr>\n                            </React.Fragment>');

// 5. Update smallprint text
const oldSmallprint = `All figures are USD equivalents; expand a game row for the
              per-currency breakdown (WLT, Gcoin, Bonus). Actual RTP is realized
              rewards ÷ incomes to date and naturally swings while volume is low —
              theoretical RTP is the long-run design expectation.`;
const newSmallprint = `All figures are in Gcoins. Actual RTP is realized rewards ÷ incomes to date and naturally swings while volume is low — theoretical RTP is the long-run design expectation.`;
content = content.replace(oldSmallprint, newSmallprint);

fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
console.log("Updated table expansion and smallprint");
