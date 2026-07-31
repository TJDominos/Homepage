const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

// Unhide Target RTP header
content = content.replace(
  '<SortTh\n                        k="theo"\n                        label="Target RTP"\n                        tip="The share of wagers a game is designed to return to players over the long run."\n                        className="hidden md:table-cell"\n                      />',
  '<SortTh\n                        k="theo"\n                        label="Target RTP"\n                        tip="The share of wagers a game is designed to return to players over the long run."\n                      />'
);

// Unhide Total Plays header
content = content.replace(
  '<SortTh\n                        k="plays"\n                        label="Total Plays"\n                        className="hidden md:table-cell"\n                      />',
  '<SortTh\n                        k="plays"\n                        label="Total Plays"\n                      />'
);

// Unhide Target RTP cell
content = content.replace(
  '<td className="hidden px-3 py-3.5 text-right tabular-nums text-(--text-subtle) md:table-cell">',
  '<td className="px-3 py-3.5 text-right tabular-nums text-(--text-subtle)">'
);

// Unhide Total Plays cell
content = content.replace(
  '<td className="hidden px-3 py-3.5 text-right tabular-nums text-black/60 md:table-cell">',
  '<td className="px-3 py-3.5 text-right tabular-nums text-black/60">'
);

// Remove the mobile Total Plays fallback
const mobileFallback = `<span className="text-[11px] text-black/40 md:hidden mt-0.5">
                                    {g.totalPlays === 0 ? "0 plays" : \`\${g.totalPlays.toLocaleString("en-US")} plays\`}
                                  </span>`;
content = content.replace(mobileFallback, '');

// Also fix the skeleton loaders
content = content.replace(
  `[
                              "", // Live Jackpot
                              "hidden md:table-cell", // Theoretical RTP
                              "", // Actual RTP
                              "hidden md:table-cell", // Total Plays
                              "hidden md:table-cell", // Paid Out
                            ]`,
  `[
                              "", // Live Jackpot
                              "", // Theoretical RTP
                              "", // Actual RTP
                              "", // Total Plays
                              "", // Paid Out
                            ]`
);

fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
console.log("Updated mobile view");
