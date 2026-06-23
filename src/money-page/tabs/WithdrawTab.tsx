import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Copy,
  Clover,
  CircleDollarSign,
  ChevronDown,
  Activity,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import { useWltPrice } from "../../hooks/useWltPrice";
import { WltLogo } from "../../components/WltLogo";
import { AddressInput } from "../components/AddressInput";

interface WithdrawTabProps {
  isDesktop: boolean;
}

const ALL_NETWORKS = [
  {
    id: "SOL",
    name: "Solana",
    time: "≈ 1 mins",
    confirmations: "1 Confirmation/s",
    logo: "/solana-sol-logo-horizontal.svg",
    isPaused: false,
  },
  {
    id: "ETH",
    name: "Ethereum (ERC20)",
    time: "≈ 2 mins",
    confirmations: "6 Confirmation/s",
    logo: "/ethereum-eth-logo-full-horizontal.svg",
    isPaused: false,
  },
  {
    id: "BSC",
    name: "BNB Smart Chain (BEP20)",
    time: "≈ 1 mins",
    confirmations: "1 Confirmation/s",
    isPaused: true,
  },
];

const AssetIcon = ({ type }: { type: string }) => {
  if (type === "WLT") {
    return <WltLogo className="w-5 h-5 shrink-0" />;
  }
  if (type === "Gcoin") {
    return (
      <div className="w-5 h-5 rounded-full bg-yellow-400 border border-black/10 shrink-0"></div>
    );
  }
  if (type === "USDC") {
    return (
      <div className="w-5 h-5 rounded-full bg-[#2775CA] flex items-center justify-center text-white text-[12px] font-bold shrink-0">
        $
      </div>
    );
  }
  if (type === "USDT") {
    return (
      <div className="w-5 h-5 rounded-full bg-[#26A17B] flex items-center justify-center text-white text-[12px] font-bold shrink-0">
        T
      </div>
    );
  }
  return null;
};

export function WithdrawTab({ isDesktop }: WithdrawTabProps) {
  const { stats } = useWltPrice();
  const [asset, setAsset] = useState<"WLT" | "Gcoin">("WLT");
  const [crypto, setCrypto] = useState<"WLT" | "USDC" | "USDT">("WLT");
  const [network, setNetwork] = useState<string>("SOL");
  const [showNetworkDropdown, setShowNetworkDropdown] = useState(false);
  const [showCryptoDropdown, setShowCryptoDropdown] = useState(false);
  const [showAssetDropdown, setShowAssetDropdown] = useState(false);
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const [faqExpanded, setFaqExpanded] = useState(false);

  useEffect(() => {
    if (asset === "WLT") {
      setCrypto("WLT");
      setNetwork("SOL");
    } else {
      setCrypto("USDC");
      setNetwork("SOL");
    }
    setAmount("");
  }, [asset]);

  useEffect(() => {
    if (crypto === "WLT" && network !== "SOL") {
      setNetwork("SOL");
    }
  }, [crypto, network]);

  const currentNetworks =
    crypto === "WLT"
      ? ALL_NETWORKS.filter((n) => n.id === "SOL")
      : ALL_NETWORKS;

  const rightColumnContent = (
    <div className="flex flex-col mt-2 mb-6 w-full max-w-2xl mx-auto">
      <div className="bg-[#EAEAEA] rounded-3xl p-5 md:p-6 flex flex-col w-full shadow-sm">
        <div className="flex flex-col gap-2 mb-6">
          <label className="text-[15px] font-semibold text-black">
            Withdraw Address
          </label>
          <div className="w-full">
            <AddressInput value={address} onChange={setAddress} />
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-6 w-full">
          <label className="text-[15px] font-semibold text-black">
            Withdraw Amount
          </label>
          <div className="flex items-center gap-1 sm:gap-2 w-full">
            <input
              type="text"
              placeholder="Minimum 20"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 min-w-0 bg-black/5 border border-transparent rounded-full px-3 sm:px-4 h-8 outline-none text-[14px] text-black placeholder-black/40 transition-all font-medium focus:border-black focus:bg-transparent"
            />
            <div className="bg-black/5 border border-transparent px-3 sm:px-4 h-8 flex items-center justify-center rounded-full text-black/40 text-[14px] font-medium shrink-0">
              {asset}
            </div>
            <button className="bg-[#111] hover:bg-black text-white px-4 sm:px-5 h-8 flex items-center justify-center rounded-full text-[14px] font-bold transition-all shrink-0">
              Max
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-1 gap-y-1 text-[13px] text-black/40 mb-2 font-medium px-2">
          <span className="whitespace-nowrap">
            Total {asset} {asset === "WLT" ? "0.00" : "123322"}
          </span>
          <span className="hidden sm:inline">,</span>
          <span className="whitespace-nowrap mx-1">
            Network free 0.5 {crypto}
          </span>
          <div className="w-4 h-4 rounded-full bg-black/10 flex items-center justify-center ml-1 text-[10px] shrink-0 font-bold text-black/50">
            ?
          </div>
        </div>

        {parseFloat(amount || "0") > (asset === "WLT" ? 0 : 123322) && (
          <div className="text-red-500 font-medium text-[13px] px-2 mb-6">
            Insufficient balance
          </div>
        )}

        <div
          className={`${parseFloat(amount || "0") > (asset === "WLT" ? 0 : 123322) ? "mt-2" : "mt-6"}`}
        >
          <button
            className="w-[120px] h-[40px] flex items-center justify-center mx-auto bg-[#111] hover:bg-black text-white font-bold rounded-full shadow-sm transition-all text-[15px] mb-4"
            onClick={() => {
              setShowStatus(true);
              setShowAssetDropdown(false);
              setShowCryptoDropdown(false);
              setShowNetworkDropdown(false);
            }}
          >
            Withdraw
          </button>
        </div>

        <div className="flex flex-col items-center text-center gap-2 px-2 mt-2">
          <a
            href="mailto:support@randseed.org"
            className="text-black/60 hover:text-black hover:underline font-medium text-[13px] underline decoration-black/30 underline-offset-4"
          >
            support@randseed.org
          </a>
          <p className="text-[13px] text-black/40 font-medium leading-relaxed max-w-[90%] mt-4 mx-auto">
            If you have trouble to withdraw or have not received your
            withdrawal, please contact us with your withdrawal address.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`mt-6 gap-2 flex flex-col`}>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-3">
          <h2 className="text-[16px] font-[600] text-slate-800">
            On-chain Withdrawal
          </h2>
          <div className="flex items-center gap-1.5 bg-black/5 px-2.5 py-1 rounded-full">
            <div
              className={`w-1.5 h-1.5 rounded-full ${currentNetworks.find((n) => n.id === network)?.isPaused ? "bg-red-500" : "bg-emerald-500"}`}
            ></div>
            <span
              className={`text-[11px] font-medium leading-none ${currentNetworks.find((n) => n.id === network)?.isPaused ? "text-red-500" : "text-emerald-600"}`}
            >
              {currentNetworks.find((n) => n.id === network)?.isPaused
                ? "Paused for Maintenance"
                : "Operational"}
            </span>
          </div>
        </div>
        <p className="text-[12px] font-normal text-black/65">
          Withdraw is processed through the blockchain networks Wrong address
          will result in the loss of funds
        </p>
      </div>
      <div
        className={`flex flex-col md:flex-row gap-6 w-full max-w-5xl items-start`}
      >
        <div className="flex-1 w-full max-w-2xl">
          <div className="flex flex-wrap items-start gap-4 relative z-20 pb-1 w-full">
            {/* Asset Select */}
            <div className="flex flex-col gap-1 relative shrink-0 min-w-[110px] flex-auto sm:flex-none">
              <label className="text-[13px] font-normal text-black">
                Assets
              </label>
              <button
                onClick={() => {
                  setShowAssetDropdown(!showAssetDropdown);
                  setShowCryptoDropdown(false);
                  setShowNetworkDropdown(false);
                }}
                className={`w-full flex items-center justify-between gap-2 border rounded-full h-8 px-3 transition-colors ${showAssetDropdown ? "border-black bg-white" : "border-transparent bg-black/5 hover:bg-black/10"}`}
              >
                <div className="flex items-center gap-2">
                  <AssetIcon type={asset} />
                  <span className="text-slate-600 font-medium text-[14px] flex-1 text-left">
                    {asset}
                  </span>
                </div>
                <ChevronDown className="text-slate-400 shrink-0" size={16} />
              </button>

              {showAssetDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-black/5 py-1 z-50">
                  {["WLT", "Gcoin"].map((a) => (
                    <button
                      key={a}
                      onClick={() => {
                        setAsset(a as any);
                        setShowAssetDropdown(false);
                      }}
                      className={`flex items-center w-full px-3 py-2 hover:bg-black/5 transition-colors gap-2 ${asset === a ? "bg-black/5" : ""}`}
                    >
                      <AssetIcon type={a} />
                      <span className="text-slate-600 font-medium flex-1 text-left text-[14px]">
                        {a}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Crypto Select */}
            <div className="flex flex-col gap-1 relative shrink-0 min-w-[110px] flex-auto sm:flex-none">
              <label className="text-[13px] font-normal text-black">
                Crypto
              </label>
              <button
                onClick={() => {
                  setShowCryptoDropdown(!showCryptoDropdown);
                  setShowAssetDropdown(false);
                  setShowNetworkDropdown(false);
                }}
                className={`w-full flex items-center justify-between gap-2 border rounded-full h-8 px-3 transition-colors ${showCryptoDropdown ? "border-black bg-white" : "border-transparent bg-black/5 hover:bg-black/10"}`}
              >
                <div className="flex items-center gap-2">
                  <AssetIcon type={crypto} />
                  <span className="text-slate-600 font-medium text-[14px] flex-1 text-left">
                    {crypto}
                  </span>
                </div>
                <ChevronDown className="text-slate-400 shrink-0" size={16} />
              </button>

              {showCryptoDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-black/5 py-1 z-50">
                  {(asset === "WLT" ? ["WLT"] : ["USDC", "USDT"]).map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCrypto(c as any);
                        setShowCryptoDropdown(false);
                      }}
                      className={`flex items-center w-full px-3 py-2 hover:bg-black/5 transition-colors gap-2 ${crypto === c ? "bg-black/5" : ""}`}
                    >
                      <AssetIcon type={c} />
                      <span className="text-slate-600 font-medium flex-1 text-left text-[14px]">
                        {c}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Network Select */}
            <div className="flex flex-col gap-1 relative shrink-0 min-w-[120px] flex-auto sm:flex-none">
              <label className="text-[13px] font-normal text-black">
                Network
              </label>
              <button
                onClick={() => {
                  setShowNetworkDropdown(!showNetworkDropdown);
                  setShowAssetDropdown(false);
                  setShowCryptoDropdown(false);
                }}
                className={`w-full flex items-center justify-between gap-2 border rounded-full h-8 px-3 transition-colors ${showNetworkDropdown ? "border-black bg-white" : "border-transparent bg-black/5 hover:bg-black/10"}`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full overflow-hidden bg-[#555] flex items-center justify-center p-0.5 shrink-0 line-clamp-1">
                    {currentNetworks.find((n) => n.id === network)?.logo ? (
                      <img
                        src={
                          currentNetworks.find((n) => n.id === network)?.logo
                        }
                        alt={network}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-[#F3BA2F] font-bold text-[8px]">
                        {network}
                      </span>
                    )}
                  </div>
                  <span className="text-slate-600 font-medium text-[14px] flex-1 text-left line-clamp-1 truncate">
                    {
                      currentNetworks
                        .find((n) => n.id === network)
                        ?.name.toUpperCase()
                        .split(" ")[0]
                    }
                  </span>
                </div>
                <ChevronDown className="text-slate-400 shrink-0" size={16} />
              </button>

              {showNetworkDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-black/5 py-1 z-50">
                  {currentNetworks.map((net) => (
                    <button
                      key={net.id}
                      onClick={() => {
                        setNetwork(net.id);
                        setShowNetworkDropdown(false);
                      }}
                      className={`flex items-center w-full px-3 py-2 hover:bg-black/5 transition-colors gap-3 ${network === net.id ? "bg-black/5" : ""}`}
                    >
                      <div className="w-6 h-6 rounded-full overflow-hidden bg-[#555] flex items-center justify-center p-0.5 shrink-0">
                        {net.logo ? (
                          <img
                            src={net.logo}
                            alt={net.id}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <span className="text-[#F3BA2F] font-bold text-[8px]">
                            {net.id}
                          </span>
                        )}
                      </div>
                      <span className="text-slate-600 font-medium text-[14px] text-left">
                        {net.name.toUpperCase()}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl items-start">
        <div className="flex-1 w-full max-w-2xl">
          {rightColumnContent}

          <div className="bg-[#f0f2f5] rounded-3xl py-2 px-6 flex flex-col mt-2 md:mt-2">
            <div className="flex flex-col">
              <div
                className="flex flex-col cursor-pointer"
                onClick={() => setFaqExpanded(!faqExpanded)}
              >
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-2">
                    <HelpCircle size={18} className="text-black/50" />
                    <span className="text-[14px] font-semibold text-black">
                      What is the network fee?
                    </span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-black/50 transition-transform ${faqExpanded ? "rotate-180" : ""}`}
                  />
                </div>
                {faqExpanded && (
                  <span className="text-[12px] text-black/50 leading-relaxed pb-3 pt-1">
                    The network fee is a small amount of crypto required to
                    process your transaction on the blockchain.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Processing Status - Right space (Desktop inline, Mobile is Portaled below) */}
        <div className="hidden md:flex flex-col w-full md:w-[320px] shrink-0 gap-2 mt-4 md:mt-0 relative inset-auto bg-[#f0f2f5] rounded-3xl p-6 shadow-sm overflow-visible">
          <h3 className="text-[16px] font-bold text-black mb-4 flex items-center gap-2">
            <Activity size={18} className="text-black/50" />
            Processing Status
          </h3>
          <div className="flex flex-col gap-4 relative">
            <div className="absolute left-[11px] top-4 bottom-4 w-[2px] bg-black/10 z-0"></div>

            <div className="flex gap-4 relative z-10">
              <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center shrink-0 border-2 border-[#f0f2f5]">
                <div className="w-1.5 h-1.5 rounded-full bg-black/20"></div>
              </div>
              <div className="flex flex-col mt-0.5">
                <span className="text-[13px] font-bold text-black/40">
                  Request Submitted
                </span>
                <span className="text-[12px] text-black/50 mt-0.5">
                  Your transaction has been submitted
                </span>
              </div>
            </div>

            <div className="flex gap-4 relative z-10">
              <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center shrink-0 border-2 border-[#f0f2f5]">
                <div className="w-1.5 h-1.5 rounded-full bg-black/20"></div>
              </div>
              <div className="flex flex-col mt-0.5">
                <span className="text-[13px] font-bold text-black/40">
                  Network Confirming
                </span>
                <span className="text-[12px] text-black/30 mt-0.5">
                  Awaiting blockchain confirmations
                </span>
              </div>
            </div>

            <div className="flex gap-4 relative z-10">
              <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center shrink-0 border-2 border-[#f0f2f5]">
                <div className="w-1.5 h-1.5 rounded-full bg-black/20"></div>
              </div>
              <div className="flex flex-col mt-0.5">
                <span className="text-[13px] font-bold text-black/40">
                  Completed
                </span>
                <span className="text-[12px] text-black/30 mt-0.5">
                  Funds processed successfully
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Processing Status Overlay */}
      {showStatus &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="md:hidden">
            <div
              className="fixed inset-0 bg-black/20 z-[9990] backdrop-blur-sm"
              onClick={() => setShowStatus(false)}
            />
            <div className="fixed inset-x-0 bottom-0 z-[9991] bg-white p-6 pt-4 rounded-t-3xl shadow-[0_-20px_40px_rgba(0,0,0,0.15)] max-h-[80vh] overflow-y-auto flex flex-col">
              <div
                className="w-12 h-1.5 bg-black/10 rounded-full mx-auto mb-6 shrink-0 cursor-pointer"
                onClick={() => setShowStatus(false)}
              />
              <h3 className="text-[16px] font-bold text-black mb-4 flex items-center gap-2">
                <Activity size={18} className="text-black/50" />
                Processing Status
              </h3>
              <div className="flex flex-col gap-4 relative">
                <div className="absolute left-[11px] top-4 bottom-4 w-[2px] bg-black/10 z-0"></div>

                <div className="flex gap-4 relative z-10">
                  <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center shrink-0 border-2 border-white">
                    <div className="w-1.5 h-1.5 rounded-full bg-black/20"></div>
                  </div>
                  <div className="flex flex-col mt-0.5">
                    <span className="text-[13px] font-bold text-black/40">
                      Request Submitted
                    </span>
                    <span className="text-[12px] text-black/50 mt-0.5">
                      Your transaction has been submitted
                    </span>
                  </div>
                </div>

                <div className="flex gap-4 relative z-10">
                  <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center shrink-0 border-2 border-white">
                    <div className="w-1.5 h-1.5 rounded-full bg-black/20"></div>
                  </div>
                  <div className="flex flex-col mt-0.5">
                    <span className="text-[13px] font-bold text-black/40">
                      Network Confirming
                    </span>
                    <span className="text-[12px] text-black/30 mt-0.5">
                      Awaiting blockchain confirmations
                    </span>
                  </div>
                </div>

                <div className="flex gap-4 relative z-10">
                  <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center shrink-0 border-2 border-white">
                    <div className="w-1.5 h-1.5 rounded-full bg-black/20"></div>
                  </div>
                  <div className="flex flex-col mt-0.5">
                    <span className="text-[13px] font-bold text-black/40">
                      Completed
                    </span>
                    <span className="text-[12px] text-black/30 mt-0.5">
                      Funds processed successfully
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
