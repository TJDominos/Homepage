const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

const oldFmt = `const fmtGcoin = (n: number, dec = 0) => (
  <span className="inline-flex items-center gap-1">
    {(n * 10).toLocaleString("en-US", {
      minimumFractionDigits: dec,
      maximumFractionDigits: dec,
    })}
    <AssetIcon type="Gcoin" className="w-[14px] h-[14px]" />
  </span>
);`;

const newFmt = `const fmtGcoin = (n: number, dec = 0) => (
  <span className="inline-flex items-center gap-1">
    <AssetIcon type="Gcoin" className="w-[14px] h-[14px]" />
    {(n * 10).toLocaleString("en-US", {
      minimumFractionDigits: dec,
      maximumFractionDigits: dec,
    })}
  </span>
);`;

content = content.replace(oldFmt, newFmt);

fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
console.log("Updated icon position");
