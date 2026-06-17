import React from "react";

interface GamesSkeletonProps {
  title: string;
  desktop?: boolean;
}

const GamesSkeleton: React.FC<GamesSkeletonProps> = ({
  title,
  desktop = false,
}) => (
  <div className={`games-skeleton${desktop ? " desktop-mode" : ""}`}>
    <div className="skeleton-section-title">{title}</div>
    <div className="skeleton-game-list">
      {Array.from({ length: 4 }).map((_, index) => (
        <div className="skeleton-game-item" key={index}>
          <div className="skeleton-game-logo"></div>
          <div className="skeleton-game-content">
            <div className="skeleton-game-name"></div>
            <div className="skeleton-game-desc"></div>
            <div className="skeleton-game-desc short"></div>
          </div>
          <div className="skeleton-play-btn"></div>
          <div className="skeleton-game-status"></div>
        </div>
      ))}
    </div>
  </div>
);

export default GamesSkeleton;
