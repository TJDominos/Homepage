const fs = require('fs');

let content = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf-8');

// Imports
content = content.replace(
  'import { useWltPrice } from "../../../hooks/useWltPrice";',
  'import { useTokenPrices, SUPPORTED_ASSETS } from "../../../hooks/useTokenPrices";\nimport { AssetIcon } from "../../../components/shared/AssetIcon";'
);

// hooks
content = content.replace(
  'const { stats } = useWltPrice();',
  'const prices = useTokenPrices();'
);

// topUpCurrency state
content = content.replace(
  'const [topUpCurrency, setTopUpCurrency] = useState<"wlt" | "gcoin">("wlt");',
  'const [topUpCurrency, setTopUpCurrency] = useState<string>("WLT");'
);

// calculateBonusFromTopUp function
const calcOld = `  const calculateBonusFromTopUp = () => {
    const num = parseFloat(topUpAmount) || 0;
    if (topUpCurrency === "gcoin") {
      return (num * 10) / BONUS_PRICE_USD;
    }
    // 1 WLT = (stats.price / BONUS_PRICE_USD) Bonus
    const wltPrice = stats?.price || 0.00015885;
    return (num * wltPrice) / BONUS_PRICE_USD;
  };`;

const calcNew = `  const calculateBonusFromTopUp = () => {
    const num = parseFloat(topUpAmount) || 0;
    const priceUsd = prices[topUpCurrency]?.priceUsd || 0;
    return (num * priceUsd) / BONUS_PRICE_USD;
  };`;
content = content.replace(calcOld, calcNew);

// swap currency state (assumes we might need one, wait, does swap currently have a currency? Let's check!)

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', content, 'utf-8');
console.log('Fixed BonusTab partially');
