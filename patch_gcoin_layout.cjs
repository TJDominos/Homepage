const fs = require('fs');
let code = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf8');

const targetLayout = `<div className="flex gap-2 items-end">
                      <div className="flex flex-col gap-1 flex-1 w-2/3">
                        <label className="text-[13px] font-normal text-black text-left pl-2">Amount</label>`;

const replacementLayout = `<div className={\`flex gap-2 items-end \${gcoinDirection === "toGcoin" ? "flex-row-reverse" : "flex-row"}\`}>
                      <div className="flex flex-col gap-1 flex-1 w-2/3">
                        <label className="text-[13px] font-normal text-black text-left pl-2">Amount</label>`;

code = code.replace(targetLayout, replacementLayout);

const targetLabel = `<label className="text-[13px] font-normal text-black text-left pl-2">{gcoinDirection === "toGcoin" ? "From" : "To"}</label>`;
const replacementLabel = `<label className="text-[13px] font-normal text-black text-left pl-2">Assets</label>`;

code = code.replace(targetLabel, replacementLabel);

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', code);
console.log('Gcoin Layout updated');
