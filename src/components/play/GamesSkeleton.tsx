import React from "react";

interface GamesSkeletonProps {
  title: string;
  desktop?: boolean;
}

const GamesSkeleton: React.FC<GamesSkeletonProps> = ({
  title,
  desktop = false,
}) => {
  if (desktop) {
    return (
      <div className="desktop-game-section">
        <div className="desktop-section-title">{title}</div>
        <div className="desktop-game-grid">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="desktop-game-card opacity-85">
              {/* Logo Skeleton */}
              <div
                className="desktop-game-logo skeleton-banner"
                style={{ width: "70px", height: "70px", borderRadius: "10px" }}
              />
              {/* Content Skeleton */}
              <div className="desktop-game-content text-center w-full flex flex-col items-center">
                {/* Name line */}
                <div
                  className="skeleton-banner"
                  style={{
                    width: "70%",
                    height: "16px",
                    marginTop: "4px",
                    marginBottom: "16px",
                    borderRadius: "6px",
                  }}
                />
                {/* Description lines */}
                <div
                  className="skeleton-banner"
                  style={{
                    width: "100%",
                    height: "12px",
                    marginBottom: "6px",
                    borderRadius: "4px",
                  }}
                />
                <div
                  className="skeleton-banner"
                  style={{
                    width: "80%",
                    height: "12px",
                    borderRadius: "4px",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="game-section">
      <div className="section-title">{title}</div>
      <div className="game-list">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="game-item opacity-85 select-none"
            style={{ background: "transparent", boxShadow: "none" }}
          >
            {/* Logo Skeleton */}
            <div
              className="game-logo skeleton-banner"
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "10px",
                marginRight: "12px",
              }}
            />
            {/* Content Skeleton */}
            <div className="game-content flex-1">
              {/* Name line */}
              <div
                className="skeleton-banner"
                style={{
                  width: "100px",
                  height: "16px",
                  borderRadius: "4px",
                  marginBottom: "8px",
                }}
              />
              {/* Description line */}
              <div
                className="skeleton-banner"
                style={{
                  width: "90%",
                  height: "12px",
                  borderRadius: "4px",
                  marginBottom: "6px",
                }}
              />
              <div
                className="skeleton-banner"
                style={{
                  width: "65%",
                  height: "12px",
                  borderRadius: "4px",
                }}
              />
            </div>
            {/* Action Button Skeleton */}
            <div
              className="skeleton-banner shrink-0 self-center"
              style={{
                width: "80px",
                height: "28px",
                borderRadius: "16px",
                marginLeft: "12px",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesSkeleton;
