import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, CalendarDays, Check } from "lucide-react";

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
  onSignOut?: () => void;
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
        <div className="fixed inset-x-0 bottom-[80rem] z-[100] flex justify-center pointer-events-none px-[16rem]">
          <div 
            className="fixed inset-0 pointer-events-auto" 
            onClick={() => onClose()}
          />
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full sm:max-w-[400rem] bg-white rounded-[20rem] shadow-[0_8rem_32rem_rgba(0,0,0,0.12)] border border-black/5 pointer-events-auto flex flex-col overflow-hidden relative"
          >
            <div className="p-[20rem] pt-[24rem]">
              <div className="flex items-center relative">
                <div className="relative w-[48rem] h-[48rem] rounded-full overflow-hidden border border-black/10 shrink-0 bg-[#f0f2f5]">
                  <img 
                    src={profileInfo.avatarUrl} 
                    alt="avatar" 
                    className="w-full h-full object-cover" 
                    onError={(e) => {
                       (e.target as HTMLImageElement).style.display = 'none';
                    }} 
                  />
                  {profileInfo.isVerified && (
                    <div className="absolute bottom-[0px] right-[0px] w-[14rem] h-[14rem] border-2 border-white rounded-full bg-yellow-400 flex items-center justify-center z-10">
                      <Check className="w-[8rem] h-[8rem] text-white stroke-[3]" />
                    </div>
                  )}
                </div>
                
                <div className="px-[8rem] flex-1 min-w-0 pr-[12rem]">
                  <div className="flex items-center gap-[4rem] flex-wrap">
                    <div className="text-[16rem] font-bold text-slate-800 truncate leading-none mt-[-2px]">{profileInfo.username}</div>
                    {profileInfo.hasStake && (
                      <div className="flex items-center text-[#9c27b0] pl-[4rem] pr-[6rem] py-[2rem] rounded-[12rem] bg-purple-50 border border-purple-100/50 leading-none shrink-0 cursor-pointer hover:bg-purple-100 transition-colors">
                        <div className="w-[12rem] h-[12rem] bg-[#9c27b0] text-white flex items-center justify-center rounded-[4rem] mr-[4rem]">
                          <span className="font-bold text-[8rem]">S</span>
                        </div>
                        <span className="text-[10rem] font-medium mt-[1px]">Staker</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-black/65 text-[12rem] shrink-0 self-start mt-[4rem]">
                  {profileInfo.lastActive}
                </div>
              </div>

              {profileInfo.bio && (
                <div className="pt-[18rem] text-black text-[12rem] leading-relaxed">
                  {profileInfo.bio}
                </div>
              )}

              <div className="h-[1px] bg-black/10 w-full my-[12rem]" />

              <div className="flex items-center py-[8rem]">
                <div className="flex items-center flex-1 min-w-0 pr-[8rem]">
                  <MapPin className="w-[18rem] h-[18rem] text-slate-400 shrink-0" />
                  <div className="px-[2rem] text-black/65 text-[12rem] truncate font-medium">
                    {profileInfo.location}
                  </div>
                </div>
                <div className="flex items-center shrink-0">
                  <CalendarDays className="w-[18rem] h-[18rem] text-slate-400 shrink-0" />
                  <div className="pl-[2rem] text-black/65 text-[12rem] font-medium">
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
