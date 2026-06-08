import React from "react";
import DesktopBannerSection from "./DesktopBannerSection";
import DesktopGameSection from "./DesktopGameSection";
import BannerSkeleton from "./BannerSkeleton";
import GamesSkeleton from "./GamesSkeleton";
import type { Banner, Game } from "../api/home";
import "./desktop.scss";

interface DesktopHomeContentProps {
  banners: Banner[];
  games: [string, Game[]][];
  bannersLoading: boolean;
  gamesLoading: boolean;
  onBannerClick: (banner: Banner) => void;
  onGameClick: (game: Game) => void;
}

const DesktopHomeContent: React.FC<DesktopHomeContentProps> = ({
  banners,
  games,
  bannersLoading,
  gamesLoading,
  onBannerClick,
  onGameClick,
}) => {
  return (
    <div className="desktop-home-content">
      <div className="desktop-home-container">
        {bannersLoading ? (
          <BannerSkeleton desktop />
        ) : (
          <DesktopBannerSection
            banners={banners}
            onBannerClick={onBannerClick}
          />
        )}

        <div className="desktop-home-games">
          {gamesLoading ? (
            <>
              <GamesSkeleton title="Rand Game" desktop />
              <GamesSkeleton title="Rand Ball" desktop />
            </>
          ) : (
            games.map((game, index) => (
              <DesktopGameSection
                key={index}
                title={game[0]}
                games={game[1]}
                onGameClick={onGameClick}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DesktopHomeContent;
