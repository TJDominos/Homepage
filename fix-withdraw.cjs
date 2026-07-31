const fs = require('fs');

let content = fs.readFileSync('src/frontend/money/tabs/WithdrawTab.tsx', 'utf-8');

// Imports
content = content.replace(
  'import { useWltPrice } from "../../../hooks/useWltPrice";',
  'import { useTokenPrices, SUPPORTED_ASSETS } from "../../../hooks/useTokenPrices";'
);

// State types
content = content.replace(
  'const [asset, setAsset] = useState<"WLT" | "Gcoin">("WLT");',
  'const [asset, setAsset] = useState<string>("Gcoin");'
);
content = content.replace(
  'const [crypto, setCrypto] = useState<"WLT" | "USDC" | "USDT">("WLT");',
  'const [crypto, setCrypto] = useState<string>("USDC");'
);

// hooks
content = content.replace(
  'const { stats } = useWltPrice();',
  'const prices = useTokenPrices();'
);

// useEffect
content = content.replace(
  'if (asset === "WLT") {',
  'if (asset !== "Gcoin") {'
);
content = content.replace(
  'setCrypto("WLT");',
  'setCrypto(asset);'
);
content = content.replace(
  'crypto === "WLT"',
  'crypto !== "USDC" && crypto !== "USDT"'
);
content = content.replace(
  'crypto === "WLT"', // in case there's another
  'crypto !== "USDC" && crypto !== "USDT"'
);

// Render
content = content.replace(
  '{["WLT", "Gcoin"].map((a) => (',
  '{SUPPORTED_ASSETS.map((a) => ('
);
content = content.replace(
  'setAsset(a as "WLT" | "Gcoin");',
  'setAsset(a);'
);
content = content.replace(
  '{(asset === "WLT" ? ["WLT"] : ["USDC", "USDT"]).map((c) => (',
  '{(asset === "Gcoin" ? ["USDC", "USDT"] : [asset]).map((c) => ('
);

// Price / available logic
content = content.replace(
  '{asset === "WLT" && (',
  '{asset !== "Gcoin" && ('
);
content = content.replace(
  '{asset === "WLT" && (',
  '{asset !== "Gcoin" && ('
);
content = content.replace(
  '{asset === "WLT" ? (',
  '{asset !== "Gcoin" ? ('
);
content = content.replace(
  'Available Balance: 0.00 WLT',
  'Available Balance: 0.00 {asset}'
);
content = content.replace(
  'Locked Balance: 0.00 WLT',
  'Locked Balance: 0.00 {asset}'
);

// Validation logic
content = content.replace(
  '(asset === "WLT" ? 0 : 123322)',
  '(asset !== "Gcoin" ? 0 : 123322)'
);
content = content.replace(
  '(asset === "WLT" ? 0 : 123322)',
  '(asset !== "Gcoin" ? 0 : 123322)'
);

fs.writeFileSync('src/frontend/money/tabs/WithdrawTab.tsx', content, 'utf-8');
console.log('Fixed WithdrawTab');
