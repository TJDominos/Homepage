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

interface DepositTabProps {
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

export function DepositTab({ isDesktop }: DepositTabProps) {
  const { stats } = useWltPrice();
  const [asset, setAsset] = useState<"WLT" | "Gcoin">("Gcoin");
  const [crypto, setCrypto] = useState<"WLT" | "USDC" | "USDT">("USDC");
  const [network, setNetwork] = useState<string>("SOL");
  const [showNetworkDropdown, setShowNetworkDropdown] = useState(false);
  const [showAssetDropdown, setShowAssetDropdown] = useState(false);
  const [showCryptoDropdown, setShowCryptoDropdown] = useState(false);
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

  const [txs] = useState([
    {
      id: "1",
      date: "2026-06-23",
      time: "14:30:22",
      amount: "+100.00",
      currency: "USDC",
      status: "Completed",
      network: "SOL",
      fromAddress: "7aY9wR2bN8cK3vM1zX5qT8jP4xL6hF2d",
      address: "8x8eF3a2M1kP5rT7qY9wN2bX4zL6cK8j",
      txid: "4xAb2cK8jL6hF2dN8cK3vM1zX5qT8jP4xL6hF2d",
    },
    {
      id: "2",
      date: "2026-06-22",
      time: "09:15:00",
      amount: "+50.00",
      currency: "USDT",
      status: "Processing",
      network: "ETH",
      fromAddress: "0x1a2B3c4D5e6F7g8H9i0J1k2L3m4N5o6P",
      address: "0x4b2C3d4E5f6G7h8I9j0K1l2M3n4O5p6Q",
      txid: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z",
    },
    {
      id: "3",
      date: "2026-06-21",
      time: "11:20:05",
      amount: "+200.00",
      currency: "WLT",
      status: "Failed",
      network: "BSC",
      fromAddress: "0x9z8Y7x6W5v4U3t2S1r0Q9p8O7n6M5l4K",
      address: "0x1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q",
      txid: "0x9a8b7c6d5e4f3g2h1i0j9k8l7m6n5o4p3q2r1s0t9u8v7w6x5y4z",
    },
    {
      id: "4",
      date: "2026-06-20",
      time: "18:45:33",
      amount: "+150.00",
      currency: "USDC",
      status: "Completed",
      network: "SOL",
      fromAddress: "3mN4o5P6qQ7r8S9tT0u1V2wX3yZ4aB5c",
      address: "8x8eF3a2M1kP5rT7qY9wN2bX4zL6cK8j",
      txid: "2yB4cD6eF8gH0iJ2kL4mN6oP8qR0sT2u",
    },
    {
      id: "5",
      date: "2026-06-19",
      time: "10:10:10",
      amount: "+25.00",
      currency: "USDT",
      status: "Completed",
      network: "ETH",
      fromAddress: "0x2c3D4e5F6g7H8i9J0k1L2m3N4o5P6q7R",
      address: "0x4b2C3d4E5f6G7h8I9j0K1l2M3n4O5p6Q",
      txid: "0x3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z",
    },
    {
      id: "6",
      date: "2026-06-18",
      time: "15:22:45",
      amount: "+300.00",
      currency: "WLT",
      status: "Completed",
      network: "BSC",
      fromAddress: "0x4e5F6g7H8i9J0k1L2m3N4o5P6q7R8s9T",
      address: "0x1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q",
      txid: "0x5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c",
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

  const rightColumnContent = (
    <div className="flex flex-col mt-1 mb-1 w-full max-w-2xl">
      <div className="bg-[#EAEAEA] rounded-3xl p-5 md:p-6 flex flex-col w-full shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 w-full">
          <div className="flex items-center gap-2 text-[15px]">
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

          <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto">
            {/* Exchange rate note under address, above barcode */}
            <div className="flex items-center gap-2 text-black/60 text-[12px] bg-black/5 px-3 py-1.5 rounded-full font-medium shrink-0">
              {asset === "WLT" ? (
                <span>1 WLT ≈ ${stats?.price?.toFixed(4) || "0.0000"}</span>
              ) : (
                <span>1 USDC = 10 Gcoin</span>
              )}
            </div>

            {/* No Check Status button */}
          </div>
        </div>

        <div className="w-[140px] h-[140px] mx-auto bg-white rounded-xl shadow-sm mb-4 p-2.5 flex justify-center items-center">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(address)}`}
            alt="QR Code"
            className="w-full h-full object-contain"
          />
        </div>

        <p className="text-[12px] font-normal text-black/65 px-2 mb-2 text-center">
          Deposits under $1.00 won't show up until they total $1.00 or more.{" "}
          {asset === "Gcoin" &&
            "USDC auto-converts to Gcoin, withdrawable anytime as USDC. "}
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
  );

  const faqContent = (
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
                Where is my deposit?
              </span>
            </div>
            <ChevronDown
              size={16}
              className={`text-black/50 transition-transform ${faqExpanded ? "rotate-180" : ""}`}
            />
          </div>
          {faqExpanded && (
            <span className="text-[12px] text-black/50 leading-relaxed pb-3 pt-1">
              It may take a few minutes for the network to verify your deposit.
              Once verified, it will show in your balance.
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`mt-6 gap-2 flex flex-col`}>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-3">
          <h2 className="text-[16px] font-[600] text-slate-800">
            On-chain Deposit
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
          Deposit is processed through the blockchain networks Wrong address
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
                        setAsset(a as "WLT" | "Gcoin");
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
                      className={`flex items-center w-full px-4 py-3 hover:bg-black/5 transition-colors gap-3 ${network === net.id ? "bg-black/5" : ""}`}
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

      {/* Auxiliary Information */}
      <div className="flex flex-col md:flex-row gap-2 md:gap-6 w-full max-w-5xl items-start">
        <div className="flex-1 w-full max-w-2xl">
          {rightColumnContent}
          <div className="hidden md:block w-full max-w-2xl mt-2">
            {faqContent}
          </div>
        </div>

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
                          From Address
                        </span>
                        <a
                          href={getExplorerUrl(
                            tx.network,
                            "address",
                            tx.fromAddress,
                          )}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[12px] text-black font-medium break-all hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {tx.fromAddress}
                        </a>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] text-black/50 mb-0.5">
                          Deposit Address
                        </span>
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
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] text-black/50 mb-0.5">
                          TxID
                        </span>
                        <a
                          href={getExplorerUrl(tx.network, "tx", tx.txid)}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[12px] text-blue-600 font-medium break-all hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {tx.txid}
                        </a>
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

          <div className="md:hidden">{faqContent}</div>
        </div>
      </div>
    </div>
  );
}
