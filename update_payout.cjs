const fs = require('fs');

let pt = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

// Add fmtBonus
if (!pt.includes('fmtBonus')) {
  pt = pt.replace('const fmtPct', `const fmtBonus = (n: number, dec = 0) => (
  <span className="inline-flex items-center gap-1">
    <AssetIcon type="Bonus" className="w-[14px] h-[14px]" />
    {(n * 10000).toLocaleString("en-US", {
      minimumFractionDigits: dec,
      maximumFractionDigits: dec,
    })}
  </span>
);

const fmtPct`);
}

// Update Randball Live Jackpot to show both
pt = pt.replace(
  /\{fmtGcoin\(g\.jackpotUsd, 2\)\}/g,
  `{fmtGcoin(g.jackpotUsd, 2)}
                                      <span className="text-black/30 mx-1">/</span>
                                      {fmtBonus(g.jackpotUsd, 0)}`
);

// Update Total Rewards (Paid Out) to show both
// Wait, the Paid Out is rendered as:
/*
                                  <span>
                                    {g.totalPaidOutUsd === 0
                                      ? "–"
                                      : fmtGcoin(
                                          g.totalPaidOutUsd,
                                          g.totalPaidOutUsd < 10 ? 2 : 0,
                                        )}
                                  </span>
*/
pt = pt.replace(
  /\{g\.totalPaidOutUsd === 0[\s\S]*?fmtGcoin\([\s\S]*?g\.totalPaidOutUsd < 10 \? 2 : 0,[\s\S]*?\)\}[\s\S]*?\}/,
  `{g.totalPaidOutUsd === 0
                                      ? "–"
                                      : (
                                        <div className="flex flex-col items-end gap-0.5">
                                          {fmtGcoin(g.totalPaidOutUsd, g.totalPaidOutUsd < 10 ? 2 : 0)}
                                          {fmtBonus(g.totalPaidOutUsd, 0)}
                                        </div>
                                      )}`
);

fs.writeFileSync('src/frontend/PayoutPage.tsx', pt);

