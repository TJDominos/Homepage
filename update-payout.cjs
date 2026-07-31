const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

const heroIndex = content.indexOf('{/* ---------- Hero stats ---------- */}');
const smallprintIndex = content.indexOf('{/* ---------- Smallprint ---------- */}');

// We want to wrap from Hero stats to the end of the small print.
// Actually, let's wrap just after the title div.

const before = content.substring(0, heroIndex);
const after = content.substring(heroIndex, content.lastIndexOf('</div>\n  );\n}'));

const end = content.substring(content.lastIndexOf('</div>\n  );\n}'));

const newContent = before + '      {subTab === "Payout" ? (\n        <>\n    ' + 
  after.replace(/\n/g, '\n      ') + '\n        </>\n      ) : (\n        <div className="payout-card p-8 text-center text-sm text-(--text-subtle)">\n          No assets data available yet.\n        </div>\n      )}\n' + end;

fs.writeFileSync('src/frontend/PayoutPage.tsx', newContent);
