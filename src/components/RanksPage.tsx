import React, { useEffect, useState } from "react";
import { usePagination } from "../hooks/usePagination";
import { pay_center, user } from "../api/ranksMock";
import { COUNTRY_REGION_LIST } from "./country-region";
import { getSysAvatar } from "../utils/avatar";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  ChevronDown,
} from "lucide-react";
import { AccountInfoModal, UserProfileInfo } from "./AccountInfoModal";

function formatBonusAmount(amount: string | number | undefined) {
  if (!amount) return "0.00";
  const num = Number(amount);
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(2) + "K";
  }
  return num.toFixed(2);
}

export default function RanksPage() {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProfileInfo | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subTab, setSubTab] = useState("Bonus");
  const [timeFilter, setTimeFilter] = useState("Today");
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".dropdown-container")) {
        setIsTimeDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    canGoToNextPage,
    canGoToPreviousPage,
    pageNumbers,
  } = usePagination({
    totalItems,
    itemsPerPage,
    initialPage: 1,
  });

  async function getWinners(page = 1, page_size = 10) {
    try {
      setLoading(true);
      const winners = await pay_center.get_winners(
        [BigInt(page)],
        [BigInt(page_size)],
      );
      setList(winners.rankings || []);
      setTotalItems(Number(winners.total_winners) || 0);
    } catch (error) {
      console.error("Failed to fetch winners list:", error);
      setList([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  }

  function getAvatar(avatar: string) {
    return getSysAvatar(avatar);
  }

  function getCountryName(short_code: string) {
    if (!short_code) {
      return "Unknown";
    }
    const country = COUNTRY_REGION_LIST.find(
      (item) => item.abbreviation2.toLowerCase() === short_code.toLowerCase(),
    );
    return country?.name || short_code || "Unknown";
  }

  function getFlagEmoji(short_code: string) {
    if (!short_code || short_code.toUpperCase() === "UNKNOWN") return "🏳️";
    const code = short_code.substring(0, 2).toUpperCase();
    const codePoints = code
      .split("")
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  }

  function getCountryFlagImg(short_code: string) {
    if (!short_code || short_code.toUpperCase() === "UNKNOWN") return null;
    const code = short_code.substring(0, 2).toLowerCase();
    return `https://flagcdn.com/w40/${code}.png`;
  }

  function formatUserName(user_name: string) {
    if (!user_name) {
      return "-";
    }
    return user_name.length > 10 ? user_name.slice(0, 10) + "..." : user_name;
  }

  const handleUserClick = (winner: any) => {
    if (!winner.user_info) return;

    const profileInfo: UserProfileInfo = {
      avatarUrl: getAvatar(winner.user_info.logo || "01"),
      username: formatUserName(winner.user_info.user_name),
      isVerified: true,
      hasStake: true,
      lastActive: "",
      bio: "",
      location: `${getFlagEmoji(winner.user_info.country?.[0])} ${getCountryName(winner.user_info.country?.[0])}`,
      joinedDate: winner.user_info.create_time
        ? `Joined ${new Date(Number(winner.user_info.create_time / 1000000n)).toLocaleDateString()}`
        : "N/A",
    };

    setSelectedUser(profileInfo);
    setIsModalOpen(true);
  };

  useEffect(() => {
    getWinners(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    goToPage(page);
  };

  useEffect(() => {
    if (list.length > 0 && !list[0].user_info) {
      list.forEach(async (winner: any, index: number) => {
        try {
          const user_info = await user.query_user_by_principal_id(
            winner.principal_id,
          );
          if (list[index].user_info) {
            return;
          }
          setList((prevList) => {
            const newList = [...prevList];
            if (newList[index]) {
              newList[index] = { ...newList[index], user_info: user_info[0] };
            }
            return newList;
          });
        } catch (error) {
          console.error(
            `Failed to fetch user info for ${winner.principal_id}:`,
            error,
          );
        }
      });
    }
  }, [list]);

  return (
    <div className="w-full max-w-[1024px] mx-auto px-4 pt-4 pb-4 fade-in-up">
      <div className="mb-4">
        <h1 className="text-[16px] font-bold text-black mb-3 text-left">
          Winnings & Rewards
        </h1>
        <div className="flex flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {["Bonus", "WLT", "Gcoin"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSubTab(tab)}
                className={`w-[60px] sm:w-[80px] h-[28px] rounded-2xl text-[12px] sm:text-sm font-medium transition-colors flex items-center justify-center ${
                  subTab === tab
                    ? "bg-black text-white"
                    : "bg-black/5 text-black/60 hover:text-black hover:bg-black/10"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center">
            {/* Desktop Segmented Control */}
            <div className="hidden sm:flex items-center bg-[#e5e7eb] rounded-lg p-1">
              {["Today", "Weekly", "Monthly", "All"].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeFilter(tf)}
                  className={`px-4 py-1.5 text-[14px] font-medium rounded-md transition-colors ${
                    timeFilter === tf
                      ? "bg-white text-black shadow-sm"
                      : "text-black/60 hover:text-black hover:bg-black/5"
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            {/* Mobile Dropdown */}
            <div className="sm:hidden relative w-[100px] dropdown-container">
              <button
                onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                className="flex w-full items-center justify-between gap-1 bg-transparent py-2 px-1 text-[13px] text-black transition-colors"
              >
                <span className="truncate">{timeFilter}</span>
                <ChevronDown size={14} className="text-black/40 shrink-0" />
              </button>
              {isTimeDropdownOpen && (
                <div className="absolute top-full right-0 mt-1 w-full bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-black/5 py-1 z-50">
                  {["Today", "Weekly", "Monthly", "All"].map((tf) => (
                    <button
                      key={tf}
                      onClick={() => {
                        setTimeFilter(tf);
                        setIsTimeDropdownOpen(false);
                      }}
                      className={`w-full text-center px-1 py-2 text-[13px] hover:bg-black/5 ${timeFilter === tf ? "bg-black/5 text-black font-semibold" : "text-black/70"}`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#e5e7eb] border-none text-[12px] md:text-[14px] font-medium text-black/40">
              <tr>
                <th className="px-2 md:px-4 py-3 md:py-4 w-10 md:w-16 text-center">
                  #
                </th>
                <th className="px-2 md:px-4 py-3 md:py-4">Player</th>
                <th className="px-4 py-4 hidden md:table-cell">Country</th>
                <th className="px-4 py-4 hidden md:table-cell">Total Plays</th>
                <th className="px-2 md:px-4 py-3 md:py-4 text-right pr-3 md:pr-6 whitespace-nowrap">
                  {subTab === "WLT" ? "Rewards" : "Winnings"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 bg-transparent text-[14px] md:text-[16px]">
              {loading ? (
                [...Array(10)].map((_, index) => (
                  <tr key={index} className="animate-pulse bg-transparent">
                    <td className="px-2 md:px-4 py-3 md:py-4 text-center">
                      <div className="h-10 bg-black/10 rounded w-8 mx-auto"></div>
                    </td>
                    <td className="px-2 md:px-4 py-3 md:py-4">
                      <div className="flex items-center space-x-2 md:space-x-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-black/10 rounded-full shrink-0"></div>
                        <div className="flex flex-col gap-1.5 w-20 md:w-24">
                          <div className="h-4 bg-black/10 rounded w-full"></div>
                          <div className="h-3 bg-black/10 rounded w-2/3 md:hidden"></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <div className="h-10 bg-black/10 rounded w-24"></div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <div className="h-10 bg-black/10 rounded w-16"></div>
                    </td>
                    <td className="px-2 md:px-4 py-3 md:py-4 text-right pr-3 md:pr-6">
                      <div className="flex flex-col gap-1.5 items-end justify-center">
                        <div className="h-4 bg-black/10 rounded w-16 md:w-20"></div>
                        <div className="h-3 bg-black/10 rounded w-10 md:hidden"></div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : list.length > 0 ? (
                list.map((winner, index) => (
                  <tr
                    key={winner.id || index}
                    className="hover:bg-black/5 transition-colors"
                  >
                    <td className="px-2 md:px-4 py-3 md:py-4 text-black/60 font-medium text-center">
                      {index + 1 + (currentPage - 1) * itemsPerPage}
                    </td>
                    <td className="px-2 md:px-4 py-3 md:py-4">
                      <div
                        className="flex items-center space-x-2 md:space-x-4 cursor-pointer group"
                        onClick={() => handleUserClick(winner)}
                      >
                        <img
                          src={getAvatar(winner.user_info?.logo || "01")}
                          alt="avatar"
                          className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-black transition-colors shrink-0 object-cover"
                        />
                        <div className="flex flex-col text-left">
                          <span className="text-black text-[15px] md:text-[16px] font-semibold group-hover:text-purple-600 transition-colors leading-tight">
                            {formatUserName(winner.user_info?.user_name)}
                          </span>
                          <span className="text-[12px] md:text-[14px] text-black/40 mt-1 leading-tight md:hidden flex items-center gap-1">
                            {getCountryFlagImg(
                              winner.user_info?.country?.[0],
                            ) ? (
                              <img
                                src={
                                  getCountryFlagImg(
                                    winner.user_info?.country?.[0],
                                  )!
                                }
                                alt=""
                                className="w-[16px] h-[10px] object-cover rounded-sm inline-block shadow-sm"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <span>
                                {getFlagEmoji(winner.user_info?.country?.[0])}
                              </span>
                            )}
                            <span className="truncate max-w-[80px] xs:max-w-[110px] sm:max-w-none">
                              {getCountryName(winner.user_info?.country?.[0])}
                            </span>
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell text-black selection:bg-transparent">
                      <div className="flex items-center gap-2">
                        {getCountryFlagImg(winner.user_info?.country?.[0]) ? (
                          <img
                            src={
                              getCountryFlagImg(winner.user_info?.country?.[0])!
                            }
                            alt=""
                            className="w-[20px] h-[14px] object-cover rounded-sm inline-block shadow-sm"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <span className="text-[18px] leading-none">
                            {getFlagEmoji(winner.user_info?.country?.[0])}
                          </span>
                        )}
                        <span>
                          {getCountryName(winner.user_info?.country?.[0])}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell text-black">
                      {winner?.playtimes?.toString() || "0"}
                    </td>
                    <td className="px-2 md:px-4 py-3 md:py-4 text-right pr-3 md:pr-6 whitespace-nowrap">
                      <div className="flex flex-col items-end justify-center whitespace-nowrap">
                        <span className="text-black text-[15px] md:text-[16px] font-semibold leading-tight whitespace-nowrap">
                          {subTab === "Bonus" ? (
                            formatBonusAmount(winner?.total_win_amount)
                          ) : (
                            <>
                              {Number(
                                Number(winner?.total_win_amount).toFixed(2),
                              ).toLocaleString()}
                              &nbsp;{subTab}
                            </>
                          )}
                        </span>
                        <span className="text-[12px] md:text-[14px] text-zinc-400 mt-1 leading-tight md:hidden whitespace-nowrap">
                          {winner?.playtimes?.toString() || "0"}P
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-4 text-center text-black/40"
                  >
                    No data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Info & Controls */}
        {list.length > 0 && !loading && (
          <div className="px-4 py-3 border-t border-black/5 bg-transparent flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-black/40">
              Showing {totalItems} players
            </div>

            {totalPages > 1 && (
              <div className="flex items-center gap-1 bg-transparent">
                <button
                  onClick={goToPreviousPage}
                  disabled={!canGoToPreviousPage}
                  className={`w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center transition-colors ${
                    !canGoToPreviousPage
                      ? "text-black/20 cursor-not-allowed bg-transparent"
                      : "text-black/60 hover:bg-black/5 hover:text-black bg-transparent"
                  }`}
                >
                  <ChevronLeft size={16} />
                </button>

                <div className="flex items-center gap-1">
                  {pageNumbers.map((pageNumber, index) => (
                    <React.Fragment key={index}>
                      {pageNumber === -1 ? (
                        <div className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-black/40">
                          <MoreHorizontal size={14} />
                        </div>
                      ) : (
                        <button
                          onClick={() => handlePageChange(pageNumber)}
                          className={`w-8 h-8 md:w-9 md:h-9 text-xs md:text-sm rounded-lg flex items-center justify-center transition-all ${
                            currentPage === pageNumber
                              ? "bg-transparent text-black font-semibold border border-black shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
                              : "text-black/65 hover:bg-black/5"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <button
                  onClick={goToNextPage}
                  disabled={!canGoToNextPage}
                  className={`w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center transition-colors ${
                    !canGoToNextPage
                      ? "text-black/20 cursor-not-allowed bg-transparent"
                      : "text-black/60 hover:bg-black/5 hover:text-black bg-transparent"
                  }`}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {isModalOpen && selectedUser && (
        <AccountInfoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          userAccount=""
          profileInfo={selectedUser}
        />
      )}
    </div>
  );
}
