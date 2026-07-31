const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

const pulseOld = `{[
                              gameCategory === "Randball" ? "" : null, // Live Jackpot
                              gameCategory === "Rand Game" ? "" : null, // Prize Pool
                              gameCategory === "Rand Game" ? "" : null, // Theoretical RTP
                              gameCategory === "Rand Game" ? "" : null, // Actual RTP
                              "", // Total Plays
                              "", // Paid Out
                            ]`;

const pulseNew = `{[
                              gameCategory === "Randball" ? "" : null, // Live Jackpot
                              gameCategory === "Rand Game" ? "" : null, // Prize Pool
                              gameCategory === "Rand Game" ? "hidden md:table-cell" : null, // Theoretical RTP
                              gameCategory === "Rand Game" ? "" : null, // Actual RTP
                              "hidden sm:table-cell", // Total Plays
                              "", // Paid Out
                            ]`;

content = content.replace(pulseOld, pulseNew);

fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
console.log("Fixed pulse loading state");
