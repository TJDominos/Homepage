const fs = require('fs');
let pt = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

pt = pt.replace(/const fmtGcoin = \(n: number, dec = 0\) => \([\s\S]*?\n\);/, `const fmtGcoin = (n: number, dec = 0) => {
  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: dec,
  });
  return (
    <span className="inline-flex items-center gap-1">
      <AssetIcon type="Gcoin" className="w-[14px] h-[14px]" />
      {formatter.format(n * 10)}
    </span>
  );
};`);

pt = pt.replace(/const fmtBonus = \(n: number, dec = 0\) => \([\s\S]*?\n\);/, `const fmtBonus = (n: number, dec = 0) => {
  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: dec,
  });
  return (
    <span className="inline-flex items-center gap-1">
      <AssetIcon type="Bonus" className="w-[14px] h-[14px]" />
      {formatter.format(n * 10000)}
    </span>
  );
};`);

fs.writeFileSync('src/frontend/PayoutPage.tsx', pt);
