import React, { useState } from "react";
import {
  Gift,
  ChevronRight,
  Info,
  Star,
  Share2,
  Copy,
  ChevronLeft,
  Link,
} from "lucide-react";
import { InviteRecord } from "../components/InviteRecord";
import { WLPointRecord } from "../components/WLPointRecord";
import { WLPointRedeem } from "../components/WLPointRedeem";

interface RewardsTabProps {
  isDesktop: boolean;
  userAccount: string | null;
  onSignInClick: () => void;
}

export function RewardsTab({
  isDesktop,
  userAccount,
  onSignInClick,
}: RewardsTabProps) {
  const [showInviteRecord, setShowInviteRecord] = useState(false);
  const [showMobileInvite, setShowMobileInvite] = useState(false);
  const [pointView, setPointView] = useState<"default" | "record" | "redeem">("default");
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://randseed.org/?invite=M82A5");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSaveInvitePicture = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 600;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw background (Linear Gradient)
    const gradient = ctx.createLinearGradient(0, 0, 0, 600);
    gradient.addColorStop(0, "#E6E6FA"); // Lavender
    gradient.addColorStop(1, "#B0C4DE"); // Light Steel Blue
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw decorative elements
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.beginPath();
    ctx.arc(350, 100, 80, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(50, 500, 120, 0, Math.PI * 2);
    ctx.fill();

    // Draw White Card
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "rgba(0, 0, 0, 0.1)";
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 10;
    // rounded rectangle logic
    const drawRoundRect = (
      x: number,
      y: number,
      w: number,
      h: number,
      r: number,
    ) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
      ctx.fill();
    };
    drawRoundRect(40, 80, 320, 440, 24);

    // reset shadow
    ctx.shadowColor = "transparent";

    // Draw text
    ctx.fillStyle = "#000000";
    ctx.font = "bold 28px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Invite Friends", 200, 140);

    ctx.font = "15px sans-serif";
    ctx.fillStyle = "#666666";
    ctx.fillText("Scan to play and win!", 200, 180);

    // Draw QR Code
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      ctx.drawImage(img, 110, 220, 180, 180);

      // Draw link text
      ctx.fillStyle = "#000000";
      ctx.font = "14px monospace";
      ctx.fillText("randseed.org/?invite=M82A5", 200, 440);

      // Trigger download
      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "invite_poster.png";
      a.click();
    };
    img.src =
      "https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://randseed.org";
  };
  const inviteFriendsContent = (
    <div className="bg-[#f0f2f5] rounded-2xl sm:p-6 p-4 border border-black/5 relative overflow-hidden flex flex-col h-full min-h-[380px]">
      <div className="flex items-center justify-between mb-3 w-full">
        <h2 className="text-[20px] font-bold text-black hidden md:block">
          Invite Friends
        </h2>
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-[14px] text-black/60">
            invited <span className="font-bold text-black mx-1">0</span> friends
          </span>
          <button
            onClick={() => setShowInviteRecord(true)}
            className="text-black hover:bg-black/5 p-1 rounded-full transition-colors -mr-1"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="mb-6 flex-1">
        <p className="text-[14px] text-black/70 mb-4 font-medium leading-relaxed">
          New User gets $WLT Airdrop and Free Gcoins
          <br />
          Inviter gets up to 5% earnings from every friend's spending
        </p>

        <div className="flex items-center gap-3 mb-5">
          <div className="flex items-center gap-2 text-[12px] text-black/60 bg-white border border-black/10 px-3 py-1.5 rounded-lg shadow-sm">
            <Link className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">https://randseed.org/?invite=M82A5</span>
            <button
              onClick={handleCopyLink}
              className="hover:text-black transition-colors"
            >
              {isCopied ? (
                <span className="text-green-500 font-bold">✓</span>
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
          <button
            onClick={handleSaveInvitePicture}
            className="w-[80px] h-[28px] rounded-[14px] border border-black text-black font-semibold text-[13px] hover:bg-black/5 transition-colors flex items-center justify-center"
          >
            Save
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-xl p-4 flex flex-col items-center justify-center border border-black/5 shadow-sm">
            <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center mb-2">
              <div className="w-6 h-6 rounded-full bg-yellow-400"></div>
            </div>
            <span className="text-[13px] font-bold">Gcoin Bonus</span>
          </div>
          <div className="bg-white rounded-xl p-4 flex flex-col items-center justify-center border border-black/5 shadow-sm">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-2">
              <div className="w-6 h-6 rounded-full bg-blue-400"></div>
            </div>
            <span className="text-[13px] font-bold">$WLT Airdrop</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-200 to-indigo-200 rounded-xl p-6 flex items-center justify-between mb-8">
          <span className="text-[14px] font-bold text-purple-900 w-1/2">
            50% of Platform Revenue Return to Invites Rewards
          </span>
          <div className="w-16 h-16 rounded-full bg-indigo-500/20 border-4 border-indigo-400"></div>
        </div>

        <div className="flex items-center justify-between bg-white rounded-xl p-4 border border-black/5 shadow-sm">
          <span className="text-[14px] font-medium text-black/80 max-w-[200px]">
            Scan the QR code to play and win!
          </span>
          <div className="w-24 h-24 bg-black/5 rounded-lg border border-black/10 overflow-hidden relative">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://randseed.org"
              alt="QR"
              className="w-full h-full object-cover mix-blend-multiply opacity-80"
            />
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <div className="hidden"></div>
      </div>
    </div>
  );
  return (
    <>
      <div className="flex items-center justify-between mb-3 px-1 mt-2">
        <h2 className="text-[16px] font-[600] text-slate-800">
          Tasks & Rewards
        </h2>
      </div>

      <div
        className={`money-cards-grid ${isDesktop ? "grid grid-cols-2 gap-4 items-start" : "flex flex-col gap-3"}`}
      >
        <div className="flex flex-col gap-3">
          {/* First Deposit Bonus Widget */}
          <div
            className="bg-[#f0f2f5] rounded-2xl px-4 sm:px-6 flex items-center justify-between cursor-pointer border border-black/5 w-full shadow-sm"
            style={{ height: "64px" }}
            onClick={onSignInClick}
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

          {/* Invite Friends Widget - Mobile Only */}
          {!isDesktop && (
            <div
              className="bg-[#f0f2f5] rounded-2xl px-4 sm:px-6 flex items-center justify-between cursor-pointer border border-black/5 w-full shadow-sm"
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
          )}

          {/* WL Point Card */}
          {pointView === "record" && isDesktop ? (
            <WLPointRecord onBack={() => setPointView("default")} isDesktop />
          ) : pointView === "redeem" ? (
            <WLPointRedeem onBack={() => setPointView("default")} isDesktop={isDesktop} />
          ) : (
            <div className="bg-[#f0f2f5] rounded-3xl p-4 sm:p-6 shadow-sm border border-black/5 font-sans relative">
              <div className="flex flex-col mb-5 border-b border-black/5 pb-5">
                <div className="flex items-center justify-between mb-3 w-full">
                  <h3 className="font-semibold text-[15px] text-black flex items-center gap-1.5 relative group">
                    WL Point 
                    <Info className="w-4 h-4 text-slate-400 cursor-pointer" />
                    <div className="absolute top-full mt-2 left-0 w-[240px] bg-white p-3 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-black/5 text-[12px] text-black/80 font-normal invisible group-hover:visible z-10 transition-all opacity-0 group-hover:opacity-100">
                      Earn Rewards! 100 Points = 1 USDT. Redeem points for Bonus and WL tokens (token coming soon).
                      <div className="absolute -top-1 left-24 w-2 h-2 bg-white border-t border-l border-black/5 transform rotate-45"></div>
                    </div>
                  </h3>
                  <button 
                    onClick={() => setPointView("record")} 
                    className="text-black hover:bg-black/5 p-1 rounded-full transition-colors -mr-1"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-[30px] h-[30px] rounded-full bg-[#FFD700] flex items-center justify-center shrink-0">
                      <Star className="w-[18px] h-[18px] text-white fill-white" />
                    </div>
                    <span className="text-[32px] font-bold text-black leading-none font-serif tracking-tight ml-2">
                      {userAccount ? "53" : "0"}
                    </span>
                  </div>
                  <button
                    className="w-[80px] h-[28px] border border-[#111] bg-transparent text-[#111] rounded-[14px] flex items-center justify-center text-[12px] font-semibold transition-colors hover:bg-black/5"
                    onClick={() => setPointView("redeem")}
                  >
                    Redeem
                  </button>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center px-1">
                  <div>
                    <h4 className="font-semibold text-[15px] text-black leading-tight">
                      Daily Check-in
                    </h4>
                    <p className="text-[13px] text-black/40 mt-2">
                      Earn points by clicking the button
                    </p>
                  </div>
                  <button
                    className="w-[80px] h-[28px] bg-[#333] text-white rounded-[14px] flex items-center justify-center text-[12px] font-semibold"
                    onClick={onSignInClick}
                  >
                    {userAccount ? "Claimed" : "Get Points"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Display only on Desktop */}
        {isDesktop && (
          <div className="flex flex-col gap-4">
            {!userAccount ? (
              <div
                className="bg-[#f0f2f5] rounded-2xl px-4 sm:px-6 flex items-center justify-between cursor-pointer border border-black/5 w-full shadow-sm"
                style={{ height: "64px" }}
                onClick={onSignInClick}
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
            ) : showInviteRecord ? (
              <InviteRecord
                onBack={() => setShowInviteRecord(false)}
                isDesktop
              />
            ) : (
              inviteFriendsContent
            )}
          </div>
        )}
      </div>

      {/* Mobile Full Screen Invite Flow */}
      {!isDesktop && showMobileInvite && (
        <div className="fixed inset-0 z-[999] bg-[#f0f2f5] overflow-y-auto fade-in flex flex-col">
          <div 
            className="flex flex-row items-center justify-start px-4 pb-3 sticky top-0 bg-[#f0f2f5] z-10 border-b border-black/5"
            style={{ paddingTop: 'max(env(safe-area-inset-top), 16px)' }}
          >
            <button
              onClick={() => setShowMobileInvite(false)}
              className="hover:opacity-80 transition-opacity flex items-center font-medium pr-4"
            >
              <ChevronLeft
                strokeWidth={2.5}
                size={24}
                className="mr-1 text-black"
              />
              <span className="text-[16px] font-medium text-black">
                Invite Friends
              </span>
            </button>
          </div>
          <div className="p-4 flex-1">{inviteFriendsContent}</div>
        </div>
      )}

      {!isDesktop && showInviteRecord && (
        <InviteRecord onBack={() => setShowInviteRecord(false)} />
      )}

      {!isDesktop && pointView === "record" && (
        <WLPointRecord onBack={() => setPointView("default")} />
      )}
    </>
  );
}
