import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useNavigate, useLocation } from "react-router";
import { ErrorBoundary } from "./ErrorBoundary";
import { useHomeData } from "./api/home";
import type { Banner, Game } from "./api/home";
import { WltLogo } from "./components/WltLogo";
import { Wallet, User, Trophy, ChevronLeft } from "lucide-react";

import BannerSkeleton from "./components/BannerSkeleton";
import GamesSkeleton from "./components/GamesSkeleton";
import GameSection from "./components/GameSection";
import BannerSection from "./components/BannerSection";
import BottomNav from "./components/BottomNav";
import TabSwitch from "./components/TabSwitch";
import Footer from "./components/Footer";
import { WalletConnectModal } from "./components/WalletConnectModal";
import { AccountInfoModal } from "./components/AccountInfoModal";
import { ProfileSettingModal } from "./components/ProfileSettingModal";
import { MoneyPage } from "./money-page/MoneyPage";
import RanksPage from "./components/RanksPage";
import { UserInfoEdit } from "./components/UserInfoEdit";
import { WltHeaderPrice } from "./components/WltHeaderPrice";
import { getRandomSysAvatar, getSysAvatar } from "./utils/avatar";
import svgPaths from "./imports/svg-401s87trfk";
import "./index.css";

function App() {
  const { banners, games, gamesLoading, bannersLoading } = useHomeData();
  const [windowWidth, setWindowWidth] = useState(() =>
    typeof window === "undefined" ? 768 : window.innerWidth,
  );
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname.replace("/", "");
  const validTabs = ["money", "play", "inbox", "payout", "rank"];
  const activeTab = (validTabs.includes(path) ? path : "play") as
    | "money"
    | "play"
    | "inbox"
    | "payout"
    | "rank";
  const setActiveTab = (tab: string) => navigate(`/${tab}`);

  const [isWalletConnectModalOpen, setWalletConnectModalOpen] = useState(false);
  const [isAccountModalOpen, setAccountModalOpen] = useState(false);
  const [isUserInfoModalOpen, setUserInfoModalOpen] = useState(false);
  const [isProfileSettingModalOpen, setProfileSettingModalOpen] =
    useState(false);
  const [userAccount, setUserAccount] = useState<string | null>(null);
  const [pendingUserAccount, setPendingUserAccount] = useState<string | null>(
    null,
  );
  const [profile, setProfile] = useState<any>(() => {
    try {
      const saved = localStorage.getItem("user_profile_data");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const isDesktop = windowWidth >= 768;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const className = "home-desktop-full-width";

    if (isDesktop) {
      html.classList.add(className);
    } else {
      html.classList.remove(className);
    }

    return () => {
      html.classList.remove(className);
    };
  }, [isDesktop]);

  const onBannerClick = (banner: Banner) => {
    if (!banner.linkUrl) return;
    if (banner.linkType === 0) window.location.href = banner.linkUrl;
    else window.open(banner.linkUrl, "_blank");
  };

  const onGameClick = (game: Game) => {
    window.location.href = game.frontend_route || game.route || "/";
  };

  const renderActiveTabContent = (isDesktopView: boolean) => {
    if (activeTab === "money") {
      return (
        <MoneyPage
          isDesktop={isDesktopView}
          userAccount={userAccount}
          onSignInClick={() => setWalletConnectModalOpen(true)}
          onAccountClick={() => setAccountModalOpen(true)}
          onEditProfileClick={() => setUserInfoModalOpen(true)}
          profile={profile}
        />
      );
    }
    if (activeTab === "inbox") {
      return (
        <div className="text-center py-3 flex-1">
          <h2 className="text-sm font-bold text-black mb-4">Inbox Page</h2>
          <p className="text-black/65">Coming soon...</p>
        </div>
      );
    }
    if (activeTab === "rank") {
      return <RanksPage />;
    }
    if (activeTab === "payout") {
      return (
        <div className="text-center py-20 flex-1">
          <h2 className="text-3xl font-bold text-black mb-4">Payout Page</h2>
          <p className="text-black/65">Coming soon...</p>
        </div>
      );
    }

    // Play tab
    if (isDesktopView) {
      return (
        <div className="desktop-home-content w-full">
          <div className="desktop-home-container">
            {bannersLoading ? (
              <BannerSkeleton desktop />
            ) : (
              <BannerSection
                banners={banners}
                onBannerClick={onBannerClick}
                isDesktop={true}
              />
            )}
            <div className="desktop-home-games">
              {gamesLoading ? (
                <>
                  <GamesSkeleton title="Rand Game" desktop />
                  <GamesSkeleton title="Rand Ball" desktop />
                </>
              ) : (
                games.map((game, i) => (
                  <GameSection
                    key={i}
                    title={game[0]}
                    games={game[1]}
                    onGameClick={onGameClick}
                    isDesktop={true}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        {bannersLoading ? (
          <BannerSkeleton />
        ) : (
          <BannerSection
            banners={banners}
            onBannerClick={onBannerClick}
            isDesktop={false}
          />
        )}
        <div className="home-games">
          {gamesLoading ? (
            <>
              <GamesSkeleton title="Rand Game" />
              <GamesSkeleton title="Rand Ball" />
            </>
          ) : (
            games.map((game, index) => (
              <GameSection
                key={index}
                title={game[0]}
                games={game[1]}
                onGameClick={onGameClick}
              />
            ))
          )}
        </div>
      </>
    );
  };

  return (
    <div
      className={`home-page flex flex-col relative${isDesktop ? " desktop-mode" : ""}`}
    >
      <div className="home-header">
        <div className="home-header-content py-[12px] md:py-[10px] px-2 md:px-4">
          <div className="flex items-center gap-2 md:gap-3 justify-start">
            <div
              className="flex items-center justify-center shrink-0 cursor-pointer"
              onClick={() => setActiveTab("play")}
            >
              <div className="flex items-center justify-center shrink-0">
                <WltLogo className="w-8 h-8 md:w-[32px] md:h-[32px]" />
              </div>
            </div>
            <span
              className="text-[18px] md:text-[16px] font-bold text-black  tracking-tight whitespace-nowrap shrink-0 cursor-pointer"
              onClick={() => setActiveTab("play")}
            >
              Randseed
            </span>

            <a
              href="https://jup.ag/tokens/G45pgo5kzUMPnXGqrLeDXXgxSrVx6ssXJiJTDWpHjups"
              target="_blank"
              rel="noreferrer"
              className="flex items-center hover:opacity-80 transition-opacity shrink-0 bg-white/40 backdrop-blur-sm px-1.5 py-1 md:px-3 rounded-lg border border-black/5"
            >
              <WltHeaderPrice />
            </a>
          </div>

          <div className="flex items-center gap-2.5 md:gap-4 shrink-0">
            {userAccount ? (
              <button
                className="account-toggle-button w-8 h-8 rounded-full overflow-hidden border border-black/10 bg-[#f0f2f5] text-slate-500 transition-colors shadow-sm relative z-[101]"
                onClick={() =>
                  isAccountModalOpen
                    ? setAccountModalOpen(false)
                    : setAccountModalOpen(true)
                }
              >
                {profile?.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#f0f2f5] text-slate-500">
                    <User size={16} strokeWidth={2.5} />
                  </div>
                )}
              </button>
            ) : (
              <button
                className="signin-btn"
                onClick={() => setWalletConnectModalOpen(true)}
              >
                <Wallet size={16} /> Sign In
              </button>
            )}

            <button
              className={`flex items-center justify-center transition-colors cursor-pointer ${activeTab === "inbox" ? "text-black" : "text-black/65 hover:text-black"}`}
              onClick={() => setActiveTab("inbox")}
            >
              <svg
                className="w-6 h-6 md:w-[20px] md:h-[20px]"
                viewBox="0 0 27 27"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M22.3712 21.8696H4.62748C4.20547 21.8781 3.79709 21.731 3.49198 21.4608C3.18686 21.1906 3.00994 20.8193 3.00004 20.4284V18.843C2.99735 18.4682 3.14805 18.1064 3.42177 17.8304L5.46391 15.322V10.6353C5.42869 8.58238 6.22068 6.59096 7.68525 5.04991C8.34386 4.37528 9.13817 3.82611 10.0237 3.43315C10.2712 3.32901 10.4645 3.13883 10.5619 2.90372C10.7802 2.34541 11.179 1.86304 11.704 1.52236C12.2289 1.18168 12.8546 0.999278 13.4955 1.00001H13.5019C14.1435 0.998631 14.7699 1.18073 15.2957 1.52144C15.8214 1.86216 16.2208 2.34488 16.4394 2.90372C16.5368 3.13883 16.7301 3.32901 16.9776 3.43315C17.8622 3.82637 18.6556 4.37552 19.3135 5.04991C20.7781 6.59093 21.5701 8.58237 21.5348 10.6353V15.322L23.5782 17.8304C23.852 18.1064 24.0026 18.4682 24 18.843V20.4284C23.9902 20.8195 23.8133 21.1911 23.508 21.4614C23.2027 21.7318 22.7935 21.8782 22.3712 21.8696ZM22.3533 18.8424L20.3054 16.3358C20.0303 16.0599 19.8794 15.697 19.8837 15.3214V10.6353C19.9173 8.96324 19.2786 7.33931 18.0918 6.07913C17.5327 5.50449 16.8505 5.04411 16.0887 4.72738C15.9995 4.69023 15.9091 4.65545 15.8173 4.62304C15.5867 4.54799 15.3807 4.41933 15.2191 4.2494C15.0575 4.07946 14.9458 3.87394 14.8945 3.65251C14.8821 3.58113 14.8637 3.51075 14.8395 3.44204C14.7606 3.23342 14.6261 3.04667 14.4484 2.89916C14.2707 2.75165 14.0556 2.64818 13.8232 2.59839C13.8091 2.59839 13.7957 2.59839 13.7822 2.59424C13.5951 2.55726 13.4017 2.55726 13.2146 2.59424C13.2005 2.59424 13.1877 2.59424 13.1736 2.59839C12.9413 2.64827 12.7263 2.75178 12.5488 2.89928C12.3712 3.04679 12.2368 3.23349 12.158 3.44204C12.1323 3.51063 12.1126 3.58101 12.0991 3.65251C12.0478 3.87394 11.9361 4.07946 11.7745 4.2494C11.6129 4.41933 11.4069 4.54799 11.1763 4.62304C11.085 4.65545 10.9945 4.69023 10.9049 4.72738C10.1431 5.04416 9.46091 5.50452 8.90183 6.07913C7.71502 7.33931 7.07634 8.96324 7.10991 10.6353V15.322C7.11405 15.6976 6.96319 16.0604 6.68817 16.3364L4.64028 18.843L4.62876 20.4124L13.4994 20.4201L22.37 20.4124L22.3533 18.8424ZM12.037 23.0518C12.3834 23.3225 12.8127 23.4859 13.2645 23.519C13.3426 23.5261 13.4213 23.5238 13.4994 23.5238C13.5774 23.5238 13.6562 23.5238 13.7342 23.519C14.186 23.4859 14.6153 23.3225 14.9617 23.0518C15.1875 22.8689 15.3674 22.6424 15.489 22.3884H17.1875C17.0117 23.0591 16.616 23.6628 16.0548 24.1166C15.4191 24.625 14.6211 24.9264 13.7829 24.9745C13.6875 24.9846 13.596 25 13.5 25C13.404 25 13.3118 24.9828 13.2165 24.9769C12.3783 24.9288 11.5803 24.6274 10.9446 24.119C10.3834 23.6652 9.98766 23.0614 9.81186 22.3908H11.5103C11.632 22.6448 11.812 22.8712 12.0377 23.0542L12.037 23.0518Z"
                  fill="currentColor"
                  fillOpacity={activeTab === "inbox" ? "1" : "0.65"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* PC Desktop Categories Sub-Nav */}
        {isDesktop && (
          <div className="border-t border-black/5 hidden md:flex items-center py-2">
            <div className="flex items-center gap-4 w-full max-w-[var(--max-content-width-pc)] mx-auto px-0">
              {[
                { id: "money", label: "Money" },
                { id: "play", label: "Play" },
                { id: "rank", label: "Rank" },
                { id: "payout", label: "Payout" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 h-8 rounded-full font-bold text-[14px] transition-colors capitalize flex items-center ${
                    activeTab === tab.id
                      ? "bg-white text-black shadow-[0_1px_4px_rgba(0,0,0,0.06)] border border-black/5"
                      : "text-slate-500 hover:text-black hover:bg-black/5"
                  }`}
                >
                  <div className="mr-1.5 w-4 h-4 flex items-center justify-center">
                    {tab.id === "money" && (
                      <svg
                        className="w-full h-full"
                        viewBox="0 0 27 27"
                        fill="none"
                      >
                        <circle
                          cx="13.5"
                          cy="13.5"
                          fill={activeTab === "money" ? "currentColor" : "none"}
                          r="13.5"
                        />
                        {activeTab !== "money" && (
                          <circle
                            cx="13.5"
                            cy="13.5"
                            stroke="currentColor"
                            strokeWidth="1"
                            fill="none"
                            r="13"
                          />
                        )}
                        <path d={svgPaths.p1bf39e00} fill={activeTab === "money" ? "#fff" : "currentColor"} />
                      </svg>
                    )}
                    {tab.id === "play" && (
                      <svg
                        className="w-full h-full"
                        viewBox="0 0 30 30"
                        fill="none"
                      >
                        <circle
                          cx="15"
                          cy="15"
                          fill={activeTab === "play" ? "currentColor" : "none"}
                          r="15"
                        />
                        {activeTab !== "play" && (
                          <circle
                            cx="15"
                            cy="15"
                            stroke="currentColor"
                            strokeWidth="1"
                            fill="none"
                            r="14.5"
                          />
                        )}
                        <g>
                          <path
                            d={svgPaths.p170a5300}
                            stroke={
                              activeTab === "play" ? "#fff" : "currentColor"
                            }
                            strokeWidth="1.4728"
                          />
                          <path
                            d={svgPaths.p12adf040}
                            stroke={
                              activeTab === "play" ? "#fff" : "currentColor"
                            }
                            strokeWidth="1.26015"
                          />
                          <circle
                            cx="20.8592"
                            cy="20.1715"
                            r="2.27122"
                            stroke={
                              activeTab === "play" ? "#fff" : "currentColor"
                            }
                            strokeWidth="1.18139"
                          />
                        </g>
                      </svg>
                    )}
                    {tab.id === "rank" && (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 30 30" fill="none">
                          <circle cx="15" cy="15" fill={activeTab === "rank" ? "currentColor" : "none"} r="15" />
                          {activeTab !== "rank" && (
                            <circle cx="15" cy="15" stroke="currentColor" strokeWidth="1" fill="none" r="14.5" />
                          )}
                        </svg>
                        <Trophy
                          size={10}
                          strokeWidth={activeTab === "rank" ? 2 : 1.5}
                          color={activeTab === "rank" ? "#fff" : "currentColor"}
                          className="relative z-10"
                        />
                      </div>
                    )}
                    {tab.id === "payout" && (
                      <svg
                        className="w-full h-full"
                        viewBox="0 0 27 27"
                        fill="none"
                      >
                        <circle cx="13.5" cy="13.5" fill={activeTab === "payout" ? "currentColor" : "none"} r="13.5" />
                        {activeTab !== "payout" && (
                          <circle cx="13.5" cy="13.5" stroke="currentColor" strokeWidth="1" fill="none" r="13" />
                        )}
                        <path d={svgPaths.p2891d1d0} fill={activeTab === "payout" ? "#fff" : "currentColor"} />
                      </svg>
                    )}
                  </div>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div
        className={
          isDesktop
            ? "desktop-home-content flex flex-col flex-1"
            : "flex-1 pb-[80px]"
        }
      >
        {renderActiveTabContent(isDesktop)}

        {["money", "play", "rank", "payout"].includes(activeTab) && <Footer />}
      </div>

      {!isDesktop && (
        <TabSwitch activePage={activeTab} setActivePage={setActiveTab as any} />
      )}

      <WalletConnectModal
        isOpen={isWalletConnectModalOpen}
        onClose={(accountId) => {
          setWalletConnectModalOpen(false);
          if (typeof accountId === "string") {
            setPendingUserAccount(accountId);
            setProfileSettingModalOpen(true);
          }
        }}
      />

      <ProfileSettingModal
        isOpen={isProfileSettingModalOpen}
        onClose={() => {
          setProfileSettingModalOpen(false);
          setPendingUserAccount(null);
        }}
        onSubmit={(data) => {
          setProfile(data);
          setUserAccount(pendingUserAccount);
          setProfileSettingModalOpen(false);
        }}
        userAccount={pendingUserAccount}
      />

      {userAccount && (
        <AccountInfoModal
          isOpen={isAccountModalOpen}
          onClose={() => setAccountModalOpen(false)}
          userAccount={userAccount}
          profileInfo={profile || undefined}
        />
      )}

      {userAccount && (
        <UserInfoEdit
          isOpen={isUserInfoModalOpen}
          onClose={() => setUserInfoModalOpen(false)}
          onSubmit={(data) => {
            setProfile(data);
            localStorage.setItem("user_profile_data", JSON.stringify(data));
          }}
          userAccount={userAccount}
          profile={profile}
        />
      )}
    </div>
  );
}

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>,
  );
}
