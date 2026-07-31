const fs = require('fs');

let content = fs.readFileSync('src/frontend/MoneyPage.tsx', 'utf-8');

// Imports
content = content.replace(
  'import { useWltPrice } from "../hooks/useWltPrice";',
  'import { useTokenPrices, SUPPORTED_ASSETS } from "../hooks/useTokenPrices";\nimport { AssetIcon } from "../components/shared/AssetIcon";'
);

// hooks
content = content.replace(
  'const { stats } = useWltPrice();',
  'const prices = useTokenPrices();'
);

// We need to replace the balance modal inner content
// We will replace the entire <div className="flex flex-col gap-4 mb-8"> ... </div>
const oldModalPart = /<div className="flex flex-col gap-4 mb-8">[\s\S]*?(?=<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*\)\s*})/m;
const newModalPart = `<div className="flex flex-col gap-4 mb-8 overflow-y-auto max-h-[300px] pr-2">
                {SUPPORTED_ASSETS.map(asset => {
                  const price = prices[asset]?.priceUsd || (asset === 'Gcoin' ? 0.1 : 0);
                  const bal = asset === 'Gcoin' ? 0.97 : (asset === 'WLT' ? 123322 : 0);
                  return (
                    <div key={asset} className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[14px] font-medium text-black/80">
                        <AssetIcon type={asset} className="w-5 h-5" />
                        <span>{asset}</span>
                        <span className="text-[12px] text-black/40 font-normal">
                          {asset === 'Gcoin' ? '1 USDC = 10 Gcoin' : \`$\${price.toFixed(6)}\`}
                        </span>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1.5 font-bold text-[14px] text-black">
                          <span>{bal.toLocaleString()}</span>
                        </div>
                        <span className="text-[12px] text-black/40 font-medium min-w-[60px] text-right">
                          ≈ \${(bal * price).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>`;

content = content.replace(/<div className="flex flex-col gap-4 mb-8">[\s\S]*?(?=<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*\)\s*})/, newModalPart);
fs.writeFileSync('src/frontend/MoneyPage.tsx', content, 'utf-8');
console.log('Fixed MoneyPage balance modal');
