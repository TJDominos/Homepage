const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

// 1. Padding for Game lists
// My stats table padding:
// <th className="px-1.5 py-2 sm:px-2 whitespace-nowrap">Game</th>
// <td className="px-1.5 py-2.5 sm:px-2">
// 
// Game payouts table padding:
// <th className="px-3 py-3.5 md:px-4 md:py-4">Game</th>
// <td className="px-3 py-3 md:px-4 md:py-3.5 whitespace-nowrap">

// Let's set game payouts table Game column padding to be pl-4
content = content.replace(
  '<th className="px-3 py-3.5 md:px-4 md:py-4">Game</th>',
  '<th className="pl-4 pr-3 py-3.5 md:px-4 md:py-4">Game</th>'
);
content = content.replace(
  '<td className="px-3 py-3 md:px-4 md:py-3.5 whitespace-nowrap">',
  '<td className="pl-4 pr-3 py-3 md:px-4 md:py-3.5 whitespace-nowrap">'
);

// 2. Text replacements
content = content.replace('Wagered', 'Spent');
content = content.replace('Won', 'Reward');
content = content.replace('Net', 'Gain');
content = content.replace('My overall RTP', 'My overall Reward Rate');

content = content.replace('>Wagered<', '>Spent<');
content = content.replace('>Won<', '>Reward<');
content = content.replace('>Net<', '>Gain<');
content = content.replace('>My RTP<', '>Reward%<');

content = content.replace('label="Live Jackpot"', 'label="Prize Pool"');
content = content.replace('label="Theoretical RTP"', 'label="Theoretical Reward Rate"');
content = content.replace('label="Actual RTP"', 'label="Actual Reward Rate"');
content = content.replace('>Actual RTP<', '>Actual Reward Rate<'); // for the total stats hero card

// 3. Update My stats table RTP column logic
const oldMyStatsRtp = `<td className="px-1.5 py-2.5 text-right tabular-nums sm:px-2">
                                <div className="flex flex-col items-end">
                                  <span className={\`text-[13px] font-bold md:text-[15px] \${r.rtp > 100 ? "text-emerald-600" : r.rtp < 100 ? "text-rose-500" : "text-black"}\`}>
                                    {r.rtp > 100 ? "+" : ""}{fmtPct(r.rtp - 100)}
                                  </span>
                                  <span className="text-[11px] text-black/40 hidden sm:block mt-0.5">{fmtPct(r.rtp)}</span>
                                </div>
                              </td>`;

const newMyStatsRtp = `<td className="px-1.5 py-2.5 text-right tabular-nums sm:px-2">
                                <div className="flex flex-col items-end">
                                  <span className="text-[13px] font-bold md:text-[15px] text-black">
                                    {fmtPct(r.rtp)}
                                  </span>
                                  <span className={\`text-[11px] font-medium mt-0.5 \${r.rtp > 100 ? "text-emerald-600" : r.rtp < 100 ? "text-rose-500" : "text-black/40"}\`}>
                                    {r.rtp > 100 ? "+" : ""}{fmtPct(r.rtp - 100)}
                                  </span>
                                </div>
                              </td>`;

content = content.replace(oldMyStatsRtp, newMyStatsRtp);

fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
console.log("Updated");
