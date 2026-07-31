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

// We need a swapCurrency state and showSwapCurrencyDropdown state
// Search for `const [topUpCurrency...`
content = content.replace(
  'const [topUpCurrency, setTopUpCurrency] = useState<"wlt" | "gcoin">("wlt");',
  'const [topUpCurrency, setTopUpCurrency] = useState<string>("WLT");\n  const [swapCurrency, setSwapCurrency] = useState<string>("WLT");\n  const [showSwapCurrencyDropdown, setShowSwapCurrencyDropdown] = useState(false);'
);

// Replace calculation logic
const calcTopUpOld = `  const calculateBonusFromTopUp = () => {
    const num = parseFloat(topUpAmount) || 0;
    if (topUpCurrency === "gcoin") {
      return num * GCOIN_TO_BONUS;
    } else {
      return num * WLT_TO_BONUS;
    }
  };`;
const calcTopUpNew = `  const calculateBonusFromTopUp = () => {
    const num = parseFloat(topUpAmount) || 0;
    const priceUsd = prices[topUpCurrency]?.priceUsd || 0;
    return (num * priceUsd) / BONUS_PRICE_USD;
  };`;
content = content.replace(calcTopUpOld, calcTopUpNew);

const calcSwapOld = `  const calculateWltFromSwap = () => {
    if (!swapAmount) return 0;
    const num = parseFloat(swapAmount);
    if (isNaN(num) || num < 1000) return 0;
    return WLT_TO_BONUS > 0 ? num / WLT_TO_BONUS : 0;
  };`;
const calcSwapNew = `  const calculateTokenFromSwap = () => {
    if (!swapAmount) return 0;
    const num = parseFloat(swapAmount);
    if (isNaN(num) || num < 1000) return 0;
    const priceUsd = prices[swapCurrency]?.priceUsd || 1;
    return (num * BONUS_PRICE_USD) / priceUsd;
  };`;
content = content.replace(calcSwapOld, calcSwapNew);

// UI for TopUp dropdown
const topUpDropdownOld = `                        {showCurrencyDropdown && (
                          <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-black/5 py-1 z-50 overflow-hidden">
                            <button
                              onClick={() => {
                                setTopUpCurrency("wlt");
                                setShowCurrencyDropdown(false);
                              }}
                              className={\`w-full text-left px-4 py-2 text-[13px] hover:bg-black/5 \${topUpCurrency === "wlt" ? "bg-black/5 text-black font-semibold" : "text-black/70"}\`}
                            >
                              WLT
                            </button>
                            <button
                              onClick={() => {
                                setTopUpCurrency("gcoin");
                                setShowCurrencyDropdown(false);
                              }}
                              className={\`w-full text-left px-4 py-2 text-[13px] hover:bg-black/5 \${topUpCurrency === "gcoin" ? "bg-black/5 text-black font-semibold" : "text-black/70"}\`}
                            >
                              Gcoin
                            </button>
                          </div>
                        )}`;
const topUpDropdownNew = `                        {showCurrencyDropdown && (
                          <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-black/5 py-1 z-50 overflow-y-auto max-h-[160px]">
                            {SUPPORTED_ASSETS.map(asset => (
                              <button
                                key={asset}
                                onClick={() => {
                                  setTopUpCurrency(asset);
                                  setShowCurrencyDropdown(false);
                                }}
                                className={\`w-full flex items-center gap-2 px-3 py-2 text-[13px] hover:bg-black/5 \${topUpCurrency === asset ? "bg-black/5 text-black font-semibold" : "text-black/70"}\`}
                              >
                                <AssetIcon type={asset} className="w-4 h-4" />
                                {asset}
                              </button>
                            ))}
                          </div>
                        )}`;
content = content.replace(topUpDropdownOld, topUpDropdownNew);

// Fix topUp button label
content = content.replace(
  '{topUpCurrency === "wlt" ? "WLT" : "Gcoin"}',
  '{topUpCurrency}'
);

content = content.replace(
  'Rate: 1 {topUpCurrency.toUpperCase()} ={" "}',
  'Rate: 1 {topUpCurrency} ={" "}'
);
content = content.replace(
  'topUpCurrency === "wlt"\n                              ? WLT_TO_BONUS\n                              : GCOIN_TO_BONUS,',
  '(prices[topUpCurrency]?.priceUsd || 0) / BONUS_PRICE_USD,'
);
// Make sure formatNumber receives it well
content = content.replace(
  'formatNumber(\n                            topUpCurrency === "wlt"\n                              ? WLT_TO_BONUS\n                              : GCOIN_TO_BONUS,\n                          )',
  'formatNumber((prices[topUpCurrency]?.priceUsd || 0) / BONUS_PRICE_USD)'
);

// UI for Swap dropdown and label
content = content.replace(
  'Swap WLT',
  'Swap Bonus'
);
content = content.replace(
  'Redeem Bonus to WLT',
  'Redeem Bonus to Crypto'
);
content = content.replace(
  'calculateWltFromSwap()',
  'calculateTokenFromSwap()'
);
content = content.replace(
  '} WLT',
  '} {swapCurrency}'
);
content = content.replace(
  '{formatNumber(1000 / WLT_TO_BONUS)} WLT',
  '{formatNumber(1000 * BONUS_PRICE_USD / (prices[swapCurrency]?.priceUsd || 1))} {swapCurrency}'
);

// Add dropdown to swap
const swapInputOld = `<div className="flex flex-col w-full">
                    <input`;
const swapInputNew = `<div className="flex flex-col w-full">
                    <div className="flex items-center gap-2 relative mb-2 justify-center">
                      <span className="text-[13px] font-medium text-black/60">To:</span>
                      <button
                        onClick={() => setShowSwapCurrencyDropdown(!showSwapCurrencyDropdown)}
                        className="flex items-center gap-1.5 bg-black/5 hover:bg-black/10 px-3 py-1.5 rounded-full transition-colors"
                      >
                        <AssetIcon type={swapCurrency} className="w-4 h-4" />
                        <span className="text-[13px] font-medium text-black">{swapCurrency}</span>
                        <ChevronDown size={14} className="text-black/40 shrink-0" />
                      </button>
                      {showSwapCurrencyDropdown && (
                        <div className="absolute top-full mt-1 w-[120px] bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-black/5 py-1 z-50 overflow-y-auto max-h-[160px]">
                          {SUPPORTED_ASSETS.map(asset => (
                            <button
                              key={asset}
                              onClick={() => {
                                setSwapCurrency(asset);
                                setShowSwapCurrencyDropdown(false);
                              }}
                              className={\`w-full flex items-center gap-2 px-3 py-2 text-[13px] hover:bg-black/5 \${swapCurrency === asset ? "bg-black/5 text-black font-semibold" : "text-black/70"}\`}
                            >
                              <AssetIcon type={asset} className="w-4 h-4" />
                              {asset}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <input`;
content = content.replace(swapInputOld, swapInputNew);

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', content, 'utf-8');
console.log('Fixed BonusTab');
