import React from "react";

interface BannerSkeletonProps {
  desktop?: boolean;
}

const BannerSkeleton: React.FC<BannerSkeletonProps> = ({ desktop = false }) => (
  <div className={`banner-skeleton${desktop ? " desktop-mode" : ""}`}>
    <div className="skeleton-banner" />
    <div className="skeleton-banner desktop-only" />
  </div>
);

export default BannerSkeleton;
