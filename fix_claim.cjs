const fs = require('fs');
let content = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf-8');

const oldClaimInput = `<input
                      type="text"
                      placeholder="Enter Code"
                      value={claimCode}`;

const newClaimInput = `<label className="text-[13px] font-normal text-transparent text-left pl-2 select-none block">Code</label>
                    <input
                      type="text"
                      placeholder="Enter Code"
                      value={claimCode}`;

content = content.replace(oldClaimInput, newClaimInput);
fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', content);
