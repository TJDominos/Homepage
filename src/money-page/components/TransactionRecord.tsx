import React, { useState } from "react";
import { ChevronDown, Activity, Inbox } from "lucide-react";

interface TransactionRecordProps {
  isDesktop?: boolean;
  userAccount?: string | null;
}

const CATEGORIES = [
  "All Category",
  "Win",
  "Play",
  "Refund",
  "Convert",
  "Deposit",
  "Withdraw",
  "Staking",
];

const CURRENCIES = ["All Currency", "ICP", "Gcoin", "Bonus", "WLT"];

const TIMES = [
  "All Time",
  "Jun 2026",
  "May 2026",
  "Apr 2026",
  "Mar 2026",
  "Feb 2026",
];

const MOCK_RECORDS = [
  {
    type: "Win",
    game: "Plinko",
    usdAmount: "+$0.20",
    tokenAmount: "2.00 Gcoin",
    date: "2026.05.28 23:38:19",
  },
  {
    type: "Play",
    game: "Crash",
    usdAmount: "-$0.10",
    tokenAmount: "1.00 Gcoin",
    date: "2026.05.28 23:45:10",
  },
  {
    type: "Refund",
    game: "Mines",
    usdAmount: "+$0.10",
    tokenAmount: "1.00 Gcoin",
    date: "2026.05.28 22:15:00",
  },
  {
    type: "Convert",
    detail: "ICP → Gcoin",
    usdAmount: "+$0.00",
    tokenAmount: "10.00 Gcoin",
    date: "2026.05.28 10:00:00",
  },
  {
    type: "Deposit",
    usdAmount: "+$11.84",
    tokenAmount: "1.00 ICP",
    date: "2026.05.27 15:30:20",
  },
  {
    type: "Withdraw",
    usdAmount: "-$2.95",
    tokenAmount: "29.50 Gcoin",
    date: "2026.05.26 09:12:45",
  },
  {
    type: "Staking",
    usdAmount: "-$9.00",
    tokenAmount: "10.00 ICP",
    date: "2026.05.25 08:00:00",
  },
];

export function TransactionRecord({
  isDesktop,
  userAccount,
}: TransactionRecordProps) {
  const [timeFilter, setTimeFilter] = useState("All Time");
  const [categoryFilter, setCategoryFilter] = useState("All Category");
  const [currencyFilter, setCurrencyFilter] = useState("All Currency");

  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  return (
    <div
      className={`flex flex-col w-full h-full ${isDesktop ? "px-2 pb-2" : ""}`}
    >
      <div
        className={`flex ${isDesktop ? "flex-row gap-6" : "flex-col gap-6"} pb-6 relative z-0`}
      >
        {/* Left Column (Filters + Summary) */}
        <div
          className={`flex flex-col gap-4 shrink-0 ${isDesktop ? "w-1/2" : "w-full"}`}
        >
          {/* Filters */}
          <div className="flex items-center gap-2 relative z-10 w-full overflow-visible">
            {/* Time Filter */}
            <div className="relative flex-1 min-w-0">
              <button
                onClick={() => {
                  setShowTimeDropdown(!showTimeDropdown);
                  setShowCategoryDropdown(false);
                  setShowCurrencyDropdown(false);
                }}
                className="flex w-full items-center justify-between gap-1 bg-black/5 hover:bg-black/10 px-3 py-2 rounded-xl text-[13px] text-black transition-colors"
              >
                <span className="truncate">{timeFilter}</span>
                <ChevronDown size={14} className="text-black/40 shrink-0" />
              </button>
              {showTimeDropdown && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-black/5 py-1 z-50 max-h-[250px] overflow-y-auto">
                  {TIMES.map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setTimeFilter(t);
                        setShowTimeDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-[13px] hover:bg-black/5 ${timeFilter === t ? "bg-black/5 text-black font-semibold" : "text-black/70"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Category Filter */}
            <div className="relative flex-1 min-w-0">
              <button
                onClick={() => {
                  setShowCategoryDropdown(!showCategoryDropdown);
                  setShowTimeDropdown(false);
                  setShowCurrencyDropdown(false);
                }}
                className="flex w-full items-center justify-between gap-1 bg-black/5 hover:bg-black/10 px-3 py-2 rounded-xl text-[13px] text-black transition-colors"
              >
                <span className="truncate">{categoryFilter}</span>
                <ChevronDown size={14} className="text-black/40 shrink-0" />
              </button>
              {showCategoryDropdown && (
                <div className="absolute top-full left-0 mt-1 w-[160px] bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-black/5 py-1 z-50 max-h-[250px] overflow-y-auto">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCategoryFilter(c);
                        setShowCategoryDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-[13px] hover:bg-black/5 ${categoryFilter === c ? "bg-black/5 text-black font-semibold" : "text-black/70"}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Currency Filter */}
            <div className="relative flex-1 min-w-0">
              <button
                onClick={() => {
                  setShowCurrencyDropdown(!showCurrencyDropdown);
                  setShowTimeDropdown(false);
                  setShowCategoryDropdown(false);
                }}
                className="flex w-full items-center justify-between gap-1 bg-black/5 hover:bg-black/10 px-3 py-2 rounded-xl text-[13px] text-black transition-colors"
              >
                <span className="truncate">{currencyFilter}</span>
                <ChevronDown size={14} className="text-black/40 shrink-0" />
              </button>
              {showCurrencyDropdown && (
                <div className="absolute top-full right-0 mt-1 w-full bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-black/5 py-1 z-50">
                  {CURRENCIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCurrencyFilter(c);
                        setShowCurrencyDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-[13px] hover:bg-black/5 ${currencyFilter === c ? "bg-black/5 text-black font-semibold" : "text-black/70"}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-[#f0f2f5] rounded-2xl p-4 sm:p-5 border border-black/5 w-full">
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              {/* Left Column Stats */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center text-sm mb-1">
                  <span className="text-black font-semibold">Income</span>
                  <span className="text-black font-semibold">
                    {userAccount ? "+1976.63" : "-"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm pl-2">
                  <span className="text-black/50">Win</span>
                  <span className="text-black font-medium">
                    {userAccount ? "+691.41" : "-"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm pl-2">
                  <span className="text-black/50">Deposit</span>
                  <span className="text-black font-medium">
                    {userAccount ? "+1184.55" : "-"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm pl-2">
                  <span className="text-black/50">Reward</span>
                  <span className="text-black font-medium">
                    {userAccount ? "+100.00" : "-"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm pl-2">
                  <span className="text-black/50">Refund</span>
                  <span className="text-black font-medium">
                    {userAccount ? "+0.67" : "-"}
                  </span>
                </div>
              </div>

              {/* Right Column Stats */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center text-sm mb-1">
                  <span className="text-black font-semibold">Spending</span>
                  <span className="text-black font-semibold">
                    {userAccount ? "-1969.26" : "-"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm pl-2">
                  <span className="text-black/50">Play</span>
                  <span className="text-black font-medium">
                    {userAccount ? "-773.32" : "-"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm pl-2">
                  <span className="text-black/50">Withdraw</span>
                  <span className="text-black font-medium">
                    {userAccount ? "-295.71" : "-"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm pl-2">
                  <span className="text-black/50">Staking</span>
                  <span className="text-black font-medium">
                    {userAccount ? "-900.23" : "-"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm pl-2">
                  <span className="text-black/50">Convert</span>
                  <span className="text-black font-medium">
                    {userAccount ? "0.00" : "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Detail List) */}
        <div className="flex-1 flex flex-col bg-[#f0f2f5] rounded-2xl p-4 sm:p-5 border border-black/5">
          <h3 className="text-[16px] font-bold text-black mb-4 shrink-0">
            Detail
          </h3>
          <div className="flex flex-col flex-1 overflow-y-auto hide-scrollbar space-y-4">
            {!userAccount ? (
              <div className="flex flex-col items-center justify-center flex-1 min-h-[250px] opacity-30">
                <Inbox
                  size={32}
                  strokeWidth={1.5}
                  className="mb-3 text-black"
                />
                <span className="text-[14px] font-medium text-black">
                  No Information
                </span>
              </div>
            ) : (
              MOCK_RECORDS.map((record, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center pb-4 border-b border-black/5 last:border-0 last:pb-0"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-[15px] font-semibold text-black flex items-center gap-2">
                      {record.type}
                      {record.game && (
                        <span className="text-[12px] font-normal text-black/40 bg-black/5 px-2 py-0.5 rounded-full">
                          {record.game}
                        </span>
                      )}
                      {record.detail && (
                        <span className="text-[12px] font-normal text-black/40 bg-black/5 px-2 py-0.5 rounded-full">
                          {record.detail}
                        </span>
                      )}
                    </span>
                    <span className="text-[13px] text-black/40">
                      {record.date}
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={`text-[14px] font-medium ${record.usdAmount.startsWith("+") ? "text-green-600" : "text-black/60"}`}
                    >
                      {record.usdAmount}/{record.tokenAmount}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
