const fs = require('fs');
let content = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf-8');

// 1. Capital Initial of Top up bonus
content = content.replace(
  '<h3 className="text-[16px] font-semibold text-black mb-1">\n                  Top up bonus\n                </h3>',
  '<h3 className="text-[16px] font-semibold text-black mb-1">\n                  Top Up Bonus\n                </h3>'
);

// 2. Change Swap WLT to Swap Token
content = content.replace(
  '<h3 className="text-[16px] font-semibold text-black mb-1">\n                  Swap WLT\n                </h3>',
  '<h3 className="text-[16px] font-semibold text-black mb-1">\n                  Swap Token\n                </h3>'
);

// 3. Change note below it to: Redeem Bonus to Tokens.
content = content.replace(
  '<p className="text-[12px] font-normal text-black/65 mb-4 flex-1">\n                  Redeem Bonus to Crypto\n                </p>',
  '<p className="text-[12px] font-normal text-black/65 mb-4 flex-1">\n                  Redeem Bonus to Tokens.\n                </p>'
);

// 4. Split the amount enter box to: 1 assets select drop down and Input box (note Min: 1,000 Bonus)
const oldInput = `<input
                      type="text"
                      placeholder="Min Amount: 1,000 Bonus"
                      disabled={swapStatus === "processing"}
                      value={
                        swapAmount
                          ? Number(swapAmount).toLocaleString("en-US", {
                              maximumFractionDigits: 6,
                            })
                          : ""
                      }
                      onChange={(e) => {
                        const val = e.target.value.replace(/,/g, "");
                        if (!val) setSwapAmount("");
                        else if (!isNaN(Number(val)) && Number(val) >= 0)
                          setSwapAmount(val);
                      }}
                      className={\`w-full bg-black/5 focus:bg-white rounded-full px-5 py-3 outline-none text-[14px] text-center text-black placeholder-black/40 focus:ring-2 focus:ring-black/10 transition-all font-medium \${swapStatus === "processing" ? "opacity-60 cursor-not-allowed" : ""}\`}
                    />`;

const newInput = `<div className="flex gap-2">
                      <div
                        className="relative shrink-0 w-[40%] min-w-[90px]"
                      >
                        <button
                          disabled={swapStatus === "processing"}
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowSwapCurrencyDropdown(!showSwapCurrencyDropdown);
                            setShowCurrencyDropdown(false);
                          }}
                          className={\`flex w-full items-center justify-between gap-1 bg-black/5 hover:bg-black/10 focus:ring-2 focus:ring-black/10 pl-4 pr-3 py-3 rounded-full text-[14px] text-black font-medium transition-colors cursor-pointer \${showSwapCurrencyDropdown ? "bg-white ring-2 ring-black/10" : ""} \${swapStatus === "processing" ? "opacity-60 cursor-not-allowed" : ""}\`}
                        >
                          <span className="truncate flex-1 text-center">
                            {swapCurrency}
                          </span>
                          <ChevronDown
                            size={14}
                            className="text-black/40 shrink-0"
                          />
                        </button>
                        {showSwapCurrencyDropdown && (
                          <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-black/5 py-1 z-50 overflow-y-auto max-h-[160px]">
                            {SUPPORTED_ASSETS.filter(a => a !== 'Gcoin').map(asset => (
                              <button
                                key={asset}
                                onClick={(e) => {
                                  e.stopPropagation();
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
                      <input
                        type="text"
                        placeholder="Min 1,000 Bonus"
                        disabled={swapStatus === "processing"}
                        value={
                          swapAmount
                            ? Number(swapAmount).toLocaleString("en-US", {
                                maximumFractionDigits: 6,
                              })
                            : ""
                        }
                        onChange={(e) => {
                          const val = e.target.value.replace(/,/g, "");
                          if (!val) setSwapAmount("");
                          else if (!isNaN(Number(val)) && Number(val) >= 0)
                            setSwapAmount(val);
                        }}
                        className={\`flex-1 w-2/3 bg-black/5 focus:bg-white rounded-full px-3 py-3 outline-none text-[14px] text-center text-black placeholder-black/40 focus:ring-2 focus:ring-black/10 transition-all font-medium \${swapStatus === "processing" ? "opacity-60 cursor-not-allowed" : ""}\`}
                      />
                    </div>`;

content = content.replace(oldInput, newInput);

// Update dropdown outside click handler
content = content.replace(
  'setShowCurrencyDropdown(false);\n        setShowSwapCurrencyDropdown(false);',
  'setShowCurrencyDropdown(false);\n        setShowSwapCurrencyDropdown(false);'
);

// We need to fix the dropdown stopPropagation issue in topup dropdown as well
content = content.replace(
  'setShowCurrencyDropdown(!showCurrencyDropdown);',
  'e.stopPropagation(); setShowCurrencyDropdown(!showCurrencyDropdown); setShowSwapCurrencyDropdown(false);'
);

content = content.replace(
  'setTopUpCurrency(asset);\n                                  setShowCurrencyDropdown(false);\n        setShowSwapCurrencyDropdown(false);',
  'e.stopPropagation(); setTopUpCurrency(asset);\n                                  setShowCurrencyDropdown(false);\n        setShowSwapCurrencyDropdown(false);'
);

// We need to change the success text for Swap WLT to Swap Token
content = content.replace(
  'Your WLT has been credited to your balance.',
  'Your {swapCurrency} has been credited to your balance.'
);

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', content);
