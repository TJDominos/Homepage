import React from 'react';
import { WltLogo } from "../layout/WltLogo";

export const AssetIcon = ({ type, className = "w-5 h-5" }: { type: string; className?: string }) => {
  if (type === "WLT") {
    return <WltLogo className={`${className} shrink-0`} />;
  }
  if (type === "Gcoin") {
    return (
      <div className={`${className} rounded-full bg-[#FFD700] border border-black/10 shrink-0`}></div>
    );
  }
  if (type === "USDC") {
    return (
      <div className={`${className} rounded-full bg-[#2775CA] flex items-center justify-center text-white text-[12px] font-bold shrink-0`}>
        $
      </div>
    );
  }
  if (type === "USDT") {
    return (
      <div className={`${className} rounded-full bg-[#26A17B] flex items-center justify-center text-white text-[12px] font-bold shrink-0`}>
        T
      </div>
    );
  }
  
  // Generic fallback for other tokens based on their first letter
  const getInitial = (name: string) => name ? name.charAt(0).toUpperCase() : '?';
  const getBgColor = (name: string) => {
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500', 'bg-teal-500'];
    const charCode = name ? name.charCodeAt(0) : 0;
    return colors[charCode % colors.length];
  };

  return (
    <div className={`${className} rounded-full ${getBgColor(type)} flex items-center justify-center text-white text-[10px] sm:text-[12px] font-bold shrink-0`}>
      {getInitial(type)}
    </div>
  );
};
