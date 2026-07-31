import React from "react";
import BannerSkeleton from "../components/play/BannerSkeleton";
import GamesSkeleton from "../components/play/GamesSkeleton";
import BannerSection from "../components/play/BannerSection";
import GameSection from "../components/play/GameSection";
import type { Banner, Game } from "../api/home";

interface PlayPageProps {
  isDesktopView: boolean;
  bannersLoading: boolean;
  gamesLoading: boolean;
  banners: Banner[];
  games: [string, Game[]][];
  onBannerClick: (banner: Banner) => void;
  onGameClick: (game: Game) => void;
}

export default function PlayPage({
  isDesktopView,
  bannersLoading,
  gamesLoading,
  banners,
  games,
  onBannerClick,
  onGameClick,
}: PlayPageProps) {
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
    <div className="flex flex-col flex-1 pb-4">
      {bannersLoading ? (
        <BannerSkeleton />
      ) : (
        <BannerSection
          banners={banners}
          onBannerClick={onBannerClick}
          isDesktop={false}
        />
      )}
      <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 bg-white">
        <div className="pb-[96px]">
          {gamesLoading ? (
            <>
              <GamesSkeleton title="Rand Game" />
              <GamesSkeleton title="Rand Ball" />
            </>
          ) : (
            games.map((game, i) => (
              <GameSection
                key={i}
                title={game[0]}
                games={game[1]}
                onGameClick={onGameClick}
                isDesktop={false}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
