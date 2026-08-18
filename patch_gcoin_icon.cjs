const fs = require('fs');
let code = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf8');

const targetIcon = `<ArrowRightLeft className="w-[40px] h-[40px] text-[#FFD700]" strokeWidth={1.5} />`;
const replacementIcon = `<div className="relative flex items-center justify-center">
                    <AssetIcon type="Gcoin" className="w-[46px] h-[46px] opacity-20 absolute" />
                    <AssetIcon type="Gcoin" className="w-[38px] h-[38px] opacity-40 absolute" />
                    <ArrowRightLeft className="w-[28px] h-[28px] text-[#D4AF37] relative z-10 drop-shadow-sm" strokeWidth={2.5} />
                  </div>`;

code = code.replace(targetIcon, replacementIcon);

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', code);
console.log('Gcoin Icon updated');
