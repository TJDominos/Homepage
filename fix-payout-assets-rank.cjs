const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

const oldAssetsTab = `<div className="flex flex-col gap-3">
          <div className="grid grid-cols-12 gap-4 px-4 py-2 text-[12px] font-semibold uppercase tracking-wide text-(--color-black-alpha-50)">
            <div className="col-span-1 text-center">Rank</div>
            <div className="col-span-5 sm:col-span-4">Asset</div>
            <div className="col-span-3 text-right">Users</div>
            <div className="col-span-3 sm:col-span-4 text-right">Last Withdrawn</div>
          </div>
          <div className="flex flex-col gap-2">
            {ASSETS_RANKING.map((item, i) => (
              <div key={item.symbol} className="grid grid-cols-12 gap-4 items-center payout-card px-4 py-3 transition-colors hover:bg-black/5">
                <div className="col-span-1 text-center font-bold text-black/40 text-[14px]">
                  {i + 1}
                </div>
                <div className="col-span-5 sm:col-span-4 flex items-center gap-2">
                  <AssetIcon type={item.symbol} className="w-6 h-6 sm:w-8 sm:h-8" />
                  <span className="font-semibold text-[14px] text-black">{item.symbol}</span>
                </div>
                <div className="col-span-3 text-right font-medium text-[13px] text-black/80">
                  {item.users.toLocaleString()}
                </div>
                <div className="col-span-3 sm:col-span-4 text-right text-[12px] text-black/50">
                  {item.lastTime}
                </div>
              </div>
            ))}
          </div>
        </div>`;

const newAssetsTab = `<div className="rounded-2xl overflow-hidden mt-2">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#e5e7eb] border-none text-[12px] md:text-[14px] font-medium text-black/40">
                <tr>
                  <th className="px-2 md:px-4 py-3 md:py-4 w-10 md:w-16 text-center">
                    #
                  </th>
                  <th className="px-2 md:px-4 py-3 md:py-4">Asset</th>
                  <th className="px-2 md:px-4 py-3 md:py-4 text-right">Users</th>
                  <th className="px-2 md:px-4 py-3 md:py-4 text-right">Last Withdrawn</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 bg-transparent text-[14px] md:text-[16px]">
                {ASSETS_RANKING.map((item, index) => (
                  <tr
                    key={item.symbol}
                    className="hover:bg-black/5 transition-colors"
                  >
                    <td className="px-2 md:px-4 py-3 md:py-4 text-black/60 font-medium text-center">
                      {index + 1}
                    </td>
                    <td className="px-2 md:px-4 py-3 md:py-4">
                      <div className="flex items-center space-x-2 md:space-x-4">
                        <AssetIcon type={item.symbol} className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-transparent" />
                        <span className="font-semibold text-[14px] sm:text-[16px] text-black">{item.symbol}</span>
                      </div>
                    </td>
                    <td className="px-2 md:px-4 py-3 md:py-4 text-right">
                      <div className="font-medium text-[13px] sm:text-[15px] text-black/80">
                        {item.users.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-2 md:px-4 py-3 md:py-4 text-right">
                      <span className="text-[12px] sm:text-[14px] text-zinc-400">
                        {item.lastTime}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>`;

content = content.replace(oldAssetsTab, newAssetsTab);
fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
console.log('Fixed PayoutPage assets rank styling');
