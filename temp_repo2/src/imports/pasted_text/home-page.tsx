import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHomeData } from "@/api/home";
import { Swiper } from "@nutui/nutui-react";
import GameSection from "./components/GameSection";
import BannerSkeleton from "./components/BannerSkeleton";
import GamesSkeleton from "./components/GamesSkeleton";
import DesktopHomeContent from "./components/DesktopHomeContent";
import "./index.scss";

const SwiperItem = Swiper.Item;
const DESKTOP_BREAKPOINT = 768;

const HomePage = () => {
  const { banners, games, gamesLoading, bannersLoading } = useHomeData();
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(() => {
    if (typeof window === "undefined") return 0;
    return window.innerWidth;
  });

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

  const onBannerClick = (banner) => {
    console.log('onBannerClick: ', banner);
    if (!banner.linkUrl) return;
    let aEl;
    switch(banner.linkType) {
      case 0: 
        navigate(banner.linkUrl)
        break;
      case 1: {
        aEl = document.createElement('a');
        aEl.href = banner.linkUrl;
        aEl.target = '_blank';
        aEl.click();
      }
    }
  };

  const onBannerKeyDown = (event, banner) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    onBannerClick(banner);
  };

  const handleGameClick = (game) => {
    if (game.status === "coming_soon") return;

    localStorage.setItem('currentGameInfo', JSON.stringify({
      productId: game.id,
      productName: game.name,
      productLogo: game.logo,
      route: game.route
    }));

    if (game.frontend_route) {
      navigate({ pathname: game.frontend_route }, {
        state: {
          productId: game.id,
          productName: game.name,
          productLogo: game.logo
        }
      });
      return;
    }

    navigate({ pathname: game.frontend_route || game.route, search: `?pid=${game.id}` }, {
      state: {
        productId: game.id,
        productName: game.name,
        productLogo: game.logo
      }
    });
  };

  return (
    <div className={`home-page relative${isDesktop ? " desktop-mode" : ""}`}>
      {/* 顶部Logo和社区按钮 - 立即显示 */}
      <div className="home-header bg-gradient-to-r from-[#D5D6F7] via-[#E1E2F9] to-[#D3C3FB] border-b border-purple-200/30 shadow-sm">
        <div className="home-header-content">
          <div className="logo-area">
            <div className="logo"></div>
          </div>
          <span className="title">Randseed</span>
          <a href="/community/wltoken" target="_blank" className="community-btn"><span></span>Community</a>
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
          {/* Banner轮播 - 数据加载完成前显示骨架屏 */}
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
                }}
              >
                {banners.map((banner, index) => (
                  <SwiperItem key={banner.id}>
                    <img
                      onClick={() => onBannerClick(banner)}
                      className="banner-image"
                      src={banner.imageUrl}
                      alt={banner.title || "Randseed banner"}
                      loading={index === 0 ? "eager" : "lazy"}
                      fetchpriority={index === 0 ? "high" : "auto"}
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

          {/* 游戏区域 - 数据加载完成前显示骨架屏 */}
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
                  />
                );
              })
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;