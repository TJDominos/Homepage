const fs = require('fs');
let content = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf-8');

// 1. Import ChevronDown, ChevronUp if not imported
if (!content.includes('ChevronUp')) {
  content = content.replace(/ChevronDown,/, 'ChevronDown, ChevronUp,');
}

// 2. Add the state
if (!content.includes('expandedWidget')) {
  content = content.replace(/const \[claimCode, setClaimCode\] = useState<string>\(""\);/, 
    'const [claimCode, setClaimCode] = useState<string>("");\n  const [expandedWidget, setExpandedWidget] = useState<string | null>(null);');
}

// 3. Helper to replace the widget root
function replaceWidget(content, startComment, id, iconComponent, iconColor, title) {
  const rootDivRegex = new RegExp(`\\{\\/\\* ${startComment} \\*\\/\\}\\s*<div className="bg-\\[#f0f2f5\\] rounded-\\[24px\\] px-6 pb-6 pt-3 border border-black\\/5 flex flex-col items-center text-center shadow-sm relative w-full h-\\[320px\\]">\\s*<AnimatePresence mode="wait">`);

  const replacement = `{/* ${startComment} */}
        <div 
          className={\`bg-[#f0f2f5] rounded-[24px] border border-black/5 flex flex-col items-center text-center shadow-sm relative w-full transition-all duration-300 overflow-hidden \${(!isDesktop && expandedWidget !== '${id}') ? "p-4 h-[72px] cursor-pointer hover:bg-black/5" : "px-6 pb-6 pt-3 h-[320px]"}\`}
          onClick={() => { if (!isDesktop && expandedWidget !== '${id}') setExpandedWidget('${id}'); }}
        >
          {(!isDesktop && expandedWidget !== '${id}') ? (
            <div className="flex items-center justify-between w-full h-full">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
                  <${iconComponent} className="w-6 h-6 ${iconColor}" />
                </div>
                <h3 className="text-[16px] font-semibold text-black">${title}</h3>
              </div>
              <ChevronDown className="w-5 h-5 text-black/40" />
            </div>
          ) : (
            <>
              {!isDesktop && (
                <button 
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-black/5 hover:bg-black/10 rounded-full cursor-pointer z-10 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedWidget(null);
                  }}
                >
                  <ChevronUp className="w-5 h-5 text-black/60" />
                </button>
              )}
              <AnimatePresence mode="wait">`;

  return content.replace(rootDivRegex, replacement);
}

// 4. Also we need to close the <AnimatePresence> and the root </div> properly for each widget. 
// Wait, the root div is already closed by `</div>` further down. We are just replacing the start, and adding `</>` after `<AnimatePresence>`!
// Let's modify the replace to find the end of `<AnimatePresence>` and close the fragment.

function replaceWidgetEnd(content, startComment) {
  // It's a bit tricky to find the end of the AnimatePresence for a specific widget.
  // Instead, we can just find:
  // </AnimatePresence>
  // </div>
  // But wait, there are 4 of these. We can just replace all of them.
  // We'll replace `</AnimatePresence>\n        </div>` with `</AnimatePresence>\n            </>\n          )}\n        </div>`
  
  // Actually, wait, let's just do a global replace for the closing tags.
  // Because the structure is very uniform.
  return content;
}

// Let's do the start replacements:
content = replaceWidget(content, "Top up bonus Widget", "topUp", "ArrowUpCircle", "text-green-500", "Top Up Bonus");
content = replaceWidget(content, "Swap Bonus Widget", "swap", "ArrowRight", "text-purple-500", "Redeem Bonus");
content = replaceWidget(content, "Claim Bonus Code Widget", "claim", "Gift", "text-blue-500", "Claim Bonus Code");
content = replaceWidget(content, "Convert Gcoin Widget", "gcoin", "ArrowRightLeft", "text-[#FFD700]", "Convert Gcoin");

// Now do the end replacements globally. We need exactly 4 replacements.
// The pattern is:
//           </AnimatePresence>
//         </div>
const endReplacement = `          </AnimatePresence>
            </>
          )}
        </div>`;

let matchCount = 0;
content = content.replace(/<\/AnimatePresence>\s*<\/div>/g, (match) => {
  matchCount++;
  return endReplacement;
});

console.log("End replaced:", matchCount);

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', content);
