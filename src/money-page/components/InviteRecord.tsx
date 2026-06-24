import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, Loader2 } from "lucide-react";
import { getSysAvatar } from "../../utils/avatar";

interface InviteRecordProps {
  onBack: () => void;
  isDesktop?: boolean;
}

export function InviteRecord({ onBack, isDesktop }: InviteRecordProps) {
  const [users, setUsers] = useState([
    { id: 1, name: "XXXXXX", date: "Jan 20, 2025", type: "User", amount: "+0" },
    {
      id: 2,
      name: "XXXXXX",
      date: "Jan 20, 2025",
      type: "Player",
      amount: "+10.00",
    },
    { id: 3, name: "XXXXXX", date: "Jan 20, 2025", type: "User", amount: "+0" },
    {
      id: 4,
      name: "XXXXXX",
      date: "Jan 20, 2025",
      type: "Player",
      amount: "+0",
    },
  ]);

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          loadMore();
        }
      },
      { threshold: 1.0 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoadingMore]);

  const loadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      if (users.length >= 20) {
        setHasMore(false);
      } else {
        const newUsers = Array.from({ length: 4 }).map((_, i) => ({
          id: users.length + i + 1,
          name: "XXXXXX",
          date: "Jan 20, 2025",
          type: i % 2 === 0 ? "User" : "Player",
          amount: i % 2 === 0 ? "+0" : "+10.00",
        }));
        setUsers((prev) => [...prev, ...newUsers]);
      }
      setIsLoadingMore(false);
    }, 1000);
  };

  const content = (
    <div className="flex flex-col gap-4">
      {/* Header Info Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-black/5">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center overflow-hidden shrink-0">
            <img
              src={getSysAvatar("01")}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] font-bold text-black mb-1">Kidder</h3>
            <p className="text-[12px] text-black/50 leading-snug">
              2% reward on invited users' net spending (Total wager - Wins -
              Bonus).
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center text-[14px]">
            <span className="text-black/70">User Invited</span>
            <span className="text-black font-semibold">3</span>
          </div>
          <div className="flex justify-between items-center text-[14px]">
            <span className="text-black/70">Player</span>
            <span className="text-black font-semibold">1</span>
          </div>
          <div className="flex justify-between items-center text-[14px] mt-2">
            <span className="text-black/70">Rewards</span>
            <span className="text-black font-bold text-[16px]">3,000.02</span>
          </div>
          <div className="flex justify-between items-end text-[14px] mt-2">
            <div className="flex flex-col">
              <span className="text-black/70">Received</span>
              <span className="text-[11px] text-black/40">
                Distribute every 7 days
              </span>
            </div>
            <span className="text-black font-bold text-[16px]">1,000.02</span>
          </div>
        </div>
      </div>

      {/* Detail List */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-black/5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[16px] font-bold text-black">Detail</h3>
          <span className="text-[11px] text-black/40">Update at 20260624</span>
        </div>

        <div className="flex flex-col gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between pb-4 border-b border-black/5 last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                  <div className="w-5 h-5 bg-orange-200 rounded-sm"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-black">
                    {user.name}
                  </span>
                  <span className="text-[11px] text-black/40">
                    Joined on {user.date}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[13px] text-black/60">{user.type}</span>
                <span className="text-[14px] font-bold text-black">
                  {user.amount}
                </span>
              </div>
            </div>
          ))}

          <div ref={observerTarget} className="flex justify-center py-4">
            {isLoadingMore ? (
              <Loader2 className="w-5 h-5 animate-spin text-black/40" />
            ) : hasMore ? (
              <span className="text-[12px] text-black/40">
                Scroll to load more
              </span>
            ) : (
              <span className="text-[12px] text-black/40">No more records</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (isDesktop) {
    return (
      <div className="bg-[#f0f2f5] rounded-2xl p-6 border border-black/5 overflow-y-auto h-full min-h-[380px] fade-in flex flex-col">
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={onBack}
            className="p-1.5 -ml-1.5 rounded-full hover:bg-black/5 text-black transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-[20px] font-bold text-black">Record</h2>
        </div>
        {content}
      </div>
    );
  }

  // Mobile full screen
  return (
    <div className="fixed inset-0 z-[999] bg-[#f0f2f5] flex flex-col overflow-y-auto fade-in">
      <div 
        className="flex flex-row items-center justify-start px-4 pb-3 sticky top-0 bg-[#f0f2f5] z-10 border-b border-black/5"
        style={{ paddingTop: 'max(env(safe-area-inset-top), 16px)' }}
      >
        <button
          onClick={onBack}
          className="hover:opacity-80 transition-opacity flex items-center font-medium pr-4"
        >
          <ChevronLeft
            strokeWidth={2.5}
            size={24}
            className="mr-1 text-black"
          />
          <span className="text-[16px] font-medium text-black">Record</span>
        </button>
      </div>
      <div className="px-4 pb-8 mt-4">{content}</div>
    </div>
  );
}
