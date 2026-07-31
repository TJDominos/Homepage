const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

content = content.replace(
  'className={`px-5 py-2.5 rounded-2xl text-[14px] font-medium transition-colors ${',
  'className={`w-[120px] h-[28px] p-0 flex items-center justify-center rounded-2xl text-[14px] leading-[20px] font-medium transition-colors ${'
);

content = content.replace(
  'className={`px-5 py-2.5 rounded-2xl text-[14px] font-medium transition-colors ${',
  'className={`w-[120px] h-[28px] p-0 flex items-center justify-center rounded-2xl text-[14px] leading-[20px] font-medium transition-colors ${'
);

fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
console.log("Updated button sizes for real 4");
