import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";

interface WLPointRecordProps {
  onBack: () => void;
  isDesktop?: boolean;
}

export function WLPointRecord({ onBack, isDesktop }: WLPointRecordProps) {
  const [records] = useState([
    { id: 1, title: "Daily Check-in", date: "2026.07.07 10:39:59", amount: "+3 WL Point" },
    { id: 2, title: "Daily Check-in", date: "2026.07.01 21:18:21", amount: "+6 WL Point" },
    { id: 3, title: "Daily Check-in", date: "2026.02.16 21:33:30", amount: "+2 WL Point" },
    { id: 4, title: "Daily Check-in", date: "2026.02.13 00:25:02", amount: "+2 WL Point" },
    { id: 5, title: "Daily Check-in", date: "2026.01.25 21:17:40", amount: "+2 WL Point" },
    { id: 6, title: "Daily Check-in", date: "2026.01.16 10:27:06", amount: "+2 WL Point" },
    { id: 7, title: "Redeemed Points", date: "2025.12.14 11:54:34", amount: "-30 WL Point" },
    { id: 8, title: "Daily Check-in", date: "2025.12.13 11:54:34", amount: "+3 WL Point" },
  ]);

  const content = (
    <div className={`flex flex-col h-full bg-[#f0f2f5] ${isDesktop ? "rounded-3xl border border-black/5" : ""}`}>
      <div className="flex items-center px-4 py-4 shrink-0 border-b border-black/5">
        <button
          onClick={onBack}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors mr-2"
        >
          <ChevronLeft className="w-6 h-6 text-black" />
        </button>
        <h2 className="text-[18px] font-semibold text-black">WL Point Record</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <div className="flex flex-col">
          {records.map((record, index) => (
            <div 
              key={record.id} 
              className={`flex justify-between items-center py-4 ${index !== records.length - 1 ? 'border-b border-black/5' : ''}`}
            >
              <div>
                <div className="text-[15px] font-semibold text-black leading-tight mb-1">{record.title}</div>
                <div className="text-[12px] text-black/40">{record.date}</div>
              </div>
              <div className="text-[14px] font-semibold text-black/70">{record.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (isDesktop) {
    return <div className="h-[400px] w-full">{content}</div>;
  }

  return (
    <div className="fixed inset-0 z-[999] bg-[#f0f2f5] flex flex-col fade-in">
      {content}
    </div>
  );
}
