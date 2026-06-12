import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { useHomeData } from "./api/home";
import type { Banner, Game } from "./api/home";
import { Shell, Wallet } from "lucide-react";

import BannerSkeleton from "./components/BannerSkeleton";
import GamesSkeleton from "./components/GamesSkeleton";
import GameSection from "./components/GameSection";
import BannerSection from "./components/BannerSection";
import BottomNav from "./components/BottomNav";
import TabSwitch from "./components/TabSwitch";
import Footer from "./components/Footer";
import { SignInModal } from "./components/SignInModal";
import { MoneyPage } from "./components/MoneyPage";
import "./index.css";

function App() {
  const { banners, games, gamesLoading, bannersLoading } = useHomeData();
  const [windowWidth, setWindowWidth] = useState(() =>
    typeof window === "undefined" ? 768 : window.innerWidth,
  );
  const [activeTab, setActiveTab] = useState<
    "money" | "play" | "inbox" | "history"
  >("play");
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);
  const [userAccount, setUserAccount] = useState<string | null>(null);

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
          onSignInClick={() => setSignInModalOpen(true)}
        />
      );
    }
    if (activeTab === "inbox") {
      return (
        <div className="text-center py-20 flex-1">
          <h2 className="text-3xl font-bold text-black mb-4">Inbox Page</h2>
          <p className="text-black/65">Coming soon...</p>
        </div>
      );
    }
    if (activeTab === "history") {
      return (
        <div className="text-center py-20 flex-1">
          <h2 className="text-3xl font-bold text-black mb-4">History Page</h2>
          <p className="text-black/65">Coming soon...</p>
        </div>
      );
    }

    // Play tab
    if (isDesktopView) {
      return (
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
      {activeTab !== "money" && (
        <div className="home-header">
          <div className="home-header-content">
            <div className="logo-area">
              <Shell className="text-purple-600 mr-2" size={32} />
            </div>
            <span className="title">Randseed</span>
            {userAccount ? (
              <button
                className="community-btn px-3 font-mono"
                onClick={() => {
                  // optionally user could log out, here we just reopen modal or do nothing
                  setSignInModalOpen(true);
                }}
              >
                <Wallet size={16} />
                {userAccount.length > 10
                  ? `${userAccount.slice(0, 6)}...${userAccount.slice(-4)}`
                  : userAccount}
              </button>
            ) : (
              <button
                className="community-btn"
                onClick={() => setSignInModalOpen(true)}
              >
                <Wallet size={16} /> Sign In
              </button>
            )}
          </div>
        </div>
      )}

      <div
        className={
          isDesktop ? "desktop-home-content flex flex-col flex-1" : "flex-1"
        }
      >
        {renderActiveTabContent(isDesktop)}

        {activeTab === "play" && (
          <>
            <Footer />
          </>
        )}
      </div>

      <TabSwitch activePage={activeTab} setActivePage={setActiveTab} />

      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={(accountId) => {
          setSignInModalOpen(false);
          if (typeof accountId === "string") setUserAccount(accountId);
        }}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
