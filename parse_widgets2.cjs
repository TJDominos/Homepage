const fs = require('fs');
const content = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf-8');

const claimIdx = content.indexOf('{/* Claim Bonus Code Widget */}');
const convertIdx = content.indexOf('{/* Convert Gcoin Widget */}');
const topUpIdx = content.indexOf('{/* Top up bonus Widget */}');
const swapIdx = content.indexOf('{/* Swap Bonus Widget */}');
const endIdx = content.indexOf('</div>\n    </div>\n  );\n};\n'); // approximate end of grid

const widgets = [
  { name: 'claim', start: claimIdx },
  { name: 'convert', start: convertIdx },
  { name: 'topUp', start: topUpIdx },
  { name: 'swap', start: swapIdx },
  { name: 'end', start: content.indexOf('</button>\n              </motion.div>\n            )}\n          </AnimatePresence>\n        </div>\n      </div>\n    </div>\n  );\n};\n') }
];
widgets.sort((a,b) => a.start - b.start);
console.log(widgets);
