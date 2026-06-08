import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { useHomeData } from "./api/home";
import type { Banner, Game } from "./api/home";
import Slider from "react-slick";
import { Shell, Wallet } from "lucide-react";

import BannerSkeleton from "./components/BannerSkeleton";
import GamesSkeleton from "./components/GamesSkeleton";
import GameSection from "./components/GameSection";
import DesktopBannerSection from "./components/DesktopBannerSection";
import DesktopGameSection from "./components/DesktopGameSection";
import BottomNav from "./components/BottomNav";
import { TabSwitch } from "./components/TabSwitch";
import Footer from "./components/Footer";
import "./index.css";

function App() {
  const { banners, games, gamesLoading, bannersLoading } = useHomeData();
  const [windowWidth, setWindowWidth] = useState(() => typeof window === "undefined" ? 768 : window.innerWidth);
  const [activeTab, setActiveTab] = useState<"money" | "play" | "inbox" | "history">("play");

  const isDesktop = windowWidth >= 768;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onBannerClick = (banner: Banner) => {
    if (!banner.linkUrl) return;
    if (banner.linkType === 0) window.location.href = banner.linkUrl;
    else window.open(banner.linkUrl, "_blank");
  };

  const onGameClick = (game: Game) => {
    window.location.href = game.frontend_route || game.route || "/";
  };

  const mobileSliderSettings = {
    dots: true,
    infinite: (banners?.length || 0) > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: (banners?.length || 0) > 1,
    autoplaySpeed: 5000,
    arrows: false,
  };

  const renderActiveTabContent = (isDesktopView: boolean) => {
    if (activeTab === "money") {
      return (
        <div className="text-center py-20 flex-1">
          <h2 className="text-3xl font-bold text-black mb-4">Money Page</h2>
          <p className="text-black/65">Coming soon...</p>
        </div>
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
          {bannersLoading ? <BannerSkeleton desktop /> : <DesktopBannerSection banners={banners} onBannerClick={onBannerClick} />}
          <div className="desktop-home-games">
            {gamesLoading ? (
              <><GamesSkeleton title="Rand Game" desktop /><GamesSkeleton title="Rand Ball" desktop /></>
            ) : games.map((game, i) => <DesktopGameSection key={i} title={game[0]} games={game[1]} onGameClick={onGameClick} />)}
          </div>
        </div>
      );
    }

    return (
      <>
        {bannersLoading ? <BannerSkeleton /> : banners?.length ? (
          <div className="home-hero">
            <Slider {...mobileSliderSettings}>
              {banners.map((banner, index) => (
                <div key={banner.id}>
                  <img
                    onClick={() => onBannerClick(banner)}
                    className="hero-image"
                    src={banner.imageUrl}
                    alt="banner"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </Slider>
          </div>
        ) : null}
        <div className="home-games">
          {gamesLoading ? (
            <><GamesSkeleton title="Rand Game" /><GamesSkeleton title="Rand Ball" /></>
          ) : games.map((game, index) => <GameSection key={index} title={game[0]} games={game[1]} onGameClick={onGameClick} />)}
        </div>
      </>
    );
  };

  return (
    <div className={`home-page flex flex-col relative${isDesktop ? " desktop-mode pt-[68rem]" : " pb-[80rem]"}`}>
      <div className="home-header">
        <div className="home-header-content">
          <div className="logo-area">
            <Shell className="text-purple-600 mr-2" size={32} />
          </div>
          <span className="title">Randseed</span>
          <button className="community-btn">
            <Wallet size={16} /> Sign In
          </button>
        </div>
      </div>

      <div className={isDesktop ? "desktop-home-content flex flex-col flex-1" : "flex-1"}>
        {renderActiveTabContent(isDesktop)}
        
        {activeTab === "play" && (
          <>
            <Footer />
          </>
        )}
      </div>

      {isDesktop ? (
        <TabSwitch activePage={activeTab} setActivePage={setActiveTab} />
      ) : (
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      )}
    </div>
  );
}

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
