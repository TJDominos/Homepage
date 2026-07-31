const fs = require('fs');
let content = fs.readFileSync('src/frontend/MoneyPage.tsx', 'utf-8');

const targetStr = `            {/* Bonus */}
            <div
              className="flex flex-col items-center shrink-0 cursor-pointer"
              onClick={() => setActiveMenu("bonus")}
            >
              <div className="flex items-center gap-1 mb-2 sm:mb-3">
                <span className="text-[18px] font-bold text-[#111]  leading-none tracking-tight">
                  {userAccount ? "12" : "0.00"}
                </span>
                <ChevronRight
                  className="w-[14px] h-[14px] text-slate-800 shrink-0"
                  strokeWidth={2.5}
                />
              </div>
              <div className="flex items-center text-slate-600 font-normal text-[14px]">
                <span>Bonus</span>
              </div>
            </div>`;
            
const replacement = targetStr.replace('<span>Bonus</span>', '<span>Bonus & Gcoin Swap</span>');
if (content.includes(targetStr)) {
  content = content.replace(targetStr, replacement);
  fs.writeFileSync('src/frontend/MoneyPage.tsx', content);
  console.log("Replaced in MoneyPage.tsx");
} else {
  console.log("Target string not found in MoneyPage.tsx");
}
