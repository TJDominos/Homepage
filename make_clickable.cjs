const fs = require('fs');
let content = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf-8');

function makeClickable(widgetId, iconComment, title, subtitle, statusState, iconCode) {
  // We want to wrap the icon, title, and subtitle in a clickable div when expanded.
  
  // Here is the pattern we are looking for:
  //                 <motion.div
  //                   className="mb-4 mt-2 w-16 h-16 ...
  //                   ...
  //                 >
  //                   ... icon code ...
  //                 </motion.div>
  //                 <h3 className="text-[16px] font-semibold text-black mb-1">
  //                   ... title ...
  //                 </h3>
  //                 <p className="text-[12px] font-normal text-black/65 mb-4">
  //                   ... subtitle ...
  //                 </p>
  
  // Let's replace the whole section starting from `<motion.div` down to `</p>`
  
  const regex = new RegExp(`(<motion\\.div\\s+className="mb-4 mt-2 w-16 h-16 [\\s\\S]*?<\\/motion\\.div>\\s*<h3 className="text-\\[16px\\] font-semibold text-black mb-1?">\\s*${title}\\s*<\\/h3>\\s*<p className="text-\\[12px\\] font-normal text-black\\/65 mb-4?">\\s*${subtitle}\\s*<\\/p>)`);
  
  content = content.replace(regex, (match) => {
    return `
                <div 
                  className={\`flex flex-col items-center w-full \${!isDesktop ? "cursor-pointer" : ""}\`}
                  onClick={() => { if (!isDesktop) setExpandedWidget(null); }}
                >
${match}
                </div>`;
  });
}

// 1. Top Up Bonus
makeClickable("topUp", "ArrowUpCircle", "Top Up Bonus", "Exchange Tokens to Bonus.");
// 2. Redeem Bonus
makeClickable("swap", "ArrowRight", "Redeem Bonus", "Redeem Bonus to Tokens.");
// 3. Claim Bonus Code
makeClickable("claim", "Gift", "Claim Bonus Code", "Enter a code to claim your bonus.");
// 4. Convert Gcoin
makeClickable("gcoin", "ArrowRightLeft", "Convert Gcoin", "Exchange Gcoins and Tokens.");

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', content);
