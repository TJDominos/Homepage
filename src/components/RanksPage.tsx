import React, { useEffect, useState } from "react";
import { usePagination } from "../hooks/usePagination";
import { pay_center, user } from "../api/ranksMock";
import { COUNTRY_REGION_LIST } from "./country-region";
import { getSysAvatar } from "../utils/avatar";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { AccountInfoModal, UserProfileInfo } from "./AccountInfoModal";

export default function RanksPage() {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProfileInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subTab, setSubTab] = useState('Bonus');

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
    pageNumbers
  } = usePagination({
    totalItems,
    itemsPerPage,
    initialPage: 1
  });

  async function getWinners(page = 1, page_size = 10) {
    try {
      setLoading(true);
      const winners = await pay_center.get_winners([BigInt(page)], [BigInt(page_size)]);
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
      return 'Unknown';
    }
    const country = COUNTRY_REGION_LIST.find((item) => item.abbreviation2.toLowerCase() === short_code.toLowerCase());
    return country?.name || short_code || 'Unknown';
  }

  function getFlagEmoji(short_code: string) {
    if (!short_code || short_code.toUpperCase() === 'UNKNOWN') return '🏳️';
    const code = short_code.substring(0, 2).toUpperCase();
    const codePoints = code
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  }

  function formatUserName(user_name: string) {
    if (!user_name) {
      return '-';
    }
    return user_name.length > 10 ? user_name.slice(0, 10) + '...' : user_name;
  }

  const handleUserClick = (winner: any) => {
    if (!winner.user_info) return;
    
    const profileInfo: UserProfileInfo = {
      avatarUrl: getAvatar(winner.user_info.logo || '01'),
      username: formatUserName(winner.user_info.user_name),
      isVerified: true,
      hasStake: true,
      lastActive: '',
      bio: '',
      location: `${getFlagEmoji(winner.user_info.country?.[0])} ${getCountryName(winner.user_info.country?.[0])}`,
      joinedDate: winner.user_info.create_time ? `Joined ${new Date(Number(winner.user_info.create_time / 1000000n)).toLocaleDateString()}` : 'N/A'
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
          const user_info = await user.query_user_by_principal_id(winner.principal_id);
          if (list[index].user_info) {
            return;
          }
          setList(prevList => {
            const newList = [...prevList];
            if (newList[index]) {
              newList[index] = { ...newList[index], user_info: user_info[0] };
            }
            return newList;
          });
        } catch (error) {
          console.error(`Failed to fetch user info for ${winner.principal_id}:`, error);
        }
      });
    }
  }, [list]);

  return (
    <div className="w-full max-w-[var(--max-content-width-pc)] mx-auto px-[24rem] py-[40rem] pb-[80rem] fade-in-up">
      <div className="mb-[32rem]">
        <h1 className="text-[24rem] font-bold text-black mb-[16rem] text-left">Winning Ranks</h1>
        <div className="flex items-center gap-[8rem]">
          {['Bonus', 'WLT', 'Gcoin'].map(tab => (
            <button
              key={tab}
              onClick={() => setSubTab(tab)}
              className={`px-[16rem] h-[32rem] rounded-[8rem] text-[14rem] font-medium transition-colors ${
                subTab === tab
                  ? 'bg-black text-white'
                  : 'bg-black/5 text-black/60 hover:text-black hover:bg-black/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-[12rem] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#e5e7eb] border-none text-[14rem] font-medium text-black/40">
              <tr>
                <th className="px-[24rem] py-[16rem] text-center md:text-left w-[64rem]">#</th>
                <th className="px-[24rem] py-[16rem]">Player</th>
                <th className="px-[24rem] py-[16rem] hidden md:table-cell">Country</th>
                <th className="px-[24rem] py-[16rem] hidden md:table-cell">Total Plays</th>
                <th className="px-[24rem] py-[16rem]">Winnings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 bg-transparent text-[16rem]">
              {loading ? (
                [...Array(10)].map((_, index) => (
                  <tr key={index} className="animate-pulse bg-transparent">
                    <td className="px-[24rem] py-[24rem]"><div className="h-[16rem] bg-black/10 rounded w-[16rem]"></div></td>
                    <td className="px-[24rem] py-[24rem]">
                      <div className="flex items-center space-x-[12rem]">
                        <div className="w-[48rem] h-[48rem] bg-black/10 rounded-full"></div>
                        <div className="h-[16rem] bg-black/10 rounded w-[96rem]"></div>
                      </div>
                    </td>
                    <td className="px-[24rem] py-[24rem] hidden md:table-cell"><div className="h-[16rem] bg-black/10 rounded w-[64rem]"></div></td>
                    <td className="px-[24rem] py-[24rem] hidden md:table-cell"><div className="h-[16rem] bg-black/10 rounded w-[48rem]"></div></td>
                    <td className="px-[24rem] py-[24rem]"><div className="h-[16rem] bg-black/10 rounded w-[80rem]"></div></td>
                  </tr>
                ))
              ) : list.length > 0 ? (
                list.map((winner, index) => (
                  <tr key={winner.id || index} className="hover:bg-black/5 transition-colors">
                    <td className="px-[24rem] py-[24rem] text-center md:text-left text-black/60">
                      {(index + 1) + (currentPage - 1) * itemsPerPage}
                    </td>
                    <td className="px-[24rem] py-[24rem]">
                      <div 
                        className="flex items-center space-x-[16rem] cursor-pointer group"
                        onClick={() => handleUserClick(winner)}
                      >
                        <img 
                          src={getAvatar(winner.user_info?.logo || '01')} 
                          alt="avatar" 
                          className="w-[48rem] h-[48rem] rounded-full border border-black/10 transition-colors" 
                        />
                        <div className="flex flex-col">
                          <span className="text-black group-hover:text-purple-600 transition-colors">
                            {formatUserName(winner.user_info?.user_name)}
                          </span>
                          <span className="text-[12rem] text-black/40 hidden mt-[4rem] max-md:flex items-center gap-[4rem]">
                            <span className="text-[14rem]">{getFlagEmoji(winner.user_info?.country?.[0])}</span> {getCountryName(winner.user_info?.country?.[0])}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-[24rem] py-[24rem] hidden md:table-cell text-black/80">
                      <div className="flex items-center gap-[8rem]">
                        <span className="text-[16rem]">{getFlagEmoji(winner.user_info?.country?.[0])}</span>
                        {getCountryName(winner.user_info?.country?.[0])}
                      </div>
                    </td>
                    <td className="px-[24rem] py-[24rem] hidden md:table-cell text-black/80">
                      {winner?.playtimes?.toString() || '0'}
                    </td>
                    <td className="px-[24rem] py-[24rem]">
                      <div className="flex flex-col">
                        <span className="text-black">
                          {Number(Number(winner?.total_win_amount).toFixed(2)).toLocaleString() || 0} {subTab}
                        </span>
                        <span className="text-[12rem] text-black/40 block md:hidden mt-[4rem]">
                          {winner?.playtimes?.toString() || '0'}P
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-[24rem] py-[48rem] text-center text-black/40">
                    No data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Info & Controls */}
        {list.length > 0 && !loading && (
          <div className="px-[24rem] py-[16rem] border-t border-black/5 bg-transparent flex flex-col sm:flex-row items-center justify-between gap-[16rem]">
            <div className="text-[14rem] text-black/40">
              Showing {totalItems} players
            </div>
            
            {totalPages > 1 && (
              <div className="flex items-center gap-[4rem] bg-transparent">
                <button
                  onClick={goToPreviousPage}
                  disabled={!canGoToPreviousPage}
                  className={`p-[6rem] rounded-[6rem] flex items-center justify-center ${
                    !canGoToPreviousPage 
                      ? "text-black/20 cursor-not-allowed" 
                      : "text-black/60 hover:bg-black/5 hover:text-black"
                  }`}
                >
                  <ChevronLeft size={16} />
                </button>
                
                <div className="flex items-center">
                  {pageNumbers.map((pageNumber, index) => (
                    <React.Fragment key={index}>
                      {pageNumber === -1 ? (
                        <div className="w-[32rem] h-[32rem] flex items-center justify-center text-black/40">
                          <MoreHorizontal size={14} />
                        </div>
                      ) : (
                        <button
                          onClick={() => handlePageChange(pageNumber)}
                          className={`min-w-[32rem] h-[32rem] px-[8rem] text-[14rem] rounded-[6rem] flex items-center justify-center transition-colors ${
                            currentPage === pageNumber
                              ? "bg-black/5 text-black font-semibold"
                              : "text-black/60 hover:bg-black/5"
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
                  className={`p-[6rem] rounded-[6rem] flex items-center justify-center ${
                    !canGoToNextPage 
                      ? "text-black/20 cursor-not-allowed" 
                      : "text-black/60 hover:bg-black/5 hover:text-black"
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
