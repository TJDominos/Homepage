const fs = require('fs');
let content = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf-8');

// There are two dropdowns, one for showCurrencyDropdown (Top Up Bonus) and one for showSwapCurrencyDropdown (Redeem Bonus)
// I will just use regex to carefully fix the top up bonus one.

const topUpRegex = /\{showCurrencyDropdown && \([\s\S]*?\{\[\.\.\.SUPPORTED_ASSETS\]\.filter\(a => a !== 'Gcoin' && a !== 'USDC' && a !== 'USDT'\)/;

content = content.replace(topUpRegex, match => match.replace("a !== 'Gcoin' && a !== 'USDC' && a !== 'USDT'", "a !== 'Gcoin'"));

// And change the default swapCurrency from "USDC" to "WLT"
content = content.replace(/const \[swapCurrency, setSwapCurrency\] = useState<string>\("USDC"\);/, 'const [swapCurrency, setSwapCurrency] = useState<string>("WLT");');

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', content);
console.log("Fixed top up dropdown and default swap currency");
