const fs = require('fs');
let content = fs.readFileSync('src/frontend/MoneyPage.tsx', 'utf-8');

const oldStr = `<span className="text-[12px] text-black/40 font-normal">
                            {asset === 'USDC' || asset === 'USDT' ? \`1 \${asset} = $1\` : \`\\$\${Number(price.toFixed(6)).toString()}\`}
                          </span>`;

const newStr = `{(asset === 'USDC' || asset === 'USDT') ? (
                            <button className="text-[10px] sm:text-[11px] bg-[#EAEAEA] hover:bg-[#D9D9D9] text-black/80 px-2 py-0.5 rounded-full transition-colors font-medium ml-1">
                              Convert to Gcoin (1:10)
                            </button>
                          ) : (
                            <span className="text-[12px] text-black/40 font-normal">
                              \`\\$\${Number(price.toFixed(6)).toString()}\`
                            </span>
                          )}`;

content = content.replace(oldStr, newStr);

// Also remove the extra button underneath:
const oldStr2 = `{(asset === 'USDC' || asset === 'USDT') && (
                        <div className="flex justify-start ml-[28px] mt-[-4px]">
                          <button className="text-[10px] sm:text-[11px] bg-[#EAEAEA] hover:bg-[#D9D9D9] text-black/80 px-2.5 py-1 rounded-full transition-colors font-medium">
                            Convert to Gcoin (1:10)
                          </button>
                        </div>
                      )}`;

content = content.replace(oldStr2, '');

fs.writeFileSync('src/frontend/MoneyPage.tsx', content);
