const fs = require('fs');
let code = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf8');

// Replace topUp widget amount
code = code.replace(
  `<div className="flex flex-col gap-1 flex-1 w-2/3">
                        <label className="text-[13px] font-normal text-black text-left pl-2">Amount</label>
                        <input
                          type="text"
                          placeholder="Amount"
                          disabled={topUpStatus === "processing"}`,
  `<div className="flex flex-col gap-1 flex-1 w-2/3">
                        <label className="text-[13px] font-normal text-black text-left pl-2">{topUpCurrency} Amount</label>
                        <input
                          type="text"
                          placeholder="Amount"
                          disabled={topUpStatus === "processing"}`
);

// Replace swap widget amount
code = code.replace(
  `<div className="flex flex-col gap-1 flex-1 w-2/3">
                        <label className="text-[13px] font-normal text-black text-left pl-2">Amount</label>
                        <input
                          type="text"
                          placeholder="Min: 1,000 Bonus"`,
  `<div className="flex flex-col gap-1 flex-1 w-2/3">
                        <label className="text-[13px] font-normal text-black text-left pl-2">Bonus Amount</label>
                        <input
                          type="text"
                          placeholder="Min: 1,000 Bonus"`
);

// Replace gcoin widget amount
code = code.replace(
  `<div className="flex flex-col gap-1 flex-1 w-2/3">
                        <label className="text-[13px] font-normal text-black text-left pl-2">Amount</label>
                        <input
                          type="text"
                          placeholder={gcoinDirection === "toGcoin" ? "Amount in " + gcoinCurrency : "Amount in Gcoin"}`,
  `<div className="flex flex-col gap-1 flex-1 w-2/3">
                        <label className="text-[13px] font-normal text-black text-left pl-2">{gcoinDirection === "toGcoin" ? \`\${gcoinCurrency} Amount\` : "Gcoin Amount"}</label>
                        <input
                          type="text"
                          placeholder={gcoinDirection === "toGcoin" ? "Amount in " + gcoinCurrency : "Amount in Gcoin"}`
);

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', code);
console.log("Labels patched!");
