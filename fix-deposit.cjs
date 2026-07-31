const fs = require('fs');

let content = fs.readFileSync('src/frontend/money/tabs/DepositTab.tsx', 'utf-8');

// Imports
content = content.replace(
  'import { useWltPrice } from "../../../hooks/useWltPrice";',
  'import { useTokenPrices, SUPPORTED_ASSETS } from "../../../hooks/useTokenPrices";'
);

// State types
content = content.replace(
  'const [asset, setAsset] = useState<"WLT" | "Gcoin">("Gcoin");',
  'const [asset, setAsset] = useState<string>("Gcoin");'
);
content = content.replace(
  'const [crypto, setCrypto] = useState<"WLT" | "USDC" | "USDT">("USDC");',
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

// Price display
content = content.replace(
  '{asset === "WLT" ? (',
  '{asset !== "Gcoin" ? ('
);
content = content.replace(
  '<span>1 WLT ≈ ${stats?.price?.toFixed(4) || "0.0000"}</span>',
  '<span>1 {asset} ≈ ${prices[asset]?.priceUsd?.toFixed(6) || "0.00"}</span>'
);

fs.writeFileSync('src/frontend/money/tabs/DepositTab.tsx', content, 'utf-8');
console.log('Fixed DepositTab');
