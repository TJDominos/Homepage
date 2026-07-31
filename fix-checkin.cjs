const fs = require('fs');

const file = 'src/frontend/money/tabs/RewardsTab.tsx';
let content = fs.readFileSync(file, 'utf-8');

const target = `<span className="text-[11px] font-bold text-[#FFD700] bg-[#FFD700]/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                        +3 <Star className="w-3 h-3 text-[#FFD700] fill-[#FFD700]" />
                      </span>`;

const replace = `<span className="text-[12px] font-bold text-black flex items-center gap-1.5 bg-[#FFD700]/10 px-2.5 py-0.5 rounded-full border border-[#FFD700]/20">
                        +3
                        <div className="w-[14px] h-[14px] rounded-full bg-[#FFD700] flex items-center justify-center shrink-0">
                          <Star className="w-[9px] h-[9px] text-white fill-white" />
                        </div>
                      </span>`;

if (content.includes(target)) {
  content = content.replace(target, replace);
  fs.writeFileSync(file, content, 'utf-8');
  console.log("Updated");
} else {
  console.log("Target not found");
}
