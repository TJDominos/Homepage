import React from "react";
import { TransactionRecord } from "../components/TransactionRecord";

interface RecordTabProps {
  isDesktop: boolean;
  userAccount: string | null;
}

export function RecordTab({ isDesktop, userAccount }: RecordTabProps) {
  return (
    <div className="flex flex-col mt-2 flex-1">
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-[16px] font-[600] text-slate-800">
          Account Record
        </h2>
      </div>
      <div className="flex-1 overflow-hidden mt-1">
        <TransactionRecord isDesktop={isDesktop} userAccount={userAccount} />
      </div>
    </div>
  );
}
