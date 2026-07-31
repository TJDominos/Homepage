const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

// 1. jackpotUsd for Randball
content = content.replace(
  /<span className="inline-flex items-center justify-end gap-1 whitespace-nowrap text-\[13px\] font-semibold tabular-nums text-\(--text-primary\) md:text-sm">/g,
  '<span className="inline-flex items-center justify-end gap-1 whitespace-nowrap text-[12px] font-semibold tabular-nums text-(--text-primary) md:text-sm">'
);

// 2. jackpotUsd for Rand Game
content = content.replace(
  /<span className="inline-flex items-center justify-end gap-1 whitespace-nowrap text-\[13px\] font-semibold tabular-nums text-black md:text-\[15px\]">/g,
  '<span className="inline-flex items-center justify-end gap-1 whitespace-nowrap text-[12px] font-semibold tabular-nums text-black md:text-[15px]">'
);

// 3. actualRtp
content = content.replace(
  /<span className="text-\[13px\] font-bold tabular-nums md:text-\[15px\] text-black">/g,
  '<span className="text-[12px] font-bold tabular-nums md:text-[15px] text-black">'
);

// 4. totalPlays in Total Rewards column
content = content.replace(
  /<td className="pl-2 pr-4 sm:pr-6 py-3 md:pl-3 md:py-3\.5 text-right font-medium tabular-nums text-black">/g,
  '<td className="pl-2 pr-4 sm:pr-6 py-3 md:pl-3 md:py-3.5 text-right font-medium tabular-nums text-[12px] md:text-[14px] text-black">'
);

fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
console.log("Updated font sizes");
