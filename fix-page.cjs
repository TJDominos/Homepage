const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

// 1. Change fmtGcoin
const oldFmtGcoin = `const fmtGcoin = (n: number, dec = 0) =>
  (n * 10).toLocaleString("en-US", {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec,
  }) + " Gcoin";`;

const newFmtGcoin = `const fmtGcoin = (n: number, dec = 0) => (
  <span className="inline-flex items-center gap-1">
    {(n * 10).toLocaleString("en-US", {
      minimumFractionDigits: dec,
      maximumFractionDigits: dec,
    })}
    <AssetIcon type="Gcoin" className="w-[14px] h-[14px]" />
  </span>
);`;

content = content.replace(oldFmtGcoin, newFmtGcoin);

// 2. Remove Coins icon from table
const oldJackpot = `<span className="inline-flex items-center justify-end gap-1 whitespace-nowrap text-[13px] font-semibold tabular-nums text-(--text-primary) md:text-sm">
                                    <Coins
                                      size={13}
                                      className="hidden text-(--color-coin) md:inline"
                                      aria-hidden
                                    />
                                    {fmtGcoin(g.jackpotUsd, 2)}
                                  </span>`;

const newJackpot = `<span className="inline-flex items-center justify-end gap-1 whitespace-nowrap text-[13px] font-semibold tabular-nums text-(--text-primary) md:text-sm">
                                    {fmtGcoin(g.jackpotUsd, 2)}
                                  </span>`;

content = content.replace(oldJackpot, newJackpot);

// 3. Rename Target RTP and Actual RTP
content = content.replace('label="Theoretical Reward Rate"', 'label="Target RTP"');
content = content.replace('label="Actual Reward Rate"', 'label="Actual RTP"');

fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
console.log("Updated formats and labels");
