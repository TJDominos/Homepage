const fs = require('fs');
let content = fs.readFileSync('src/frontend/MoneyPage.tsx', 'utf-8');

if (!content.includes('import { motion')) {
  content = content.replace(
    'import React, { useState } from "react";',
    'import React, { useState } from "react";\nimport { motion, AnimatePresence, PanInfo } from "framer-motion";'
  );
}

content = content.replace(
  'const [isRefreshingWlt, setIsRefreshingWlt] = useState(false);',
  'const [isRefreshingWlt, setIsRefreshingWlt] = useState(false);\n  const [isRefreshingBalance, setIsRefreshingBalance] = useState(false);'
);

content = content.replace(
  /\{activeModal === "balance" && \([\s\S]*?\)\}/,
  `<AnimatePresence>
      {activeModal === "balance" && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/30 backdrop-blur-md"
            onClick={closeModal}
          ></motion.div>

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            drag={!isDesktop ? "y" : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(e: any, info: PanInfo) => {
              if (info.offset.y > 50 && info.velocity.y > 20) {
                closeModal();
              }
            }}
            className={\`relative w-full max-w-[400px] bg-white rounded-t-[20px] sm:rounded-[20px] overflow-hidden flex flex-col pointer-events-auto \${isDesktop ? "h-auto max-h-[90vh]" : "mt-auto pb-4"}\`}
          >
            <div className="px-6 py-6 flex flex-col relative text-left">
              {!isDesktop && (
                <div className="w-12 h-1 bg-black/10 rounded-full mx-auto mb-4 absolute top-2 left-1/2 -translate-x-1/2"></div>
              )}
              <div className="flex items-center gap-2 mb-3 justify-center mt-2">
                <h2 className="text-[16px] font-bold text-black">
                  Balance ≈ $123,343.00
                </h2>
                <button className="text-black/40 hover:text-black transition-colors">
                  <RefreshCw 
                    size={14} 
                    className={\`text-[#A4A2F6] cursor-pointer transition-transform \${isRefreshingBalance ? "animate-spin" : ""}\`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isRefreshingBalance) return;
                      setIsRefreshingBalance(true);
                      setTimeout(() => setIsRefreshingBalance(false), 1000);
                    }}
                  />
                </button>
              </div>
              <div className="text-[12px] text-black/50 mb-6 text-center w-full max-w-[360px] mx-auto leading-relaxed font-normal">
                Balance is an estimated value of Assets based on the current market (Gcoin and Bonus not included).
              </div>

              <div className="w-full h-[1px] bg-black/5 mb-4"></div>

              <div className="flex flex-col gap-4 mb-8 overflow-y-auto max-h-[300px] pr-2">
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
              </div>
            </div>
          </motion.div>
        </div>
      )}
      </AnimatePresence>`
);

fs.writeFileSync('src/frontend/MoneyPage.tsx', content);
