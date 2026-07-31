import { BadgeCheck, Share2 } from "lucide-react";
import React from "react";
import "./WinnerPopover.css";

export default function WinnerPopoverContent({
  userInfo,
  getAvatar,
  getCountry,
}: any) {
  if (!userInfo) return null;

  return (
    <div className="p-4 bg-white rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.1)] border border-black/5 min-w-full">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={getAvatar(userInfo.logo || "01")}
              alt="avatar"
              className="w-full h-10 rounded-full border-16px border-[#5F40A1]"
            />
          </div>
          <div>
            <div className="flex items-center gap-4">
              <h3 className="text-sm font-bold text-black">
                {userInfo.user_name || "Unknown"}
              </h3>
            </div>
            <p className="text-sm text-black/60">
              {getCountry(userInfo.country?.[0] || "")}
            </p>
          </div>
        </div>
        <button className="text-black/40 hover:text-black/60 transition-colors">
          <Share2 size={18} />
        </button>
      </div>

      <div className="mt-4 pt-4 border-t border-black/5">
        <div className="flex justify-between text-sm">
          <span className="text-black/60">Member Since:</span>
          <span className="font-medium text-black">
            {userInfo.create_time
              ? new Date(
                  Number(userInfo.create_time / 1000000n),
                ).toLocaleDateString()
              : "N/A"}
          </span>
        </div>
      </div>

      <div className="mt-4 wl-user-info-badges">
        <div className="badge-icon">
          <BadgeCheck className="w-full h-full text-[#5F40A1] fill-[#5F40A1]/10" />
        </div>
        <div className="badge-name rounded-r-16px pr-4">Randseed VIP</div>
      </div>
    </div>
  );
}
