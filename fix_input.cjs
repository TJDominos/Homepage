const fs = require('fs');

let wt = fs.readFileSync('src/frontend/money/tabs/WithdrawTab.tsx', 'utf-8');

const replacement = `            {asset === "WLT" && (
              <div className="flex items-center bg-black/5 rounded-full p-0.5">
                <button
                  onClick={() => setWltBalanceType("available")}
                  className={\`px-3 py-1 rounded-full text-[12px] font-semibold transition-all \${wltBalanceType === "available" ? "bg-[#6A3FE6] text-white shadow-sm" : "text-black/50"}\`}
                >
                  Available
                </button>
                <button
                  onClick={() => setWltBalanceType("locked")}
                  className={\`px-3 py-1 rounded-full text-[12px] font-semibold transition-all \${wltBalanceType === "locked" ? "bg-[#6A3FE6] text-white shadow-sm" : "text-black/50"}\`}
                >
                  Locked
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 sm:gap-2 w-full">
            <input
              type="text"
              placeholder="Minimum 20"
              value={amount}
              onChange={(e) => {
                const val = e.target.value;
                if (/^[0-9.,]*$/.test(val)) setAmount(val);
              }}
              onBlur={(e) => {
                const val = e.target.value.replace(/,/g, "");
                if (val && !isNaN(Number(val))) {
                  setAmount(Number(val).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                }
              }}
              className="flex-1 min-w-0 bg-black/5 border border-transparent rounded-full px-3 sm:px-4 h-8 outline-none text-[14px] text-black placeholder-black/40 transition-all font-medium focus:border-black focus:bg-transparent"
            />
            <div className="bg-black/5 border border-transparent px-3 sm:px-4 h-8 flex items-center justify-center rounded-full text-black/40 text-[14px] font-medium shrink-0">
              {asset}
            </div>
            <button className="bg-[#111] hover:bg-black text-white px-4 sm:px-5 h-8 flex items-center justify-center rounded-full text-[14px] font-bold transition-all shrink-0">
              Max
            </button>
          </div>
          <div className="flex flex-col gap-1 mt-1 px-2 text-[12px] text-black/65 font-medium">
            {asset === "WLT" && (
`;

wt = wt.replace(/\{asset === "WLT" && \(\s*<div className="flex flex-col gap-1 w-full">\s*\{wltBalanceType === "available" \? \(/, replacement + `              <div className="flex flex-col gap-1 w-full">
                {wltBalanceType === "available" ? (`);

fs.writeFileSync('src/frontend/money/tabs/WithdrawTab.tsx', wt);

