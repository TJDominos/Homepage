const fs = require('fs');
let code = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf8');

code = code.replace(
  '{parseFloat(topUpAmount.replace(/,/g, "")) > 0 ? `Conversion fee: ${formatNumber(calculateBonusFromTopUp() * 0.01)} Bonus` : "No conversion fee"}',
  '{parseFloat(topUpAmount.replace(/,/g, "")) > 0 ? `Conversion fee: 10.00 Bonus` : "No conversion fee"}'
);

code = code.replace(
  '{parseFloat(swapAmount.replace(/,/g, "")) > 0 ? `Conversion fee: ${formatNumber(parseFloat(swapAmount.replace(/,/g, "")) * 0.01)} Bonus` : "No conversion fee"}',
  '{parseFloat(swapAmount.replace(/,/g, "")) > 0 ? `Conversion fee: 10.00 Bonus` : "No conversion fee"}'
);

code = code.replace(
  '{parseFloat(gcoinAmount.replace(/,/g, "")) > 0 ? `Conversion fee: ${formatNumber((gcoinDirection === "toGcoin" ? calculateGcoinSwap() : parseFloat(gcoinAmount.replace(/,/g, ""))) * 0.01)} Gcoin` : "No conversion fee"}',
  '{parseFloat(gcoinAmount.replace(/,/g, "")) > 0 ? `Conversion fee: 1.00 Gcoin` : "No conversion fee"}'
);

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', code);
console.log("Absolute fees updated!");
