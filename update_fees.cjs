const fs = require('fs');
let code = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf8');

code = code.replace(
  '{0 > 0 ? `Conversion fee: 0.00 Bonus` : "No conversion fee"}',
  '{parseFloat(topUpAmount.replace(/,/g, "")) > 0 ? `Conversion fee: ${formatNumber(calculateBonusFromTopUp() * 0.01)} Bonus` : "No conversion fee"}'
);

code = code.replace(
  '{0 > 0 ? `Conversion fee: 0.00 Bonus` : "No conversion fee"}',
  '{parseFloat(swapAmount.replace(/,/g, "")) > 0 ? `Conversion fee: ${formatNumber(parseFloat(swapAmount.replace(/,/g, "")) * 0.01)} Bonus` : "No conversion fee"}'
);

code = code.replace(
  '{0 > 0 ? `Conversion fee: 0.00 Gcoin` : "No conversion fee"}',
  '{parseFloat(gcoinAmount.replace(/,/g, "")) > 0 ? `Conversion fee: ${formatNumber((gcoinDirection === "toGcoin" ? calculateGcoinSwap() : parseFloat(gcoinAmount.replace(/,/g, ""))) * 0.01)} Gcoin` : "No conversion fee"}'
);

const w3Target = '                    <div className="flex flex-col items-center justify-center mt-1 w-full gap-1">\n                      <span className="text-[11px] text-slate-400 font-medium leading-[1]">\n                        No conversion fee\n                      </span>\n                    </div>';
const w3Replacement = '                    <div className="h-[20px] flex flex-col items-center justify-center mt-1 w-full gap-1"></div>';

if (code.includes(w3Target)) {
  code = code.replace(w3Target, w3Replacement);
} else {
  console.log("Widget 3 target not found!");
}

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', code);
console.log("Fees updated dynamically!");
