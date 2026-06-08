import React, { useEffect, useState } from "react";
import { useHomeData } from "../../../api/home";
import { Swiper } from "@nutui/nutui-react";
import GameSection from "./components/GameSection";
import BannerSkeleton from "./components/BannerSkeleton";
import GamesSkeleton from "./components/GamesSkeleton";
import DesktopHomeContent from "./components/DesktopHomeContent";
import BottomNav from "./components/BottomNav";
import WltStats from "./components/WltStats";
import Footer from "./components/Footer";
import { WalletCards } from "lucide-react";
import type { Banner, Game } from "../../../api/home";
import "./index.scss";

const SwiperItem = Swiper.Item;
const DESKTOP_BREAKPOINT = 768;

const HomePage: React.FC = () => {
  const { banners, games, gamesLoading, bannersLoading } = useHomeData();
  const [windowWidth, setWindowWidth] = useState(() => {
    if (typeof window === "undefined") return 768;
    return window.innerWidth;
  });
  const [activeTab, setActiveTab] = useState<"money" | "play" | "inbox" | "history">("play");

  const isDesktop = windowWidth >= DESKTOP_BREAKPOINT;


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
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

    switch(banner.linkType) {
      case 0:
        // Internal navigation - would use router.navigate() in real app
        window.location.href = banner.linkUrl;
        break;
      case 1: {
        // External link
        const aEl = document.createElement('a');
        aEl.href = banner.linkUrl;
        aEl.target = '_blank';
        aEl.click();
        break;
      }
    }
  };

  const onBannerKeyDown = (event: React.KeyboardEvent, banner: Banner) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    onBannerClick(banner);
  };

  const handleGameClick = (game: Game) => {
    if (game.status === "coming_soon") return;

    // Store game info in localStorage
    localStorage.setItem('currentGameInfo', JSON.stringify({
      productId: game.id,
      productName: game.name,
      productLogo: game.logo,
      route: game.route
    }));

    // Navigate to game - would use router in real app
    if (game.frontend_route) {
      window.location.href = game.frontend_route;
      return;
    }

    window.location.href = `${game.frontend_route || game.route}?pid=${game.id}`;
  };

  return (
    <div className={`home-page relative${isDesktop ? " desktop-mode" : ""}`}>
      {/* Header - Always visible */}
      <div className="home-header">
        <div className="home-header-content">
          <div className="logo-area">
            <div className="logo"></div>
          </div>
          <span className="title">Randseed</span>
          <a href="/signin" className="signin-btn" aria-label="Sign in with wallet">
            <WalletCards aria-hidden="true" />
            Sign In
          </a>
        </div>
      </div>

      {isDesktop ? (
        <DesktopHomeContent
          banners={banners}
          games={games}
          bannersLoading={bannersLoading}
          gamesLoading={gamesLoading}
          onBannerClick={onBannerClick}
          onGameClick={handleGameClick}
        />
      ) : (
        <>
          {/* Banner Carousel - Show skeleton while loading */}
          {bannersLoading ? (
            <BannerSkeleton />
          ) : banners && banners.length > 0 ? (
            <div className="home-banner">
              <Swiper
                loop={banners.length > 1}
                autoPlay={banners.length > 1 ? 5000 : 0}
                indicator
                style={{
                  "--nutui-swiper-indicator-bottom": "12rem"
                } as React.CSSProperties}
              >
                {banners.map((banner, index) => (
                  <SwiperItem key={banner.id}>
                    <img
                      onClick={() => onBannerClick(banner)}
                      className="banner-image"
                      src={banner.imageUrl}
                      alt={banner.title || "Randseed banner"}
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                      role={banner.linkUrl ? "button" : undefined}
                      tabIndex={banner.linkUrl ? 0 : undefined}
                      onKeyDown={(event) => onBannerKeyDown(event, banner)}
                      style={{
                        cursor: banner.linkUrl ? "pointer" : "default"
                      }}
                    />
                  </SwiperItem>
                ))}
              </Swiper>
            </div>
          ) : null}

          {/* Games Section - Show skeleton while loading */}
          <div className="home-games">
            {gamesLoading ? (
              <>
                <GamesSkeleton title="Rand Game" />
                <GamesSkeleton title="Rand Ball" />
              </>
            ) : (
              games.map((game, index) => {
                return (
                  <GameSection
                    key={index}
                    title={game[0]}
                    games={game[1]}
                    onGameClick={handleGameClick}
                  />
                );
              })
            )}
          </div>
        </>
      )}

      <WltStats />
      <Footer />
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default HomePage;
