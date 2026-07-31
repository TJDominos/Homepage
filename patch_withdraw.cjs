const fs = require('fs');
let content = fs.readFileSync('src/frontend/money/tabs/WithdrawTab.tsx', 'utf-8');

const oldInput = `<input
              type="text"
              placeholder="Minimum 20"
              value={amount}
              onChange={(e) => {
                let val = e.target.value.replace(/,/g, "");
                if (val === "") {
                  setAmount("");
                  return;
                }
                if (!/^\\d*\\.?\\d*$/.test(val)) return;
                const parts = val.split(".");
                if (parts.length > 2) return;
                parts[0] = parts[0].replace(/\\B(?=(\\d{3})+(?!\\d))/g, ",");
                setAmount(parts.join("."));
              }}
              className="flex-1 min-w-0 bg-black/5 border border-transparent rounded-full px-3 sm:px-4 h-8 outline-none text-[14px] text-black placeholder-black/40 transition-all font-medium focus:border-black focus:bg-transparent"
            />`;

const newInput = `<input
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
            />`;

content = content.replace(oldInput, newInput);
content = content.replace(/parseFloat\\(amount\\)/g, 'parseFloat(amount.replace(/,/g, ""))');

fs.writeFileSync('src/frontend/money/tabs/WithdrawTab.tsx', content);
