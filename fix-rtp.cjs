const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

const oldRtpHeader = `<SortTh
                            k="actual"
                            label="Actual RTP"
                            tip="Realized rewards ÷ total incomes to date. Low-volume games swing above and below theory."
                            className="pr-3"
                          />`;

const newRtpHeader = `<SortTh
                            k="actual"
                            label={
                              <div className="flex flex-col">
                                <span className="hidden md:inline">Actual RTP</span>
                                <span className="md:hidden">RTP</span>
                                <span className="md:hidden text-[10px] text-black/50 font-normal mt-0.5 leading-tight">vs Target</span>
                              </div>
                            }
                            tip="Realized rewards ÷ total incomes to date. Low-volume games swing above and below theory."
                            className="pr-3"
                          />`;

content = content.replace(oldRtpHeader, newRtpHeader);
fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
