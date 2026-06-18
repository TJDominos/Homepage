import React from "react";

export const BannerSkeleton = ({ desktop = false }: { desktop?: boolean }) => (
  <div className={`banner-skeleton${desktop ? " desktop-mode" : ""}`}>
    <div className="skeleton-banner" />
    <div className="skeleton-banner desktop-only" />
  </div>
);

export const GamesSkeleton = ({
  title,
  desktop = false,
}: {
  title: string;
  desktop?: boolean;
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
