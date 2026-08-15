import React, { useState } from "react";
import { ChevronLeft, Check, CheckCircle2, Copy, ExternalLink, ChevronDown } from "lucide-react";

interface LockedTokenRecordProps {
  onBack: () => void;
  isDesktop?: boolean;
}

export function LockedTokenRecord({ onBack, isDesktop }: LockedTokenRecordProps) {
  const [activeTab, setActiveTab] = useState<"unclaimed" | "claimed">("unclaimed");
  const [expandedRecordId, setExpandedRecordId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedRecordId(expandedRecordId === id ? null : id);
  };

  // Sorted by earliest first
  const unclaimedRecords = [
    {
      id: 1,
      recipient: "X9K2...P1L9",
      amountLocked: "5,000 WLT",
      unlockedPct: "20.00%",
      claimedPct: "0.00%",
      nextVestingDate: "Aug 15, 2026",
      cliffAmount: "1,000 WLT",
      cliffTime: "Aug 15, 2026",
      unlockSchedule: "Vesting",
      isClaimed: false,
      futureReleases: [
        { amount: "1,000 WLT", date: "Sep 15, 2026" },
        { amount: "1,000 WLT", date: "Oct 15, 2026" },
        { amount: "1,000 WLT", date: "Nov 15, 2026" },
        { amount: "1,000 WLT", date: "Dec 15, 2026" }
      ]
    },
    {
      id: 2,
      recipient: "A1B2...C3D4",
      amountLocked: "2,500 WLT",
      unlockedPct: "50.00%",
      claimedPct: "25.00%",
      nextVestingDate: "Sep 01, 2026",
      cliffAmount: "500 WLT",
      cliffTime: "Sep 01, 2026",
      unlockSchedule: "Vesting",
      isClaimed: false,
      futureReleases: [
        { amount: "500 WLT", date: "Oct 01, 2026" },
        { amount: "250 WLT", date: "Nov 01, 2026" }
      ]
    }
  ];

  // Sorted by latest first
  const claimedRecords = [
    {
      id: 3,
      recipient: "CJMN...i3K6",
      amountLocked: "1,000 WLT",
      unlockedPct: "100.00%",
      claimedPct: "100.00%",
      nextVestingDate: "-",
      cliffAmount: "0 WLT",
      cliffTime: "Jul 28, 2026",
      unlockSchedule: "Fully Unlocked",
      isClaimed: true,
      futureReleases: []
    },
  ];

  const records = activeTab === "unclaimed" ? unclaimedRecords : claimedRecords;

  const content = (
    <div className={`flex flex-col h-full bg-[#f0f2f5] ${isDesktop ? "rounded-[24px] border border-black/5 relative pt-12" : ""}`}>
      {isDesktop && (
        <button
          onClick={onBack}
          className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-black/5 shadow-sm hover:bg-slate-50 transition-colors z-10"
        >
          <ChevronLeft className="w-5 h-5 text-black" />
        </button>
      )}
      <div className={`flex items-center px-6 pb-4 shrink-0 ${isDesktop ? "" : "hidden"}`}>
        <h2 className="text-[20px] font-bold text-black ml-10">Locked Tokens Record</h2>
      </div>
      
      {/* Tabs */}
      <div className="flex px-6 border-b border-black/5 shrink-0">
        <button
          onClick={() => setActiveTab("unclaimed")}
          className={`pb-3 px-2 text-[15px] font-semibold transition-colors relative ${
            activeTab === "unclaimed" ? "text-black" : "text-black/40 hover:text-black/60"
          }`}
        >
          Unclaimed
          {activeTab === "unclaimed" && (
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-black rounded-t-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("claimed")}
          className={`pb-3 px-2 ml-6 text-[15px] font-semibold transition-colors relative ${
            activeTab === "claimed" ? "text-black" : "text-black/40 hover:text-black/60"
          }`}
        >
          Claimed
          {activeTab === "claimed" && (
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-black rounded-t-full" />
          )}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <div className="flex flex-col gap-4">
          {records.length > 0 ? (
            records.map((record) => (
              <div
                key={record.id}
                className="bg-white rounded-[16px] p-4 sm:p-5 border border-black/5 flex flex-col gap-4 shadow-sm"
              >
                {/* Header row */}
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-[12px] text-black/50 font-medium mb-1">Recipient</div>
                    <div className="text-[14px] font-semibold text-black flex items-center gap-2">
                      {record.recipient} <Copy className="w-3.5 h-3.5 text-black/40 cursor-pointer hover:text-black" />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[12px] text-black/50 font-medium mb-1">Amount</div>
                    <div className="text-[15px] font-bold text-black">{record.amountLocked}</div>
                  </div>
                </div>

                {/* Progress row */}
                <div>
                  <div className="text-[12px] text-black/50 font-medium mb-2">Claim Progress</div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-2 flex">
                    <div 
                      className="h-full bg-[#5F40A1]" 
                      style={{ width: record.claimedPct }}
                    ></div>
                    <div 
                      className="h-full bg-green-500" 
                      style={{ width: `calc(${record.unlockedPct} - ${record.claimedPct})` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center text-[12px]">
                    <div className="text-black/60">Unlocked: <span className="font-semibold text-green-600">{record.unlockedPct}</span></div>
                    <div className="text-black/60">Claimed: <span className="font-semibold text-[#5F40A1]">{record.claimedPct}</span></div>
                  </div>
                </div>

                {/* Grid info */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black/5">
                  <div>
                    <div className="text-[12px] text-black/50 font-medium mb-1">Unlocked Amount</div>
                    <div className="text-[14px] font-semibold text-black">{record.cliffAmount}</div>
                    <div className="text-[11px] text-black/40 mt-0.5">Date: {record.cliffTime}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div 
                      className={`cursor-pointer group flex items-center gap-1.5 ${record.futureReleases && record.futureReleases.length > 0 ? '' : 'pointer-events-none'}`}
                      onClick={() => toggleExpand(record.id)}
                    >
                      <div>
                        <div className="text-[12px] text-black/50 font-medium mb-1">Next Releasing Date</div>
                        <div className="text-[14px] font-semibold text-black flex items-center gap-1">
                          {record.nextVestingDate}
                          {record.futureReleases && record.futureReleases.length > 0 && (
                            <ChevronDown className={`w-4 h-4 text-black/40 group-hover:text-black transition-transform ${expandedRecordId === record.id ? 'rotate-180' : ''}`} />
                          )}
                        </div>
                      </div>
                    </div>
                    <a 
                      href="#" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-1.5 -mr-1.5 text-black/40 hover:text-black hover:bg-black/5 rounded-full transition-colors"
                      title="View on-chain escrow"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Expanded Future Releases */}
                {expandedRecordId === record.id && record.futureReleases && record.futureReleases.length > 0 && (
                  <div className="pt-3 border-t border-black/5 animate-in slide-in-from-top-2 duration-200">
                    <div className="text-[12px] text-black/50 font-medium mb-2">Upcoming Releases</div>
                    <div className="flex flex-col gap-2">
                      {record.futureReleases.map((release, i) => (
                        <div key={i} className="flex justify-between items-center bg-slate-50 px-3 py-2 rounded-lg border border-black/5">
                          <div className="text-[13px] font-semibold text-black">{release.amount}</div>
                          <div className="text-[12px] font-medium text-black/60">{release.date}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer Actions */}
                <div className="flex justify-between items-center pt-4 border-t border-black/5">
                  <div className={`flex items-center gap-1.5 ${record.isClaimed ? 'text-emerald-500' : 'text-amber-500'}`}>
                    <Check className="w-4 h-4" />
                    <span className="text-[13px] font-medium">{record.unlockSchedule}</span>
                  </div>
                  <button 
                    className={`px-4 py-1.5 rounded-full border text-[13px] font-semibold flex items-center gap-1.5 transition-colors ${
                      record.isClaimed 
                        ? 'border-emerald-500/30 text-emerald-600 bg-emerald-50/50 cursor-default'
                        : 'border-black text-black hover:bg-black/5'
                    }`}
                  >
                    {record.isClaimed ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        All Claimed
                      </>
                    ) : (
                      "Claim"
                    )}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-10 text-center text-[14px] text-black/40 font-medium">
              No records found
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (isDesktop) {
    return <div className="h-full w-full">{content}</div>;
  }

  return (
    <div className="fixed inset-0 z-[999] bg-[#f0f2f5] flex flex-col fade-in pt-16">
      <button
        onClick={onBack}
        className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-black/5 shadow-sm hover:bg-slate-50 transition-colors z-20"
      >
        <ChevronLeft className="w-5 h-5 text-black" />
      </button>
      {content}
    </div>
  );
}
