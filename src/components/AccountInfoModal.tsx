import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, CalendarDays, Check, User } from "lucide-react";

export interface UserProfileInfo {
  avatarUrl: string;
  username: string;
  isVerified: boolean;
  hasStake: boolean;
  lastActive: string;
  bio: string;
  location: string;
  joinedDate: string;
}

interface AccountInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  userAccount: string;
  profileInfo?: UserProfileInfo;
}

const DEFAULT_PROFILE: UserProfileInfo = {
  avatarUrl: "/images/headshots/01.svg",
  username: "TJ",
  isVerified: true,
  hasStake: true,
  lastActive: "15h ago",
  bio: "Good Luck! www.x.com/wldotfun",
  location: "United Kingdom",
  joinedDate: "Joined November 2024"
};

export function AccountInfoModal({
  isOpen,
  onClose,
  userAccount,
  profileInfo = DEFAULT_PROFILE,
}: AccountInfoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (isOpen && modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-x-0 bottom-0 z-[100] flex justify-center pointer-events-none p-4 sm:p-6 pb-6 sm:pb-8">
          <div 
            className="fixed inset-0 pointer-events-auto" 
            onClick={() => onClose()}
          />
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full sm:w-[400px] bg-white rounded-2xl shadow-[0_12px_48px_rgba(0,0,0,0.18)] border border-black/5 pointer-events-auto flex flex-col overflow-hidden relative"
          >
            <div className="p-5 pt-6">
              <div className="flex items-center relative">
                <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden border border-black/10 shrink-0 bg-[#f0f2f5] flex items-center justify-center">
                  {profileInfo.avatarUrl ? (
                    <img 
                      src={profileInfo.avatarUrl} 
                      alt="avatar" 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                         (e.target as HTMLImageElement).style.display = 'none';
                      }} 
                    />
                  ) : (
                    <User className="w-6 h-6 text-slate-500" />
                  )}
                  {profileInfo.isVerified && (
                    <div className="absolute bottom-[-1px] right-[-1px] w-[20px] h-[20px] border-2 border-white rounded-full bg-yellow-400 flex items-center justify-center z-10">
                      <Check className="w-3 h-3 text-white stroke-[3]" />
                    </div>
                  )}
                </div>
                
                <div className="ml-4 flex-1 min-w-0 pr-4">
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <div className="text-lg font-bold text-black truncate leading-none">{profileInfo.username}</div>
                      {profileInfo.hasStake && (
                        <div className="flex items-center text-[#9c27b0] px-2 py-1 rounded-md bg-purple-50 border border-purple-100/50 leading-none shrink-0 cursor-pointer hover:bg-purple-100 transition-colors">
                          <div className="w-[14px] h-[14px] bg-[#9c27b0] text-white flex items-center justify-center rounded-[4px] mr-1">
                            <span className="font-bold text-[9px]">S</span>
                          </div>
                          <span className="text-[11px] font-medium">Staker</span>
                        </div>
                      )}
                    </div>
                    <div className="text-black/50 text-[13px] shrink-0 self-start">
                      {profileInfo.lastActive}
                    </div>
                  </div>
                </div>
              </div>

              {profileInfo.bio && (
                <div className="pt-4 pb-2 text-black/80 text-[14px] leading-relaxed">
                  {profileInfo.bio}
                </div>
              )}

              <div className="h-[1px] bg-black/5 w-full my-4" />

              <div className="flex flex-row items-center justify-between py-1">
                <div className="flex items-center flex-1 min-w-0 mr-4">
                  <MapPin className="w-4 h-4 text-black/40 shrink-0" />
                  <div className="ml-1.5 text-black/60 text-[13px] truncate font-medium">
                    {profileInfo.location}
                  </div>
                </div>
                <div className="flex items-center shrink-0">
                  <CalendarDays className="w-4 h-4 text-black/40 shrink-0" />
                  <div className="ml-1.5 text-black/60 text-[13px] font-medium">
                    {profileInfo.joinedDate}
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
