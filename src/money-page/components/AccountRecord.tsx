import React, { useState, useCallback, useRef, useEffect } from "react";
import { ChevronDown, Activity, Inbox, Loader2 } from "lucide-react";

interface AccountRecordProps {
  isDesktop?: boolean;
  userAccount?: string | null;
}

const CATEGORIES = [
  "All Category",
  "Buy",
  "Deposit",
  "Play",
  "Refund",
  "Reward",
  "Sell",
  "Staking",
  "Win",
  "Withdraw",
];

const CURRENCIES = ["All Assets", "Bonus", "Gcoin", "ICP", "WLT"];

const TIMES = [
  "All Time",
  "Jun 2026",
  "May 2026",
  "Apr 2026",
  "Mar 2026",
  "Feb 2026",
];

const INITIAL_MOCK_RECORDS = [
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
    type: "Buy",
    detail: "ICP → Gcoin",
    usdAmount: "+$0.00",
    tokenAmount: "10.00 Gcoin",
    date: "2026.05.28 10:00:00",
  },
  {
    type: "Sell",
    detail: "Gcoin → WLT",
    usdAmount: "+$0.00",
    tokenAmount: "10.00 WLT",
    date: "2026.05.27 18:00:00",
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

export function AccountRecord({ isDesktop, userAccount }: AccountRecordProps) {
  const [timeFilter, setTimeFilter] = useState("All Time");
  const [categoryFilter, setCategoryFilter] = useState("All Category");
  const [currencyFilter, setCurrencyFilter] = useState("All Assets");

  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".dropdown-container")) {
        setShowTimeDropdown(false);
        setShowCategoryDropdown(false);
        setShowCurrencyDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const [records, setRecords] = useState(INITIAL_MOCK_RECORDS);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Filter records by category
  const filteredRecords =
    categoryFilter === "All Category"
      ? records
      : records.filter((r) => r.type === categoryFilter);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
      if (
        scrollHeight - scrollTop <= clientHeight + 10 &&
        !isLoadingMore &&
        hasMore &&
        userAccount
      ) {
        setIsLoadingMore(true);
        // Simulate network request for paginated data
        setTimeout(() => {
          setRecords((prev) => [...prev, ...INITIAL_MOCK_RECORDS]);
          setIsLoadingMore(false);
          // Let's cap it at a few reloads for mock
          if (records.length > 20) {
            setHasMore(false);
          }
        }, 800);
      }
    },
    [isLoadingMore, hasMore, userAccount, records.length],
  );

  const formatAmount = (num: number, isPositive: boolean) => {
    if (!userAccount) return "-";
    const sign = num === 0 ? "" : isPositive ? "+" : "-";
    if (currencyFilter === "All Assets") {
      return `${sign}$${num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else {
      if (num >= 1000) {
        return `${sign}${(num / 1000).toFixed(1).replace(/\.0$/, "")}K`;
      }
      return `${sign}${num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
  };

  return (
    <div
      className={`flex flex-col w-full h-full ${isDesktop ? "px-2 pb-2" : ""}`}
    >
      <div className="flex flex-col gap-6 pb-6 relative z-0 h-full">
        {/* Top Section: Filters + Summary */}
        <div className="flex flex-col bg-[#f0f2f5] rounded-2xl p-4 sm:p-5 border border-black/5 gap-4 shrink-0">
          {/* Time & Currency Filters */}
          <div className="flex items-center gap-4 relative w-full overflow-visible z-10">
            {/* Time Filter */}
            <div className="relative dropdown-container min-w-[120px]">
              <button
                onClick={() => {
                  setShowTimeDropdown(!showTimeDropdown);
                  setShowCategoryDropdown(false);
                  setShowCurrencyDropdown(false);
                }}
                className="relative flex items-center justify-center w-full bg-black/5 hover:bg-black/10 px-8 py-2 rounded-xl text-[13px] text-black transition-colors"
              >
                <span className="truncate text-center">{timeFilter}</span>
                <ChevronDown
                  size={14}
                  className="absolute right-3 text-black/40"
                />
              </button>
              {showTimeDropdown && (
                <div className="absolute top-full left-0 mt-1 w-full flex flex-col bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-black/5 py-1 z-50 max-h-[250px] overflow-y-auto overflow-x-hidden">
                  {TIMES.map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setTimeFilter(t);
                        setShowTimeDropdown(false);
                        setRecords(INITIAL_MOCK_RECORDS);
                        setHasMore(true);
                      }}
                      className={`w-full text-center px-3 py-2 text-[13px] hover:bg-black/5 ${timeFilter === t ? "bg-black/5 text-black font-semibold" : "text-black/70"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Currency Filter */}
            <div className="relative dropdown-container min-w-[120px]">
              <button
                onClick={() => {
                  setShowCurrencyDropdown(!showCurrencyDropdown);
                  setShowTimeDropdown(false);
                  setShowCategoryDropdown(false);
                }}
                className="relative flex items-center justify-center w-full bg-black/5 hover:bg-black/10 px-8 py-2 rounded-xl text-[13px] text-black transition-colors"
              >
                <span className="truncate text-center">{currencyFilter}</span>
                <ChevronDown
                  size={14}
                  className="absolute right-3 text-black/40"
                />
              </button>
              {showCurrencyDropdown && (
                <div className="absolute top-full left-0 mt-1 w-full flex flex-col bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-black/5 py-1 z-50 overflow-hidden">
                  {CURRENCIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCurrencyFilter(c);
                        setShowCurrencyDropdown(false);
                        setRecords(INITIAL_MOCK_RECORDS);
                        setHasMore(true);
                      }}
                      className={`w-full text-center px-3 py-2 text-[13px] hover:bg-black/5 ${currencyFilter === c ? "bg-black/5 text-black font-semibold" : "text-black/70"}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Stats Grid (2 columns) */}
          <div className="grid grid-cols-2 gap-x-6 pt-2 border-t border-black/5 relative z-0 md:hidden">
            {/* Left Column: Income */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-sm mb-1">
                <span className="text-black font-semibold">Income</span>
                <span className="text-black font-semibold">
                  {formatAmount(1976.63, true)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm pl-2">
                <span className="text-black/50">Buy</span>
                <span className="text-black font-medium">
                  {formatAmount(0.0, true)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm pl-2">
                <span className="text-black/50">Deposit</span>
                <span className="text-black font-medium">
                  {formatAmount(1184.55, true)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm pl-2">
                <span className="text-black/50">Refund</span>
                <span className="text-black font-medium">
                  {formatAmount(0.67, true)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm pl-2">
                <span className="text-black/50">Reward</span>
                <span className="text-black font-medium">
                  {formatAmount(100.0, true)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm pl-2">
                <span className="text-black/50">Win</span>
                <span className="text-black font-medium">
                  {formatAmount(691.41, true)}
                </span>
              </div>
            </div>

            {/* Right Column: Spending */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-sm mb-1">
                <span className="text-black font-semibold">Spending</span>
                <span className="text-black font-semibold">
                  {formatAmount(1969.26, false)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm pl-2">
                <span className="text-black/50">Play</span>
                <span className="text-black font-medium">
                  {formatAmount(773.32, false)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm pl-2">
                <span className="text-black/50">Sell</span>
                <span className="text-black font-medium">
                  {formatAmount(0.0, false)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm pl-2">
                <span className="text-black/50">Staking</span>
                <span className="text-black font-medium">
                  {formatAmount(900.23, false)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm pl-2">
                <span className="text-black/50">Withdraw</span>
                <span className="text-black font-medium">
                  {formatAmount(295.71, false)}
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Stats Grid (4 columns) */}
          <div className="hidden md:grid grid-cols-4 gap-x-6 gap-y-4 pt-2 border-t border-black/5 relative z-0">
            {/* Col 1: Income total + Buy */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-sm mb-1">
                <span className="text-black font-semibold">Income</span>
                <span className="text-black font-semibold">
                  {formatAmount(1976.63, true)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm pl-2">
                <span className="text-black/50">Buy</span>
                <span className="text-black font-medium">
                  {formatAmount(0.0, true)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm pl-2">
                <span className="text-black/50">Deposit</span>
                <span className="text-black font-medium">
                  {formatAmount(1184.55, true)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm pl-2">
                <span className="text-black/50">Refund</span>
                <span className="text-black font-medium">
                  {formatAmount(0.67, true)}
                </span>
              </div>
            </div>

            {/* Col 2: Income rest */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-sm mb-1 opacity-0 pointer-events-none hidden md:flex">
                <span className="text-black font-semibold">Placeholder</span>
                <span className="text-black font-semibold">-</span>
              </div>
              <div className="flex justify-between items-center text-sm pl-2">
                <span className="text-black/50">Reward</span>
                <span className="text-black font-medium">
                  {formatAmount(100.0, true)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm pl-2">
                <span className="text-black/50">Win</span>
                <span className="text-black font-medium">
                  {formatAmount(691.41, true)}
                </span>
              </div>
            </div>

            {/* Col 3: Spending total + Play */}
            <div className="flex flex-col gap-3 mt-4 md:mt-0">
              <div className="flex justify-between items-center text-sm mb-1">
                <span className="text-black font-semibold">Spending</span>
                <span className="text-black font-semibold">
                  {formatAmount(1969.26, false)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm pl-2">
                <span className="text-black/50">Play</span>
                <span className="text-black font-medium">
                  {formatAmount(773.32, false)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm pl-2">
                <span className="text-black/50">Sell</span>
                <span className="text-black font-medium">
                  {formatAmount(0.0, false)}
                </span>
              </div>
            </div>

            {/* Col 4: Spending rest */}
            <div className="flex flex-col gap-3 mt-4 md:mt-0">
              <div className="flex justify-between items-center text-sm mb-1 opacity-0 pointer-events-none hidden md:flex">
                <span className="text-black font-semibold">Placeholder</span>
                <span className="text-black font-semibold">-</span>
              </div>
              <div className="flex justify-between items-center text-sm pl-2">
                <span className="text-black/50">Staking</span>
                <span className="text-black font-medium">
                  {formatAmount(900.23, false)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm pl-2">
                <span className="text-black/50">Withdraw</span>
                <span className="text-black font-medium">
                  {formatAmount(295.71, false)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detail Zone */}
        <div className="flex-1 flex flex-col bg-[#f0f2f5] rounded-2xl p-4 sm:p-5 border border-black/5 min-h-0 relative z-0">
          <div className="flex items-center justify-between mb-4 shrink-0 relative z-10 w-full overflow-visible">
            <h3 className="text-[16px] font-bold text-black shrink-0">
              Detail
            </h3>
            {/* Category Filter */}
            <div className="relative dropdown-container min-w-[120px]">
              <button
                onClick={() => {
                  setShowCategoryDropdown(!showCategoryDropdown);
                  setShowTimeDropdown(false);
                  setShowCurrencyDropdown(false);
                }}
                className="relative flex items-center justify-center w-full bg-black/5 hover:bg-black/10 px-8 py-2 rounded-xl text-[13px] text-black transition-colors"
              >
                <span className="truncate text-center">{categoryFilter}</span>
                <ChevronDown
                  size={14}
                  className="absolute right-3 text-black/40"
                />
              </button>
              {showCategoryDropdown && (
                <div className="absolute top-full right-0 mt-1 w-full flex flex-col bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-black/5 py-1 z-50 max-h-[250px] overflow-y-auto overflow-x-hidden">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCategoryFilter(c);
                        setShowCategoryDropdown(false);
                        setRecords(INITIAL_MOCK_RECORDS);
                        setHasMore(true);
                      }}
                      className={`w-full text-center px-3 py-2 text-[13px] hover:bg-black/5 ${categoryFilter === c ? "bg-black/5 text-black font-semibold" : "text-black/70"}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div
            className="flex flex-col flex-1 overflow-y-auto hide-scrollbar relative z-0"
            onScroll={handleScroll}
          >
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
            ) : filteredRecords.length === 0 ? (
              <div className="flex flex-col items-center justify-center flex-1 min-h-[250px] opacity-30">
                <span className="text-[14px] font-medium text-black">
                  No matches found
                </span>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredRecords.map((record, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center pb-4 border-b border-black/5 last:border-0 last:pb-0"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-[15px] font-semibold text-black flex items-center gap-2">
                        {record.type}
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
                      {(record.game || record.detail) && (
                        <div className="flex items-center gap-2">
                          {record.game && (
                            <span className="text-[12px] font-normal text-black/40 uppercase">
                              {record.game === "Staking" ? "CODE: STAKING REWARDS" : `CODE: ${record.game}`}
                            </span>
                          )}
                          {record.detail && (
                            <span className="text-[12px] font-normal text-black/40">
                              {record.detail}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isLoadingMore && (
                  <div className="flex justify-center items-center py-4 text-black/40">
                    <Loader2 size={24} className="animate-spin" />
                  </div>
                )}

                {!hasMore && filteredRecords.length > 0 && (
                  <div className="flex justify-center items-center pt-2 pb-4 text-black/40 text-[13px] font-medium">
                    No more records
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
