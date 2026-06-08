import Slider from "react-slick";

export function Banner() {
  const banners = [
    {
      id: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=1400&q=80",
      linkUrl: "/community/wltoken",
      linkType: 0,
      title: "Become an Early Shareholder",
      subtitle: "Join fair launch, Own the future",
      buttonText: "BUY $WLT",
    },
    {
      id: 2,
      imageUrl:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1400&q=80",
      linkUrl: "/games/daily4",
      linkType: 0,
      title: "Play Daily 4 Today",
      subtitle: "$4,500+ Daily Jackpot",
      buttonText: "PLAY NOW",
    },
    {
      id: 3,
      imageUrl:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1400&q=80",
      linkUrl: "/games/luckynicky",
      linkType: 0,
      title: "Lucky Nicky Special",
      subtitle: "Best odds in the house!",
      buttonText: "TRY NOW",
    },
    {
      id: 4,
      imageUrl:
        "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=1400&q=80",
      linkUrl: "/games/triple",
      linkType: 0,
      title: "Triple Jokers Bonus",
      subtitle: "Win up to $10,000!",
      buttonText: "PLAY NOW",
    },
  ];

  const webSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
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
    <div className="mb-3 banner-carousel-web">
      <Slider {...webSliderSettings}>
        {banners.map((banner) => (
          <div key={banner.id} className="px-2">
            <div
              onClick={() => {
                if (banner.linkType === 0) {
                  window.location.href = banner.linkUrl;
                } else {
                  window.open(banner.linkUrl, "_blank");
                }
              }}
              className="relative w-full rounded-2xl overflow-hidden shadow-xl cursor-pointer transition-all duration-300 hover:shadow-[0_10px_30px_rgba(95,64,161,0.3)] hover:scale-[1.02]"
              style={{
                paddingBottom: "50%", // 2:1 aspect ratio
                backgroundImage: `url("${banner.imageUrl}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Content overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-center justify-center">
                <div className="text-white text-center px-4">
                  <h2 className="text-lg font-bold mb-1.5 drop-shadow-xl">
                    {banner.title}
                  </h2>
                  <p className="text-sm mb-3 drop-shadow-lg opacity-90">
                    {banner.subtitle}
                  </p>
                  <button className="bg-white text-black hover:bg-black hover:text-white border-2 border-white text-xs font-bold px-6 py-2 rounded-full shadow-2xl transition-all duration-300 hover:scale-105">
                    {banner.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}