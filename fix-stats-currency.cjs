const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

// 1. Remove Spent & Gain from top panel
const topPanelRegex = /<div>\s*<div className="text-xs font-medium text-\(--text-subtle\)">\s*Spent[\s\S]*?<\/div>[\s\S]*?<div>\s*<div className="text-xs font-medium text-\(--text-subtle\)">\s*Gain[\s\S]*?<\/div>/m;

// wait, it's:
/*
                      <div>
                        <div className="text-xs font-medium text-(--text-subtle)">
                          Spent
                        </div>
                        <div className="text-base font-semibold tabular-nums text-(--text-primary)">
                          {fmtUsd(myStats.wageredUsd, 2)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-(--text-subtle)">
                          Reward
                        </div>
                        <div className="text-base font-semibold tabular-nums text-(--text-primary)">
                          {fmtUsd(myStats.wonUsd, 2)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-(--text-subtle)">
                          Gain
                        </div>
                        <div className="text-base font-semibold tabular-nums text-(--text-primary)">
                          {myStats.wonUsd - myStats.wageredUsd >= 0 ? "+" : "−"}
                          {fmtUsd(Math.abs(myStats.wonUsd - myStats.wageredUsd), 2)}
                        </div>
                      </div>
*/

// Let's just do a specific string replace for these blocks
const targetToReplace = `                      <div>
                        <div className="text-xs font-medium text-(--text-subtle)">
                          Spent
                        </div>
                        <div className="text-base font-semibold tabular-nums text-(--text-primary)">
                          {fmtUsd(myStats.wageredUsd, 2)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-(--text-subtle)">
                          Reward
                        </div>
                        <div className="text-base font-semibold tabular-nums text-(--text-primary)">
                          {fmtUsd(myStats.wonUsd, 2)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-(--text-subtle)">
                          Gain
                        </div>
                        <div className="text-base font-semibold tabular-nums text-(--text-primary)">
                          {myStats.wonUsd - myStats.wageredUsd >= 0 ? "+" : "−"}
                          {fmtUsd(Math.abs(myStats.wonUsd - myStats.wageredUsd), 2)}
                        </div>
                      </div>`;

const newTarget = `                      <div>
                        <div className="text-xs font-medium text-(--text-subtle)">
                          Reward
                        </div>
                        <div className="text-base font-semibold tabular-nums text-(--text-primary)">
                          {fmtGcoin(myStats.wonUsd, 2)}
                        </div>
                      </div>`;
content = content.replace(targetToReplace, newTarget);

// 2. Remove columns from table header
content = content.replace(
  '<th className="px-2 py-2 text-right whitespace-nowrap">Spent</th>',
  ''
);
content = content.replace(
  '<th className="px-1.5 py-2 text-right sm:px-2 whitespace-nowrap">Gain</th>',
  ''
);

// 3. Remove cells from table body
const spentCell = `<td className="px-2 py-2.5 text-right tabular-nums text-black/80">
                                {fmtUsd(r.wageredUsd, 2)}
                              </td>`;
content = content.replace(spentCell, '');

const gainCell = `<td className="px-1.5 py-2.5 text-right tabular-nums sm:px-2">
                                <span className={r.netUsd > 0 ? "text-emerald-600 font-semibold" : r.netUsd < 0 ? "text-rose-500 font-medium" : "text-black"}>
                                  {r.netUsd >= 0 ? "+" : "−"}
                                  {fmtUsd(Math.abs(r.netUsd), 2)}
                                </span>
                              </td>`;
content = content.replace(gainCell, '');

// 4. Change fmtUsd to fmtGcoin definition and usage
const oldFmtUsdDef = `const fmtUsd = (n: number, dec = 0) =>
  "$" +
  n.toLocaleString("en-US", {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec,
  });`;

const newFmtGcoinDef = `const fmtGcoin = (n: number, dec = 0) =>
  (n * 10).toLocaleString("en-US", {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec,
  }) + " Gcoin";`;

content = content.replace(oldFmtUsdDef, newFmtGcoinDef);

// Replace all remaining fmtUsd with fmtGcoin
content = content.replace(/fmtUsd/g, 'fmtGcoin');

fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
console.log("Updated My Stats and currency");
