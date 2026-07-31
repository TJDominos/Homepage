const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

const rankingMock = `
const ASSETS_RANKING = [
  { symbol: "JUP", users: 124, lastTime: "2 mins ago" },
  { symbol: "Bonk", users: 98, lastTime: "5 mins ago" },
  { symbol: "RAY", users: 76, lastTime: "12 mins ago" },
  { symbol: "WLT", users: 65, lastTime: "15 mins ago" },
  { symbol: "Gcoin", users: 54, lastTime: "30 mins ago" },
  { symbol: "TRUMP", users: 45, lastTime: "1 hr ago" },
  { symbol: "PUMP", users: 22, lastTime: "3 hrs ago" },
  { symbol: "ANSEM", users: 12, lastTime: "5 hrs ago" },
  { symbol: "Fartcoin", users: 5, lastTime: "1 day ago" },
];
`;

content = content.replace('export default function PayoutPage(', rankingMock + '\nexport default function PayoutPage(');

fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
console.log('Fixed PayoutPage ranking array');
