const fs = require('fs');
let content = fs.readFileSync('src/frontend/money/tabs/DepositTab.tsx', 'utf-8');

// Remove Gcoin from default state, set it to USDC
content = content.replace(
  'const [asset, setAsset] = useState<string>("Gcoin");',
  'const [asset, setAsset] = useState<string>("USDC");'
);

// We need to filter SUPPORTED_ASSETS to remove Gcoin
content = content.replace(
  '{SUPPORTED_ASSETS.map((a) => (',
  '{SUPPORTED_ASSETS.filter(a => a !== "Gcoin").map((a) => ('
);

// Remove Crypto Select
const cryptoSelectRegex = /\{\/\* Crypto Select \*\/\}.*?\{\/\* Network Select \*\/\}/s;
content = content.replace(cryptoSelectRegex, '{/* Network Select */}');

// The `crypto` state and logic can be removed or simplified. But removing the UI is the main thing.
fs.writeFileSync('src/frontend/money/tabs/DepositTab.tsx', content);
