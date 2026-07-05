import React from "react";

interface WalletMenuBarProps {
  activeTab: "rewards" | "bonus" | "deposit" | "withdraw" | "record";
  onTabChange: (
    tab: "rewards" | "bonus" | "deposit" | "withdraw" | "record",
  ) => void;
}

export const WalletMenuBar: React.FC<WalletMenuBarProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    { id: "rewards", label: "Rewards" },
    { id: "bonus", label: "Bonus" },
    { id: "deposit", label: "Deposit" },
    { id: "withdraw", label: "Withdraw" },
    { id: "record", label: "Record" },
  ] as const;

  const renderIcon = (id: string, isActive: boolean) => {
    const strokeColor = "#666";
    const accentColor = "#3CE39A"; // Green accent line

    switch (id) {
      case "deposit":
        return (
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outline */}
            <path
              d="M19 13V7C19 5.89543 18.1046 5 17 5H7C5.89543 5 5 5.89543 5 7V13L12 19L19 13Z"
              stroke={strokeColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Inner Dollar Sign */}
            <path
              d="M12 8V16M14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12C13.1046 12 14 12.8954 14 14C14 15.1046 13.1046 16 12 16C10.8954 16 10 15.1046 10 14"
              stroke={accentColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "withdraw":
        return (
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 5H7C5.89543 5 5 5.89543 5 7V17C5 18.1046 5.89543 19 7 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
              stroke={strokeColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 12H16"
              stroke={strokeColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12H10M10 12L7 9M10 12L7 15"
              stroke={accentColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "record":
        return (
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Document Outline */}
            <path
              d="M17 19H7C5.89543 19 5 18.1046 5 17V7C5 5.89543 5.89543 5 7 5H17"
              stroke={strokeColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Pen Outline */}
            <path
              d="M9 15L16 6L18 8L11 17H9V15Z"
              stroke={strokeColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Green Line */}
            <path
              d="M6.5 15.5H12M15 15.5H16.5"
              stroke={accentColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "bonus":
        return (
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Box Body */}
            <path
              d="M6 10V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V10"
              stroke={strokeColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Box Lid */}
            <path
              d="M4 8C4 6.89543 4.89543 6 6 6H18C19.1046 6 20 6.89543 20 8V10H4V8Z"
              stroke={strokeColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Bow Top */}
            <path
              d="M12 6L9 3M12 6L15 3"
              stroke={strokeColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Green Line */}
            <path
              d="M12 10V20"
              stroke={accentColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "rewards":
        return (
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 15L8.5 17L9.5 13.5L7 11.5L10.5 11L12 8L13.5 11L17 11.5L14.5 13.5L15.5 17L12 15Z"
              stroke={strokeColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="5" cy="5" r="1.5" fill={accentColor} />
            <circle cx="19" cy="6" r="1" fill={accentColor} />
            <circle cx="18" cy="19" r="1.5" fill={accentColor} />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex justify-between items-center bg-white rounded-[24px] overflow-hidden p-4 mb-6 shadow-sm border border-black/5 gap-2">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as any)}
            className="flex flex-col items-center gap-2 bg-transparent border-none p-0 cursor-pointer text-black flex-1 min-w-[56px]"
          >
            <div
              className={`w-[48px] h-[48px] rounded-[16px] flex items-center justify-center transition-all ${isActive ? "bg-[#E1E2F9] border border-[#D3C3FB]" : "bg-[#f4f4f5]"}`}
            >
              {renderIcon(tab.id, isActive)}
            </div>
            <span
              className={`text-[14px] leading-[1.2] whitespace-nowrap text-center ${isActive ? "font-[600] text-[#111]" : "font-medium text-slate-500"}`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
