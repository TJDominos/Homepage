const fs = require('fs');
let content = fs.readFileSync('src/frontend/money/tabs/BonusTab.tsx', 'utf-8');

// 1. Add states
const stateInjection = `  const [gcoinAmount, setGcoinAmount] = useState("");
  const [gcoinCurrency, setGcoinCurrency] = useState<string>("USDC");
  const [gcoinDirection, setGcoinDirection] = useState<"toGcoin" | "fromGcoin">("toGcoin");
  const [gcoinStatus, setGcoinStatus] = useState<"idle" | "processing" | "success">("idle");
  const [showGcoinCurrencyDropdown, setShowGcoinCurrencyDropdown] = useState(false);
`;
content = content.replace(
  'const [swapStatus, setSwapStatus] = useState<',
  stateInjection + '\n  const [swapStatus, setSwapStatus] = useState<'
);

// 2. Add handlers
const handlerInjection = `  const calculateGcoinSwap = () => {
    if (!gcoinAmount) return 0;
    const num = parseFloat(gcoinAmount.replace(/,/g, ""));
    if (isNaN(num)) return 0;
    return gcoinDirection === "toGcoin" ? num * 10 : num / 10;
  };

  const handleGcoinSubmit = () => {
    if (!gcoinAmount || parseFloat(gcoinAmount.replace(/,/g, "")) <= 0) return;
    setGcoinStatus("processing");
    setTimeout(() => {
      setGcoinStatus("success");
      setGcoinAmount("");
    }, 1500);
  };
`;
content = content.replace(
  'const handleSwapSubmit = () => {',
  handlerInjection + '\n  const handleSwapSubmit = () => {'
);

// 3. Ensure we close dropdowns
content = content.replace(
  'setShowCurrencyDropdown(false);\n      }',
  'setShowCurrencyDropdown(false);\n        setShowGcoinCurrencyDropdown(false);\n      }'
);

// 4. Update the layout grid to be 2-column or 4-column
content = content.replace(
  'className={`money-cards-grid ${isDesktop ? "grid grid-cols-3 gap-6 items-stretch" : "flex flex-col gap-4"}`}',
  'className={`money-cards-grid ${isDesktop ? "grid grid-cols-2 lg:grid-cols-4 gap-6 items-stretch" : "flex flex-col gap-4"}`}'
);
content = content.replace(
  /grid-cols-3/g,
  'grid-cols-2 lg:grid-cols-4'
);

// 5. Add the widget
// I'll append the widget right before the final closing div
// First let's find the closing tags of the grid container.
// It should be `<div className="money-cards-grid...` followed by its children, then `</div>`.
// Wait, the easiest way is to inject it right after the swap widget.
const swapSuccessRegex = /<\/motion\.div>\s*\)\}\s*<\/AnimatePresence>\s*<\/div>/;
const match = content.match(swapSuccessRegex);
if (match) {
  const gcoinWidget = `
        {/* Convert Gcoin Widget */}
        <div className="bg-[#f0f2f5] rounded-[24px] p-6 border border-black/5 flex flex-col items-center text-center shadow-sm relative w-full h-[320px]">
          <AnimatePresence mode="wait">
            {gcoinStatus === "idle" || gcoinStatus === "processing" ? (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full flex flex-col items-center"
              >
                <motion.div
                  className="mb-4 mt-2 w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0"
                  animate={
                    gcoinStatus === "processing" ? { rotate: [0, 180, 360] } : {}
                  }
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight
                    className="w-[40px] h-[40px] text-blue-500"
                    strokeWidth={1.5}
                  />
                </motion.div>
                <h3 className="text-[16px] font-semibold text-black mb-1">
                  Convert Gcoin
                </h3>
                <div className="flex items-center gap-1 mb-4">
                  <button onClick={() => setGcoinDirection(gcoinDirection === "toGcoin" ? "fromGcoin" : "toGcoin")} className="text-[12px] text-blue-600 font-medium hover:underline flex items-center gap-1">
                    Swap Direction <ArrowRight size={12} className={gcoinDirection === "fromGcoin" ? "rotate-180" : ""} />
                  </button>
                </div>
                <div className="w-full flex-1 flex flex-col justify-end gap-3 mt-auto">
                  <div className="flex flex-col w-full">
                    <div className="flex gap-2 items-end">
                      <div className="flex flex-col gap-1 flex-1 w-2/3">
                        <label className="text-[13px] font-normal text-black text-left pl-2">Amount</label>
                        <input
                          type="text"
                          placeholder={gcoinDirection === "toGcoin" ? "Amount in " + gcoinCurrency : "Amount in Gcoin"}
                          disabled={gcoinStatus === "processing"}
                          value={gcoinAmount}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (/^[0-9.,]*$/.test(val)) setGcoinAmount(val);
                          }}
                          onBlur={(e) => {
                            const val = e.target.value.replace(/,/g, "");
                            if (val && !isNaN(Number(val))) {
                              setGcoinAmount(Number(val).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                            }
                          }}
                          className={\`w-full bg-black/5 focus:bg-white rounded-full px-3 py-3 outline-none text-[14px] text-center text-black placeholder-black/40 focus:ring-2 focus:ring-black/10 transition-all font-medium \${gcoinStatus === "processing" ? "opacity-60 cursor-not-allowed" : ""}\`}
                        />
                      </div>
                      <div
                        className="flex flex-col gap-1 relative shrink-0 w-[40%] min-w-[90px]"
                      >
                        <label className="text-[13px] font-normal text-black text-left pl-2">{gcoinDirection === "toGcoin" ? "From" : "To"}</label>
                        <button
                          disabled={gcoinStatus === "processing"}
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowGcoinCurrencyDropdown(!showGcoinCurrencyDropdown);
                            setShowCurrencyDropdown(false);
                            setShowSwapCurrencyDropdown(false);
                          }}
                          className={\`flex w-full items-center justify-between gap-1 bg-black/5 hover:bg-black/10 focus:ring-2 focus:ring-black/10 pl-4 pr-3 py-3 rounded-full text-[14px] text-black font-medium transition-colors cursor-pointer \${showGcoinCurrencyDropdown ? "bg-white ring-2 ring-black/10" : ""} \${gcoinStatus === "processing" ? "opacity-60 cursor-not-allowed" : ""}\`}
                        >
                          <div className="flex items-center gap-2 overflow-hidden flex-1 justify-center">
                            <AssetIcon type={gcoinCurrency} className="w-4 h-4 shrink-0" />
                            <span className="truncate text-center">
                              {gcoinCurrency}
                            </span>
                          </div>
                          <ChevronDown
                            size={14}
                            className="text-black/40 shrink-0"
                          />
                        </button>
                        {showGcoinCurrencyDropdown && (
                          <div className="absolute bottom-[calc(100%+4px)] left-0 w-full bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-black/5 py-1 z-50 overflow-y-auto max-h-[160px]">
                            {["USDC", "USDT"].map(asset => (
                              <button
                                key={asset}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setGcoinCurrency(asset);
                                  setShowGcoinCurrencyDropdown(false);
                                }}
                                className={\`w-full flex items-center gap-2 px-3 py-2 text-[13px] hover:bg-black/5 \${gcoinCurrency === asset ? "bg-black/5 text-black font-semibold" : "text-black/70"}\`}
                              >
                                <AssetIcon type={asset} className="w-4 h-4" />
                                {asset}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="h-[20px] flex items-center justify-center mt-1 w-full">
                      {gcoinAmount && parseFloat(gcoinAmount.replace(/,/g, "")) > 0 ? (
                        <span className="text-[12px] font-medium text-blue-600 leading-[1]">
                          ≈ {formatNumber(calculateGcoinSwap())} {gcoinDirection === "toGcoin" ? "Gcoin" : gcoinCurrency}
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-medium leading-[1]">
                          Rate: 1 {gcoinCurrency} = 10 Gcoin
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleGcoinSubmit}
                    disabled={gcoinStatus === "processing"}
                    className={\`bg-[#333] text-white flex items-center justify-center font-[600] transition-all outline-none \${"w-[80px] h-[28px] text-[13px] rounded-full mx-auto"} \${gcoinStatus === "processing" ? "bg-black/50 cursor-not-allowed" : "hover:bg-black active:scale-95"}\`}
                  >
                    {gcoinStatus === "processing" ? (
                      <Loader2 className="w-4 h-4 animate-spin text-white/70" />
                    ) : (
                      "Convert"
                    )}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center justify-center h-full w-full relative z-10"
              >
                <div className="relative mb-6 mt-2 w-20 h-20 flex items-center justify-center shrink-0">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: 0.1,
                    }}
                    className="absolute inset-0 bg-blue-100 rounded-full"
                  />
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 0.2,
                    }}
                  >
                    <Sparkles className="w-10 h-10 text-blue-500 relative z-10" />
                  </motion.div>
                </div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-[18px] font-semibold text-slate-800 mb-2"
                >
                  Conversion Successful!
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-[14px] text-slate-500 mb-8 max-w-[200px]"
                >
                  Your {gcoinDirection === "toGcoin" ? "Gcoin" : gcoinCurrency} has been credited to your balance.
                </motion.p>
                <button
                  onClick={() => setGcoinStatus("idle")}
                  className={\`bg-[#333] text-white flex items-center justify-center font-[600] hover:bg-black active:scale-95 transition-all outline-none mt-auto \${"w-[80px] h-[28px] text-[13px] rounded-full mx-auto"}\`}
                >
                  Done
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>`;
  content = content.replace(match[0], match[0] + gcoinWidget);
}

fs.writeFileSync('src/frontend/money/tabs/BonusTab.tsx', content);
