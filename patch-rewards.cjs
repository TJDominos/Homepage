const fs = require('fs');
let content = fs.readFileSync('src/frontend/money/tabs/RewardsTab.tsx', 'utf-8');
content = content.replace(
  /<h4 className="font-semibold text-\[15px\] text-black leading-tight">\s*Daily Check-in\s*<\/h4>/,
  `<h4 className="font-semibold text-[15px] text-black leading-tight flex items-center gap-2">
                      Daily Check-in
                      <span className="text-[11px] font-bold text-[#FFD700] bg-[#FFD700]/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                        +3 <Star className="w-3 h-3 text-[#FFD700] fill-[#FFD700]" />
                      </span>
                    </h4>`
);
fs.writeFileSync('src/frontend/money/tabs/RewardsTab.tsx', content);
