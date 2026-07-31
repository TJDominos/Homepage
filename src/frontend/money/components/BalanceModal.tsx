import React, { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { AssetIcon } from "../../../components/shared/AssetIcon";
import { SUPPORTED_ASSETS, TokenPrice } from "../../../hooks/useTokenPrices";

interface BalanceModalProps {
  onConvertGcoin?: () => void;
  isOpen: boolean;
  onClose: () => void;
  isDesktop: boolean;
  prices: Record<string, TokenPrice>;
}

export const BalanceModal = ({ isOpen, onClose, isDesktop, prices, onConvertGcoin }: BalanceModalProps) => {
  const [isRefreshingBalance, setIsRefreshingBalance] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/30 backdrop-blur-md"
            onClick={onClose}
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
                onClose();
              }
            }}
            className={`relative w-full max-w-[400px] bg-white rounded-t-[20px] sm:rounded-[20px] overflow-hidden flex flex-col pointer-events-auto ${isDesktop ? "h-auto max-h-[90vh]" : "mt-auto pb-4"}`}
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
                    className={`text-[#A4A2F6] cursor-pointer transition-transform ${isRefreshingBalance ? "animate-spin" : ""}`}
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
                {['USDC', 'USDT', ...SUPPORTED_ASSETS.filter(a => a !== 'Gcoin')].map(asset => {
                  const price = (asset === 'USDC' || asset === 'USDT') ? 1 : (prices[asset]?.priceUsd || 0);
                  const bal = asset === 'USDC' ? 0.97 : (asset === 'USDT' ? 0 : (asset === 'WLT' ? 123322 : 0));
                  return (
                    <div key={asset} className="flex flex-col gap-2 border-b border-black/5 pb-3 pt-1 first:pt-0 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[14px] font-medium text-black/80">
                          <AssetIcon type={asset} className="w-5 h-5" />
                          <span>{asset}</span>
                          {(asset === 'USDC' || asset === 'USDT') ? (
                            <button onClick={() => onConvertGcoin?.()} className="text-[10px] sm:text-[11px] bg-[#EAEAEA] hover:bg-[#D9D9D9] text-black/80 px-2 py-0.5 rounded-full transition-colors font-medium ml-1 cursor-pointer">
                              Convert to Gcoin
                            </button>
                          ) : (
                            <span className="text-[12px] text-black/40 font-normal">
                              ${Number(price.toFixed(6)).toString()}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="flex items-center gap-1.5 font-bold text-[14px] text-black">
                            <span>{bal.toLocaleString()}</span>
                          </div>
                          <span className="text-[12px] text-black/40 font-medium min-w-[60px] text-right">
                            ≈ ${(bal * price).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
