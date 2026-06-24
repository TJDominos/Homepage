import React, { useState, useEffect, useRef } from "react";
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
    name: "SOL",
    time: "≈ 1 mins",
    confirmations: "1 Confirmation/s",
    logo: "/solana-sol-logo-horizontal.svg",
    isPaused: false,
  },
  {
    id: "ETH",
    name: "ETH (ERC20)",
    time: "≈ 2 mins",
    confirmations: "6 Confirmation/s",
    logo: "/ethereum-eth-logo-full-horizontal.svg",
    isPaused: false,
  },
  {
    id: "BSC",
    name: "BSC (BEP20)",
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
  const [faqExpanded, setFaqExpanded] = useState(false);
  const [expandedTx, setExpandedTx] = useState<string | null>(null);

  const dropdownsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownsRef.current &&
        !dropdownsRef.current.contains(event.target as Node)
      ) {
        setShowAssetDropdown(false);
        setShowCryptoDropdown(false);
        setShowNetworkDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [txs, setTxs] = useState([
    {
      id: "1",
      date: "2026-06-23",
      time: "16:45:10",
      amount: "-50.00",
      currency: "USDC",
      status: "Completed",
      network: "SOL",
      address: "8x8eF3a2M1kP5rT7qY9wN2bX4zL6cK8j",
      txid: "4xAb2cK8jL6hF2dN8cK3vM1zX5qT8jP4xL6hF2d",
    },
    {
      id: "2",
      date: "2026-06-21",
      time: "11:20:05",
      amount: "-200.00",
      currency: "WLT",
      status: "Failed",
      network: "BSC",
      address: "0x1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q",
      txid: "0x9a8b7c6d5e4f3g2h1i0j9k8l7m6n5o4p3q2r1s0t9u8v7w6x5y4z",
    },
  ]);

  const totalPages = Math.ceil(txs.length / itemsPerPage);
  const paginatedTxs = txs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const getExplorerUrl = (
    network: string,
    type: "tx" | "address",
    value: string,
  ) => {
    if (network === "ETH") {
      return type === "tx"
        ? `https://etherscan.io/tx/${value}`
        : `https://etherscan.io/address/${value}`;
    }
    if (network === "SOL") {
      return type === "tx"
        ? `https://solscan.io/tx/${value}`
        : `https://solscan.io/account/${value}`;
    }
    return type === "tx"
      ? `https://bscscan.com/tx/${value}`
      : `https://bscscan.com/address/${value}`;
  };

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
    <div className="flex flex-col mt-1 mb-1 w-full max-w-2xl mx-auto">
      <div className="bg-[#EAEAEA] rounded-3xl p-5 md:p-6 flex flex-col w-full shadow-sm">
        <div className="flex flex-col gap-2 mb-6">
          <label className="text-[15px] font-semibold text-black">
            Withdraw Address
          </label>
          <div className="w-full">
            <AddressInput value={address} onChange={setAddress} />
          </div>
        </div>

        <div className="flex flex-col mb-2 w-full">
          <label className="text-[15px] font-semibold text-black mb-1.5">
            Withdraw Amount
          </label>
          <div className="flex items-center gap-1 sm:gap-2 w-full">
            <input
              type="text"
              placeholder="Minimum 20"
              value={amount}
              onChange={(e) => {
                let val = e.target.value.replace(/,/g, "");
                if (val === "") {
                  setAmount("");
                  return;
                }
                if (!/^\d*\.?\d*$/.test(val)) return;
                const parts = val.split(".");
                if (parts.length > 2) return;
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                setAmount(parts.join("."));
              }}
              className="flex-1 min-w-0 bg-black/5 border border-transparent rounded-full px-3 sm:px-4 h-8 outline-none text-[14px] text-black placeholder-black/40 transition-all font-medium focus:border-black focus:bg-transparent"
            />
            <div className="bg-black/5 border border-transparent px-3 sm:px-4 h-8 flex items-center justify-center rounded-full text-black/40 text-[14px] font-medium shrink-0">
              {asset}
            </div>
            <button className="bg-[#111] hover:bg-black text-white px-4 sm:px-5 h-8 flex items-center justify-center rounded-full text-[14px] font-bold transition-all shrink-0">
              Max
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-x-1 gap-y-0.5 text-[12px] text-black/65 font-normal px-2 mt-1">
            <span className="whitespace-nowrap">
              Balance: {asset === "WLT" ? "0.00" : "123.3K"} {asset}
            </span>
            <span className="hidden sm:inline">,</span>
            <span className="whitespace-nowrap mx-1">
              Network fee: 0.5 {crypto}
            </span>
            <div className="w-4 h-4 rounded-full bg-black/10 flex items-center justify-center ml-1 text-[10px] shrink-0 font-bold text-black/50">
              ?
            </div>
          </div>

          {asset === "WLT" && (
            <div className="text-[12px] text-[#6A3FE6] font-medium px-2 mt-1 leading-snug">
              30-day lockup + 360-day linear vesting on WLT withdrawal.
            </div>
          )}
        </div>

        {parseFloat(amount.replace(/,/g, "") || "0") >
          (asset === "WLT" ? 0 : 123322) && (
          <div className="text-red-500 font-medium text-[13px] px-2 mb-4">
            Insufficient balance
          </div>
        )}

        <div
          className={`${parseFloat(amount.replace(/,/g, "") || "0") > (asset === "WLT" ? 0 : 123322) ? "mt-2" : "mt-6"}`}
        >
          <button
            className="w-[120px] h-[40px] flex items-center justify-center mx-auto bg-[#111] hover:bg-black text-white font-bold rounded-full shadow-sm transition-all text-[15px] mb-4"
            onClick={() => {
              if (amount && address) {
                const newTx = {
                  id: Date.now().toString(),
                  date: new Date().toISOString().split("T")[0],
                  time: new Date().toISOString().split("T")[1].substring(0, 8),
                  amount: `-${amount}`,
                  currency: crypto,
                  status: "Processing",
                  network: network,
                  address: address,
                  txid: "Pending...",
                };
                setTxs([newTx, ...txs]);
                setAmount("");
                setAddress("");
                setCurrentPage(1);
              }
              setShowAssetDropdown(false);
              setShowCryptoDropdown(false);
              setShowNetworkDropdown(false);
            }}
          >
            Withdraw
          </button>
        </div>

        <div className="flex flex-col items-center text-center gap-1 px-2 mt-2">
          <a
            href="mailto:support@randseed.org"
            className="text-black/60 hover:text-black hover:underline font-medium text-[13px] underline decoration-black/30 underline-offset-4"
          >
            support@randseed.org
          </a>
          <p className="text-[12px] text-black/40 font-medium leading-relaxed max-w-[90%] mx-auto">
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
          <div
            className="flex flex-wrap items-start gap-4 relative z-20 pb-1 w-full"
            ref={dropdownsRef}
          >
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

      <div className="flex flex-col md:flex-row gap-2 md:gap-6 w-full max-w-5xl items-start">
        <div className="flex-1 w-full max-w-2xl">{rightColumnContent}</div>

        {/* Right Column: Transactions and FAQ */}
        <div className="flex flex-col w-full md:w-[320px] shrink-0 gap-1">
          {/* Transactions - Always inline on mobile and desktop */}
          <div className="flex flex-col relative inset-auto bg-[#f0f2f5] rounded-3xl p-6 shadow-sm overflow-visible h-fit">
            <h3 className="text-[16px] font-bold text-black mb-4 flex items-center gap-2">
              <Activity size={18} className="text-black/50" />
              Transactions
            </h3>
            <div className="flex flex-col gap-3 w-full">
              {paginatedTxs.map((tx) => (
                <div
                  key={tx.id}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-black/5 flex flex-col transition-all"
                >
                  <div
                    className="flex justify-between items-start"
                    onClick={() =>
                      setExpandedTx(expandedTx === tx.id ? null : tx.id)
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-black">
                        {tx.amount} {tx.currency}
                      </span>
                      <span className="text-[12px] text-black/50 mt-0.5">
                        {tx.date} {tx.time} · {tx.network}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      {tx.status === "Completed" && (
                        <span className="text-[12px] font-semibold text-emerald-600">
                          Completed
                        </span>
                      )}
                      {tx.status === "Failed" && (
                        <span className="text-[12px] font-semibold text-red-500">
                          Failed
                        </span>
                      )}
                      {tx.status === "Processing" && (
                        <>
                          <span className="text-[12px] font-semibold text-blue-500">
                            Processing
                          </span>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-blue-500 shrink-0"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path
                              d="M12 12L12 6"
                              className="animate-spin"
                              style={{
                                transformOrigin: "12px 12px",
                                animationDuration: "1.5s",
                                animationTimingFunction: "linear",
                              }}
                            />
                            <path d="M12 12L16 12" />
                          </svg>
                        </>
                      )}
                    </div>
                  </div>
                  {expandedTx === tx.id && (
                    <div className="flex flex-col gap-3 pt-3 border-t border-black/5 mt-3">
                      <div className="flex flex-col">
                        <span className="text-[11px] text-black/50 mb-0.5">
                          Withdrawal Address
                        </span>
                        {tx.address ? (
                          <a
                            href={getExplorerUrl(
                              tx.network,
                              "address",
                              tx.address,
                            )}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[12px] text-black font-medium break-all hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {tx.address}
                          </a>
                        ) : (
                          <span className="text-[12px] text-black font-medium break-all">
                            -
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] text-black/50 mb-0.5">
                          TxID
                        </span>
                        {tx.txid === "Pending..." ? (
                          <span className="text-[12px] text-black font-medium break-all">
                            {tx.txid}
                          </span>
                        ) : (
                          <a
                            href={getExplorerUrl(tx.network, "tx", tx.txid)}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[12px] text-blue-600 font-medium break-all hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {tx.txid}
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-black/5">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    className="px-3 py-1 bg-black/5 disabled:opacity-50 hover:bg-black/10 rounded-full text-[12px] font-medium transition-colors"
                  >
                    Prev
                  </button>
                  <span className="text-[12px] text-black/50 font-medium">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="px-3 py-1 bg-black/5 disabled:opacity-50 hover:bg-black/10 rounded-full text-[12px] font-medium transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="bg-[#f0f2f5] rounded-3xl py-2 px-6 flex flex-col mt-2 md:mt-0">
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
      </div>
    </div>
  );
}
