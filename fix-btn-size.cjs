const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

const oldBtn1 = `className=\`px-5 py-2.5 rounded-2xl text-[14px] font-medium transition-colors \${
                  gameCategory === "Rand Game"`;

const newBtn1 = `className=\`w-[120px] h-[28px] rounded-2xl text-[14px] leading-[20px] font-medium transition-colors flex items-center justify-center \${
                  gameCategory === "Rand Game"`;

content = content.replace(oldBtn1, newBtn1);

const oldBtn2 = `className=\`px-5 py-2.5 rounded-2xl text-[14px] font-medium transition-colors \${
                  gameCategory === "Randball"`;

const newBtn2 = `className=\`w-[120px] h-[28px] rounded-2xl text-[14px] leading-[20px] font-medium transition-colors flex items-center justify-center \${
                  gameCategory === "Randball"`;

content = content.replace(oldBtn2, newBtn2);

fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
console.log("Updated button sizes");
