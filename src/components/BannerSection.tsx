import React from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Banner } from "../api/home";

interface BannerSectionProps {
  banners: Banner[];
  onBannerClick: (banner: Banner) => void;
  isDesktop?: boolean;
}

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow custom-arrow-btn`}
      style={{
        ...style,
        left: "24px",
      }}
      onClick={onClick}
    >
      <ChevronLeft color="white" />
    </div>
  );
};

const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow custom-arrow-btn`}
      style={{
        ...style,
        right: "24px",
      }}
      onClick={onClick}
    >
      <ChevronRight color="white" />
    </div>
  );
};

const BannerSection: React.FC<BannerSectionProps> = ({
  banners,
  onBannerClick,
  isDesktop,
}) => {
  const onBannerKeyDown = (event: React.KeyboardEvent, banner: Banner) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    onBannerClick(banner);
  };

  if (!banners?.length) return null;

  if (isDesktop) {
    const desktopSettings = {
      dots: true,
      infinite: banners.length > 2,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 2,
      autoplay: banners.length > 1,
      autoplaySpeed: 5000,
      arrows: true,
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />,
      customPaging: (i: number) => (
        <div
          style={{
            width: "8px",
            height: "8px",
            background: "currentColor",
            borderRadius: "50%",
            display: "inline-block",
          }}
          className="desktop-custom-dot"
        />
      ),
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
        <Slider {...desktopSettings}>
          {banners.map((banner, index) => (
            <div className="desktop-banner-slide" key={banner.id}>
              <div className="desktop-banner-card-wrap">
                <img
                  className="desktop-banner-card"
                  src={banner.imageUrl}
                  alt={banner.title || "Randseed banner"}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchpriority={index === 0 ? "high" : "auto"}
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
  }

  const mobileSettings = {
    dots: true,
    infinite: banners.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: banners.length > 1,
    autoplaySpeed: 5000,
    arrows: true,
  };

  return (
    <div className="banner-carousel-mobile">
      <Slider {...mobileSettings}>
        {banners.map((banner, index) => (
          <div key={banner.id}>
            <img
              onClick={() => onBannerClick(banner)}
              className="hero-image"
              src={banner.imageUrl}
              alt={banner.title || "banner"}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerSection;
