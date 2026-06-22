import React, { useState, useEffect } from "react";
import { Copy } from "lucide-react";
import { useWltPrice } from "../../hooks/useWltPrice";

interface DepositTabProps {
  isDesktop: boolean;
}

const ALL_NETWORKS = [
  { id: "SOL", name: "Solana", time: "≈ 1 mins", confirmations: "1 Confirmation/s" },
  { id: "ETH", name: "Ethereum (ERC20)", time: "≈ 2 mins", confirmations: "6 Confirmation/s" },
  { id: "BSC", name: "BNB Smart Chain (BEP20)", time: "≈ 1 mins", confirmations: "1 Confirmation/s" },
];

export function DepositTab({ isDesktop }: DepositTabProps) {
  const { stats } = useWltPrice();
  const [asset, setAsset] = useState<"WLT" | "Gcoin">("WLT");
  const [crypto, setCrypto] = useState<"WLT" | "USDC" | "USDT">("WLT");
  const [network, setNetwork] = useState<string>("SOL");

  useEffect(() => {
    if (asset === "WLT") {
      setCrypto("WLT");
      setNetwork("SOL");
    } else {
      setCrypto("USDC");
      setNetwork("SOL");
    }
  }, [asset]);

  useEffect(() => {
    if (crypto === "WLT" && network !== "SOL") {
      setNetwork("SOL");
    }
  }, [crypto, network]);

  const currentNetworks = crypto === "WLT" 
    ? ALL_NETWORKS.filter((n) => n.id === "SOL")
    : ALL_NETWORKS;

  const getAddress = () => {
    switch (network) {
      case "ETH":
        return "0x71C7656EC7ab88b098defB751B7401B5f6d8976F";
      case "BSC":
        return "0x89D24A6b4CcB1B6fAA2625fE562bDD9a23260359";
      case "SOL":
      default:
        return "FfTfJwqG7wPnsgXm4WsjCHD";
    }
  };

  const address = getAddress();
  const shortAddress =
    address.length > 15
      ? `${address.substring(0, 6)}...${address.substring(address.length - 5)}`
      : address;

  return (
    <div className={`mt-6 gap-8 ${isDesktop ? "grid grid-cols-[1fr_380px]" : "flex flex-col"}`}>
      
      {/* Left Column */}
      <div className="flex flex-col gap-10">
        
        {/* Select Assets */}
        <div className="flex flex-col gap-4">
          <h2 className="text-[20px] font-medium text-black">Select Assets</h2>
          <div className="flex gap-4">
            <button
              onClick={() => setAsset("WLT")}
              className={`w-[120px] h-[40px] flex justify-center items-center rounded-xl font-medium text-[16px] transition-colors border shadow-sm ${
                asset === "WLT" ? "bg-[#DDEBFA] border-[#A8C7FA] text-black" : "bg-[#f0f2f5] border-transparent text-slate-500 hover:bg-slate-200"
              }`}
            >
              WLT
            </button>
            <button
              onClick={() => setAsset("Gcoin")}
              className={`w-[120px] h-[40px] flex justify-center items-center rounded-xl font-medium text-[16px] transition-colors border shadow-sm ${
                asset === "Gcoin" ? "bg-[#DDEBFA] border-[#A8C7FA] text-black" : "bg-[#f0f2f5] border-transparent text-slate-500 hover:bg-slate-200"
              }`}
            >
              Gcoin
            </button>
          </div>
        </div>

        {/* Select Crypto */}
        <div className="flex flex-col gap-4">
          <h2 className="text-[20px] font-medium text-black">Select Crypto</h2>
          <div className="flex flex-wrap gap-4">
            {asset === "WLT" && (
              <button
                onClick={() => setCrypto("WLT")}
                className={`w-[120px] h-[40px] flex justify-center items-center rounded-xl font-medium text-[16px] transition-colors border shadow-sm ${
                  crypto === "WLT" ? "bg-[#DDEBFA] border-[#A8C7FA] text-black" : "bg-[#f0f2f5] border-transparent text-slate-500 hover:bg-slate-200"
                }`}
              >
                WLT
              </button>
            )}
            {asset === "Gcoin" && (
              <>
                <button
                  onClick={() => setCrypto("USDC")}
                  className={`w-[120px] h-[40px] flex justify-center items-center rounded-xl font-medium text-[16px] transition-colors border shadow-sm ${
                    crypto === "USDC" ? "bg-[#DDEBFA] border-[#A8C7FA] text-black" : "bg-[#f0f2f5] border-transparent text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  USDC
                </button>
                <button
                  onClick={() => setCrypto("USDT")}
                  className={`w-[120px] h-[40px] flex justify-center items-center rounded-xl font-medium text-[16px] transition-colors border shadow-sm ${
                    crypto === "USDT" ? "bg-[#DDEBFA] border-[#A8C7FA] text-black" : "bg-[#f0f2f5] border-transparent text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  USDT
                </button>
              </>
            )}
          </div>
        </div>

        {/* Select Network */}
        <div className="flex flex-col gap-4">
          <h2 className="text-[20px] font-medium text-black">Select Network</h2>
          <div className="flex flex-col gap-3">
            {currentNetworks.map((net) => (
              <button
                key={net.id}
                onClick={() => setNetwork(net.id)}
                className={`flex items-center justify-between p-5 rounded-xl border transition-all text-left max-w-[400px] shadow-sm ${
                  network === net.id
                    ? "bg-[#DDEBFA] border-[#A8C7FA]"
                    : "bg-[#f0f2f5] border-transparent hover:bg-slate-200"
                }`}
              >
                <div className="flex flex-col gap-1">
                  <span className={`font-medium text-[15px] ${network === net.id ? "text-black" : "text-slate-600"}`}>
                    {net.id}
                  </span>
                  <span className={`text-[12px] font-medium ${network === net.id ? "text-black/70" : "text-slate-500"}`}>
                    {net.name}
                  </span>
                </div>
                <div className="flex flex-col gap-1 items-end">
                  <span className={`font-medium text-[13px] ${network === net.id ? "text-black" : "text-slate-600"}`}>
                    {net.time}
                  </span>
                  <span className={`text-[12px] font-medium ${network === net.id ? "text-black/70" : "text-slate-500"}`}>
                    {net.confirmations}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column (Divider and Info) */}
      <div className={`relative ${isDesktop ? "pl-8" : "mt-8 pt-8 border-t border-black/10"}`}>
        {isDesktop && (
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-black/10"></div>
        )}

        <div className="flex flex-col items-center mt-2">
          <div className="flex items-center justify-center gap-4 text-black/60 text-sm mb-6 bg-black/5 px-5 py-2.5 rounded-full font-medium">
            {asset === "WLT" ? (
              <span>1 WLT ≈ ${stats?.price?.toFixed(4) || "0.0000"}</span>
            ) : (
              <span>1 USDC = 10 Gcoin</span>
            )}
          </div>

          <div className="bg-[#EAEAEA] rounded-3xl p-6 flex flex-col items-center text-center w-full max-w-[360px] shadow-sm">
            <div className="flex items-center justify-center gap-2 text-[15px] mb-8 w-full px-2">
              <span className="text-black font-semibold">Your Address:</span>
              <span className="text-[#6A3FE6] font-bold truncate">
                {shortAddress}
              </span>
              <button 
                className="text-[#6A3FE6] hover:opacity-80 shrink-0" 
                onClick={() => navigator.clipboard.writeText(address)}
              >
                <Copy size={18} />
              </button>
            </div>

            <div className="w-[180px] h-[180px] bg-white rounded-xl shadow-sm mb-8 p-3 flex justify-center items-center">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(address)}`}
                alt="QR Code"
                className="w-full h-full object-contain"
              />
            </div>

            <p className="text-[12px] leading-relaxed text-black/50 px-2 font-medium">
              Deposits under $1.00 won't show up until they total $1.00 or more.
              {asset === "Gcoin" && " USDC auto-converts to Gcoin, withdrawable anytime as USDC. "}
              Refresh your balance if it seems wrong, or contact{" "}
              <a
                href="mailto:support@randseed.org"
                className="text-[#6A3FE6] hover:underline"
              >
                support@randseed.org
              </a>{" "}
              for help.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
