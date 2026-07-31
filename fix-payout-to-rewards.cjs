const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

content = content.replace('useState("Payout")', 'useState("Rewards")');
content = content.replace('>Payouts</h1>', '>Rewards</h1>');
content = content.replace('{["Payout", "Assets"].map((tab) => (', '{["Rewards", "Assets"].map((tab) => (');
content = content.replace('{subTab === "Payout" && (', '{subTab === "Rewards" && (');
content = content.replace('Site-wide payout &amp; return-to-player statistics', 'Site-wide rewards &amp; return-to-player statistics');
content = content.replace('{subTab === "Payout" ? (', '{subTab === "Rewards" ? (');
content = content.replace('Total Payout', 'Total Rewards');
content = content.replace('My payout stats', 'My rewards stats');
content = content.replace('Realized payouts ÷ total wagers to date.', 'Realized rewards ÷ total wagers to date.');
content = content.replace('label="Paid Out"', 'label="Total Rewards"');
content = content.replace('payouts ÷ wagers to date and naturally swings', 'rewards ÷ wagers to date and naturally swings');

fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
console.log('Fixed Payout -> Rewards');
