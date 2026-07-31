const fs = require('fs');
let content = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf-8');

const oldTopUpInput = `<input
                        type="text"
                        placeholder="Amount"
                        disabled={topUpStatus === "processing"}
                        value={
                          topUpAmount
                            ? Number(topUpAmount.replace(/,/g, "")).toLocaleString("en-US", {
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

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', content);
