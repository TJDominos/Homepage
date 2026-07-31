const fs = require('fs');
let content = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf-8');

// 1. Remove overflow-hidden from the 3 widget containers
content = content.replace(
  /overflow-hidden w-full h-\[320px\]/g,
  'w-full h-[320px]'
);

// 2. Make dropdowns open upwards
content = content.replace(
  /absolute top-full left-0 mt-1 w-full/g,
  'absolute bottom-[calc(100%+4px)] left-0 w-full'
);

// 3. Update topUpAmount logic
content = content.replace(
  /parseFloat\(topUpAmount\)/g,
  'parseFloat(topUpAmount.replace(/,/g, ""))'
);

// Update swapAmount logic
content = content.replace(
  /parseFloat\(swapAmount\)/g,
  'parseFloat(swapAmount.replace(/,/g, ""))'
);

content = content.replace(
  /Number\(topUpAmount\)/g,
  'Number(topUpAmount.replace(/,/g, ""))'
);

content = content.replace(
  /Number\(swapAmount\)/g,
  'Number(swapAmount.replace(/,/g, ""))'
);

// 4. Update the inputs
const oldTopUpInput = `<input
                        type="text"
                        placeholder="Amount"
                        disabled={topUpStatus === "processing"}
                        value={
                          topUpAmount
                            ? Number(topUpAmount).toLocaleString("en-US", {
                                maximumFractionDigits: 6,
                              })
                            : ""
                        }
                        onChange={(e) => {
                          const val = e.target.value.replace(/,/g, "");
                          if (!val) setTopUpAmount("");
                          else if (!isNaN(Number(val)) && Number(val) >= 0)
                            setTopUpAmount(val);
                        }}
                        className={\`flex-1 w-2/3 bg-black/5 focus:bg-white rounded-full px-3 py-3 outline-none text-[14px] text-center text-black placeholder-black/40 focus:ring-2 focus:ring-black/10 transition-all font-medium \${topUpStatus === "processing" ? "opacity-60 cursor-not-allowed" : ""}\`}
                      />`;

const newTopUpInput = `<input
                        type="text"
                        placeholder="Amount"
                        disabled={topUpStatus === "processing"}
                        value={topUpAmount}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (/^[0-9.,]*$/.test(val)) setTopUpAmount(val);
                        }}
                        onBlur={(e) => {
                          const val = e.target.value.replace(/,/g, "");
                          if (val && !isNaN(Number(val))) {
                            setTopUpAmount(Number(val).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                          }
                        }}
                        className={\`flex-1 w-2/3 bg-black/5 focus:bg-white rounded-full px-3 py-3 outline-none text-[14px] text-center text-black placeholder-black/40 focus:ring-2 focus:ring-black/10 transition-all font-medium \${topUpStatus === "processing" ? "opacity-60 cursor-not-allowed" : ""}\`}
                      />`;

content = content.replace(oldTopUpInput, newTopUpInput);

const oldSwapInput = `<input
                        type="text"
                        placeholder="Min: 1,000 Bonus"
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
                      />`;
                      
const oldSwapInputAlt = `<input
                        type="text"
                        placeholder="Min: 1,000 Bonus"
                        disabled={swapStatus === "processing"}
                        value={
                          swapAmount
                            ? Number(swapAmount.replace(/,/g, "")).toLocaleString("en-US", {
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
                      />`;

const newSwapInput = `<input
                        type="text"
                        placeholder="Min: 1,000 Bonus"
                        disabled={swapStatus === "processing"}
                        value={swapAmount}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (/^[0-9.,]*$/.test(val)) setSwapAmount(val);
                        }}
                        onBlur={(e) => {
                          const val = e.target.value.replace(/,/g, "");
                          if (val && !isNaN(Number(val))) {
                            setSwapAmount(Number(val).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                          }
                        }}
                        className={\`flex-1 w-2/3 bg-black/5 focus:bg-white rounded-full px-3 py-3 outline-none text-[14px] text-center text-black placeholder-black/40 focus:ring-2 focus:ring-black/10 transition-all font-medium \${swapStatus === "processing" ? "opacity-60 cursor-not-allowed" : ""}\`}
                      />`;

content = content.replace(oldSwapInput, newSwapInput);
content = content.replace(oldSwapInputAlt, newSwapInput);

// ensure the "Top Up Bonus" title change and "Swap Token" are there, we did this in previous step.

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', content);
