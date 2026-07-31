const fs = require('fs');
let content = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf-8');

// Fix e.stopPropagation()
content = content.replace(
  'onClick={() => {\n                            e.stopPropagation(); setShowCurrencyDropdown(!showCurrencyDropdown); setShowSwapCurrencyDropdown(false);\n                          }}',
  'onClick={(e) => {\n                            e.stopPropagation(); setShowCurrencyDropdown(!showCurrencyDropdown); setShowSwapCurrencyDropdown(false);\n                          }}'
);

content = content.replace(
  'onClick={() => {\n                                  e.stopPropagation(); setTopUpCurrency(asset);\n                                  setShowCurrencyDropdown(false);\n        setShowSwapCurrencyDropdown(false);\n                                }}',
  'onClick={(e) => {\n                                  e.stopPropagation(); setTopUpCurrency(asset);\n                                  setShowCurrencyDropdown(false);\n        setShowSwapCurrencyDropdown(false);\n                                }}'
);

// Fix calculateBonusFromTopUp
const oldCalc = `  const calculateBonusFromTopUp = () => {
    if (!topUpAmount) return 0;
    const num = parseFloat(topUpAmount.replace(/,/g, ""));
    if (isNaN(num)) return 0;
    if (topUpCurrency === "gcoin") {
      return num * GCOIN_TO_BONUS;
    } else {
    }
  };`;

const newCalc = `  const calculateBonusFromTopUp = () => {
    if (!topUpAmount) return 0;
    const num = parseFloat(topUpAmount.replace(/,/g, ""));
    if (isNaN(num)) return 0;
    if (topUpCurrency === "Gcoin") {
      return num * GCOIN_TO_BONUS;
    } else {
      const priceUsd = prices[topUpCurrency]?.priceUsd || 0;
      return (num * priceUsd) / BONUS_PRICE_USD;
    }
  };`;

content = content.replace(oldCalc, newCalc);

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', content);
