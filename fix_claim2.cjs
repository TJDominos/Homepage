const fs = require('fs');
let content = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf-8');

const oldClaimForm = `<div className="w-full flex flex-col justify-end gap-3 mt-auto">
                  <div className="flex flex-col w-full">
                    <label className="text-[13px] font-normal text-transparent text-left pl-2 select-none block">Code</label>
                    <input
                      type="text"
                      placeholder="Enter Code"
                      value={claimCode}
                      disabled={claimStatus === "processing"}
                      onChange={(e) => {
                        setClaimCode(e.target.value);
                        setClaimStatus("idle");
                      }}
                      className={\`w-full bg-black/5 focus:bg-white rounded-full px-5 h-[32px] outline-none text-[14px] text-center text-black placeholder-black/40 focus:ring-2 focus:ring-black/10 transition-all font-medium \${claimStatus === "processing" ? "opacity-60 cursor-not-allowed" : ""}\`}
                    />
                    <div className="h-[20px] flex items-center justify-center mt-1 w-full"></div>
                  </div>`;

const newClaimForm = `<div className="w-full flex flex-col justify-end gap-3 mt-auto">
                  <div className="flex flex-col w-full">
                    <div className="flex gap-2 items-end">
                      <div className="flex flex-col gap-1 flex-1 w-full">
                        <label className="text-[13px] font-normal text-transparent text-left pl-2 select-none block">Code</label>
                        <input
                          type="text"
                          placeholder="Enter Code"
                          value={claimCode}
                          disabled={claimStatus === "processing"}
                          onChange={(e) => {
                            setClaimCode(e.target.value);
                            setClaimStatus("idle");
                          }}
                          className={\`w-full bg-black/5 focus:bg-white rounded-full px-5 h-[32px] outline-none text-[14px] text-center text-black placeholder-black/40 focus:ring-2 focus:ring-black/10 transition-all font-medium \${claimStatus === "processing" ? "opacity-60 cursor-not-allowed" : ""}\`}
                        />
                      </div>
                    </div>
                    <div className="h-[20px] flex items-center justify-center mt-1 w-full"></div>
                  </div>`;

content = content.replace(oldClaimForm, newClaimForm);
fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', content);
