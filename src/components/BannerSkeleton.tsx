import React from "react";

interface BannerSkeletonProps {
  desktop?: boolean;
}

const BannerSkeleton: React.FC<BannerSkeletonProps> = ({ desktop = false }) => {
  if (desktop) {
    return (
      <div className="desktop-banner-section banner-carousel-web">
        <div className="grid grid-cols-2 gap-4">
          <div className="desktop-banner-slide">
            <div className="desktop-banner-card-wrap">
              <div className="desktop-banner-card skeleton-banner" />
            </div>
          </div>
          <div className="desktop-banner-slide">
            <div className="desktop-banner-card-wrap">
              <div className="desktop-banner-card skeleton-banner" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="banner-carousel-mobile">
      <div className="hero-image skeleton-banner" />
    </div>
  );
};

export default BannerSkeleton;
