import { BadgeCheck, Share2 } from "lucide-react";
import React from "react";
import "./WinnerPopover.css";

export default function WinnerPopoverContent({ userInfo, getAvatar, getCountry }: any) {
  if (!userInfo) return null;

  return (
    <div className="p-[16rem] bg-white rounded-[20rem] shadow-[0_4rem_16rem_rgba(0,0,0,0.1)] border border-black/5 min-w-[280rem]">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-[12rem]">
          <div className="relative">
            <img 
              src={getAvatar(userInfo.logo || '01')} 
              alt="avatar" 
              className="w-[56rem] h-[56rem] rounded-full border-[2rem] border-[#5F40A1]"
            />
          </div>
          <div>
            <div className="flex items-center gap-[8rem]">
              <h3 className="text-[16rem] font-bold text-black">{userInfo.user_name || "Unknown"}</h3>
            </div>
            <p className="text-[14rem] text-black/60">{getCountry(userInfo.country?.[0] || "")}</p>
          </div>
        </div>
        <button className="text-black/40 hover:text-black/60 transition-colors">
          <Share2 size={18} />
        </button>
      </div>

      <div className="mt-[16rem] pt-[16rem] border-t border-black/5">
        <div className="flex justify-between text-[14rem]">
          <span className="text-black/60">Member Since:</span>
          <span className="font-medium text-black">
            {userInfo.create_time ? new Date(Number(userInfo.create_time / 1000000n)).toLocaleDateString() : 'N/A'}
          </span>
        </div>
      </div>

      <div className="mt-[16rem] wl-user-info-badges">
        <div className="badge-icon">
          <BadgeCheck className="w-full h-full text-[#5F40A1] fill-[#5F40A1]/10" />
        </div>
        <div className="badge-name rounded-r-[6rem] pr-[8rem]">Randseed VIP</div>
      </div>
    </div>
  );
}
