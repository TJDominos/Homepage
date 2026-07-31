const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

const oldGameRtp = `<div className="flex flex-col items-end">
                                    <span className={\`text-[13px] font-bold tabular-nums md:text-[15px] \${g.actualRtp > g.theoreticalRtp ? "text-emerald-600" : g.actualRtp < g.theoreticalRtp ? "text-rose-500" : "text-black"}\`}>
                                      {g.actualRtp > g.theoreticalRtp ? "+" : ""}{fmtPct(g.actualRtp - g.theoreticalRtp)}
                                    </span>
                                    <span className="mt-0.5 text-[11px] tabular-nums text-black/40">
                                      {fmtPct(g.actualRtp)}
                                    </span>
                                  </div>`;

const newGameRtp = `<div className="flex flex-col items-end">
                                    <span className="text-[13px] font-bold tabular-nums md:text-[15px] text-black">
                                      {fmtPct(g.actualRtp)}
                                    </span>
                                    <span className={\`mt-0.5 text-[11px] font-medium tabular-nums \${g.actualRtp > g.theoreticalRtp ? "text-emerald-600" : g.actualRtp < g.theoreticalRtp ? "text-rose-500" : "text-black/40"}\`}>
                                      {g.actualRtp > g.theoreticalRtp ? "+" : ""}{fmtPct(g.actualRtp - g.theoreticalRtp)}
                                    </span>
                                  </div>`;

content = content.replace(oldGameRtp, newGameRtp);

fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
console.log("Updated Game RTP");
