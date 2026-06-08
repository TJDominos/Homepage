import React from "react";
import Slider from "react-slick";
import type { Banner } from "../../../../api/home";

interface DesktopBannerSectionProps {
  banners: Banner[];
  onBannerClick: (banner: Banner) => void;
}

const DesktopBannerSection: React.FC<DesktopBannerSectionProps> = ({ banners, onBannerClick }) => {
  const onBannerKeyDown = (event: React.KeyboardEvent, banner: Banner) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    onBannerClick(banner);
  };

  if (!banners?.length) return null;

  const carouselBanners = banners.length === 2 ? [...banners, ...banners] : banners;

  const sliderSettings = {
    dots: true,
    infinite: carouselBanners.length > 2,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: banners.length > 1,
    autoplaySpeed: 5000,
    arrows: true,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="desktop-banner-section banner-carousel-web">
      <Slider {...sliderSettings}>
        {carouselBanners.map((banner, index) => (
          <div className="desktop-banner-slide" key={`${banner.id}-${index}`}>
            <div className="desktop-banner-card-wrap">
              <img
                className="desktop-banner-card"
                src={banner.imageUrl}
                alt={banner.title || "Randseed banner"}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                role={banner.linkUrl ? "button" : undefined}
                tabIndex={banner.linkUrl ? 0 : undefined}
                onKeyDown={(event) => onBannerKeyDown(event, banner)}
                style={{
                  cursor: banner.linkUrl ? "pointer" : "default",
                }}
                onClick={() => onBannerClick(banner)}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default DesktopBannerSection;
