const fs = require('fs');
let code = fs.readFileSync('src/frontend/NotFoundPage.tsx', 'utf8');

code = code.replace(
  'className="bg-[#E8D7C9] hover:bg-[#decbc3] transition-colors border-[2px] border-[#202020] rounded-[12px] px-8 py-3 text-[16px] font-bold text-[#202020] active:scale-[0.98]"',
  'className="bg-[#111] hover:bg-black text-white rounded-full px-8 py-3 text-[16px] font-bold transition-all active:scale-[0.98]"'
);

fs.writeFileSync('src/frontend/NotFoundPage.tsx', code);
