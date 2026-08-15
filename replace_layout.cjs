const fs = require('fs');
let code = fs.readFileSync('src/frontend/money/tabs/RewardsTab.tsx', 'utf8');

// Find the start of the return block
const startIdx = code.indexOf('return (');
const endIdx = code.lastIndexOf(');');

if (startIdx !== -1 && endIdx !== -1) {
  const newReturn = `return (
    <>
      <div className="flex items-center justify-between mb-3 px-1 mt-2">
        <h2 className="text-[16px] font-[600] text-slate-800">
          Tasks & Rewards
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        {/* First Deposit Bonus Widget */}
        <div
          className="bg-[#f0f2f5] rounded-2xl px-4 sm:px-6 flex items-center justify-between cursor-pointer border border-black/5 w-full shadow-sm hover:bg-slate-100 transition-colors"
          style={{ height: "64px" }}
          onClick={() => setDepositBonusView("detail")}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white shadow-sm relative overflow-hidden">
              <Gift className="w-[22px] h-[22px] text-blue-500 relative z-10" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-black leading-tight">
                First Deposit Bonus
              </h3>
              <p className="text-[12px] text-black/50 mt-2 leading-tight">
                Deposit to get 0.1 ICP bonus
              </p>
            </div>
          </div>
          <button className="text-black hover:bg-black/5 p-1 rounded-full transition-colors -mr-1">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Invite Friends Widget */}
        <div
          className="bg-[#f0f2f5] rounded-2xl px-4 sm:px-6 flex items-center justify-between cursor-pointer border border-black/5 w-full shadow-sm hover:bg-slate-100 transition-colors"
          style={{ height: "64px" }}
          onClick={() =>
            !userAccount ? onSignInClick() : setShowMobileInvite(true)
          }
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white shadow-sm relative overflow-hidden">
              <Share2
                className="w-[20px] h-[20px] text-purple-500 relative z-10"
                strokeWidth={2.5}
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-black leading-tight">
                Invite Friends
              </h3>
              <p className="text-[12px] text-black/50 mt-2 leading-tight">
                Up to 5% earnings
              </p>
            </div>
          </div>
          <button className="text-black hover:bg-black/5 p-1 rounded-full transition-colors -mr-1">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* WL Point Card */}
        <div className="bg-[#f0f2f5] rounded-3xl p-4 sm:p-6 shadow-sm border border-black/5 relative cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => setPointView("record")}>
          <div className="flex flex-col mb-5 border-b border-black/5 pb-5">
            <div className="flex items-center justify-between mb-3 w-full">
              <h3 className="font-semibold text-[15px] text-black flex items-center gap-1.5 relative group">
                WL Point 
                <Info className="w-4 h-4 text-slate-400 cursor-pointer" />
                <div className="absolute top-full mt-2 left-0 w-[240px] bg-white p-3 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-black/5 text-[12px] text-black/80 font-normal invisible group-hover:visible z-10 transition-all opacity-0 group-hover:opacity-100 cursor-default" onClick={(e) => e.stopPropagation()}>
                  Earn Rewards! 100 Points = 1 USDT. Redeem points for Bonus and WL tokens (token coming soon).
                  <div className="absolute -top-1 left-24 w-2 h-2 bg-white border-t border-l border-black/5 transform rotate-45"></div>
                </div>
              </h3>
              <button 
                className="text-black hover:bg-black/5 p-1 rounded-full transition-colors -mr-1"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-[28px] h-[28px] rounded-full bg-[#FFD700] flex items-center justify-center shrink-0">
                  <Star className="w-[18px] h-[18px] text-white fill-white" />
                </div>
                <span className="text-[24px] leading-[24px] font-bold text-black tracking-tight ml-2">
                  {userAccount ? "53" : "0"}
                </span>
              </div>
              <button
                className="w-[80px] h-[28px] border border-[#111] bg-transparent text-[#111] rounded-[14px] flex items-center justify-center text-[12px] font-semibold transition-colors hover:bg-black/5"
                onClick={(e) => { e.stopPropagation(); setPointView("redeem"); }}
              >
                Redeem
              </button>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center px-1">
              <div>
                <h4 className="font-semibold text-[15px] text-black leading-tight flex items-center gap-2">
                  Daily Check-in
                  <span className="text-[14px] font-bold text-black flex items-center gap-1.5 bg-[#FFD700]/10 px-2.5 py-0.5 rounded-full border border-[#FFD700]/20">
                    3
                  </span>
                </h4>
                <p className="text-[13px] text-black/40 mt-2">
                  Earn points by clicking the button
                </p>
              </div>
              <button
                className="w-[80px] h-[28px] bg-[#333] text-white rounded-[14px] flex items-center justify-center text-[12px] font-semibold"
                onClick={(e) => { e.stopPropagation(); onSignInClick(); }}
              >
                {userAccount ? "Claimed" : "Get Points"}
              </button>
            </div>
          </div>
        </div>

        {/* Locked Tokens Card */}
        <div 
          className="bg-[#f0f2f5] rounded-3xl p-4 sm:p-6 shadow-sm border border-black/5 cursor-pointer hover:bg-slate-100 transition-colors"
          onClick={() => setLockedTokenView(true)}
        >
          <div className="flex flex-col mb-5 border-b border-black/5 pb-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-[40px] h-[40px] rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                  <Lock className="w-[18px] h-[18px] text-slate-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-[15px] text-black flex items-center gap-1.5 relative group">
                    Locked Tokens
                    <Info className="w-4 h-4 text-slate-400 cursor-pointer" />
                    <div className="absolute top-full mt-2 left-0 w-[240px] bg-white p-3 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-black/5 text-[12px] text-black/80 font-normal invisible group-hover:visible z-10 transition-all opacity-0 group-hover:opacity-100 cursor-default" onClick={(e) => e.stopPropagation()}>
                      Tokens from bonus swap are locked. They will be unlocked according to the vesting schedule.
                      <div className="absolute -top-1 left-24 w-2 h-2 bg-white border-t border-l border-black/5 transform rotate-45"></div>
                    </div>
                  </h3>
                  <div className="text-[13px] text-black/50">Total: {userAccount ? "10,000" : "0"} WLT</div>
                </div>
              </div>
              <div className="text-black hover:bg-black/5 p-1 rounded-full transition-colors -mr-1">
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center px-1">
            <div>
              <div className="text-[12px] text-black/50 mb-0.5 font-medium">Ready to Claim</div>
              <div className="text-[16px] font-bold text-green-600">{userAccount ? "500" : "0"} <span className="text-[12px] font-semibold text-green-600/70">WLT</span></div>
            </div>
            <button
              className={\`px-4 h-[32px] rounded-[16px] text-[13px] font-semibold flex items-center justify-center transition-opacity \${
                userAccount ? "bg-[#333] text-white hover:opacity-90" : "bg-black/10 text-black/30 cursor-default"
              }\`}
              onClick={(e) => {
                e.stopPropagation();
                if (userAccount) {
                  // Claim logic
                } else {
                  onSignInClick();
                }
              }}
            >
              Claim
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Slide-Out Drawer Overlay */}
      {isDesktop && (depositBonusView === 'detail' || pointView !== 'default' || lockedTokenView || showMobileInvite || showInviteRecord) && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
            onClick={() => {
              setDepositBonusView("default");
              setPointView("default");
              setLockedTokenView(false);
              setShowMobileInvite(false);
              setShowInviteRecord(false);
            }}
          />
          {/* Drawer Panel */}
          <div className="relative w-[480px] max-w-full bg-[#f0f2f5] shadow-2xl animate-in slide-in-from-right-8 duration-300 flex flex-col z-10 border-l border-black/5">
            {depositBonusView === "detail" && (
              <FirstDepositBonusDetail onBack={() => setDepositBonusView("default")} isDesktop userAccount={userAccount} onSignInClick={onSignInClick} status="unclaimed" />
            )}
            {pointView === "record" && (
              <WLPointRecord onBack={() => setPointView("default")} isDesktop />
            )}
            {pointView === "redeem" && (
              <WLPointRedeem onBack={() => setPointView("default")} isDesktop={isDesktop} />
            )}
            {lockedTokenView && (
              <LockedTokenRecord onBack={() => setLockedTokenView(false)} isDesktop />
            )}
            {showMobileInvite && !showInviteRecord && (
              <div className="flex flex-col h-full bg-[#f0f2f5] p-6 relative pt-12">
                <button onClick={() => setShowMobileInvite(false)} className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-black/5 shadow-sm hover:bg-slate-50 transition-colors z-20">
                  <ChevronLeft className="w-5 h-5 text-black" />
                </button>
                {inviteFriendsContent}
              </div>
            )}
            {showInviteRecord && (
              <InviteRecord onBack={() => setShowInviteRecord(false)} isDesktop />
            )}
          </div>
        </div>
      )}

      {/* Mobile Full Screen Overlays */}
      {!isDesktop && depositBonusView === "detail" && (
        <div className="fixed inset-0 z-[999] bg-[#f0f2f5] overflow-y-auto fade-in flex flex-col">
          <FirstDepositBonusDetail
            onBack={() => setDepositBonusView("default")}
            isDesktop={false}
            userAccount={userAccount}
            onSignInClick={onSignInClick}
            status="unclaimed"
          />
        </div>
      )}

      {!isDesktop && showMobileInvite && !showInviteRecord && (
        <div className="fixed inset-0 z-[999] bg-[#f0f2f5] overflow-y-auto fade-in flex flex-col pt-12">
          <button
            onClick={() => setShowMobileInvite(false)}
            className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-black/5 shadow-sm hover:bg-slate-50 transition-colors z-20"
          >
            <ChevronLeft className="w-5 h-5 text-black" />
          </button>
          <div className="p-4 flex-1">{inviteFriendsContent}</div>
        </div>
      )}

      {!isDesktop && showInviteRecord && (
        <InviteRecord onBack={() => setShowInviteRecord(false)} />
      )}

      {!isDesktop && pointView === "record" && (
        <WLPointRecord onBack={() => setPointView("default")} />
      )}
      
      {!isDesktop && pointView === "redeem" && (
        <WLPointRedeem onBack={() => setPointView("default")} />
      )}

      {!isDesktop && lockedTokenView && (
        <LockedTokenRecord onBack={() => setLockedTokenView(false)} />
      )}
    </>`;
  
  const modified = code.substring(0, startIdx) + newReturn + code.substring(endIdx + 2);
  fs.writeFileSync('src/frontend/money/tabs/RewardsTab.tsx', modified);
  console.log('Successfully updated layout.');
} else {
  console.log('Failed to find boundaries.');
}
