import { useState } from 'react';
import Slider from 'react-slick';
import '../../styles/slick.scss';
import svgPaths from "../../imports/svg-401s87trfk";
import imgImage from "figma:asset/3cc3ef46c78b8834bccef9c176173ec5e002ae52.png";
import imgImage1 from "figma:asset/9e4714ea6aa0ffe0502280aacb4dfdd37e5ba046.png";
import imgImage2 from "figma:asset/3a5ee0d7ed0b2b92871afe7dbe6af47b935c1999.png";
import imgImage3 from "figma:asset/a72bddeaad3e50ac932b00dab42d2aa285ca5115.png";
import imgImage4 from "figma:asset/d1557f22235f39a941ce98ff307bd7d77c24ed78.png";
import imgImage5 from "figma:asset/06f51fd4908442ab707a9531c9bd497dc34c71e2.png";

export function WebHome() {
  const banners = [
    {
      id: 1,
      imageUrl: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=1400&q=80",
      linkUrl: "/community/wltoken",
      linkType: 0,
      title: "Become an Early Shareholder",
      subtitle: "Join fair launch, Own the future",
      buttonText: "BUY $WLT"
    },
    {
      id: 2,
      imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1400&q=80",
      linkUrl: "/games/daily4",
      linkType: 0,
      title: "Play Daily 4 Today",
      subtitle: "$4,500+ Daily Jackpot",
      buttonText: "PLAY NOW"
    },
    {
      id: 3,
      imageUrl: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1400&q=80",
      linkUrl: "/games/luckynicky",
      linkType: 0,
      title: "Lucky Nicky Special",
      subtitle: "Best odds in the house!",
      buttonText: "TRY NOW"
    },
    {
      id: 4,
      imageUrl: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=1400&q=80",
      linkUrl: "/games/triple",
      linkType: 0,
      title: "Triple Jokers Bonus",
      subtitle: "Win up to $10,000!",
      buttonText: "PLAY NOW"
    }
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
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  const games = [
    [
      "Rand Ball",
      [
        {
          id: 1,
          name: "Daily 4",
          description: "Just $0.5 to play! $4,500+ Daily 4 Jackpot",
          logo: imgImage,
          status: "available"
        }
      ]
    ],
    [
      "Rand Game",
      [
        {
          id: 2,
          name: "Lucky Nicky",
          description: "Our most well-balanced, high win rate game!",
          logo: imgImage1,
          status: "available"
        },
        {
          id: 3,
          name: "Quick Quid",
          description: "1 in 100 shot at a quick $50 win in our rapid-fire draw!",
          logo: imgImage3,
          status: "available"
        },
        {
          id: 4,
          name: "Triple Jokers",
          description: "1 in 100 shot at a quick $50 win in our rapid-fire draw!",
          logo: imgImage4,
          status: "available"
        },
        {
          id: 5,
          name: "Lucky Nicky Combo",
          description: "Our most well-balanced, high win rate game!",
          logo: imgImage1,
          status: "available"
        },
        {
          id: 6,
          name: "Mines",
          description: "💎 High-stakes adventure💎. 99.5% RTP and 5000x multipliers",
          logo: imgImage2,
          status: "available"
        },
        {
          id: 7,
          name: "Royal Flush",
          description: "Test your luck with the ultimate card game challenge!",
          logo: imgImage3,
          status: "available"
        },
        {
          id: 8,
          name: "Diamond Rush",
          description: "Collect gems and win big in this exciting adventure!",
          logo: imgImage4,
          status: "available"
        },
        {
          id: 9,
          name: "Spin Master",
          description: "Spin the wheel of fortune and claim your prizes!",
          logo: imgImage1,
          status: "available"
        },
        {
          id: 10,
          name: "Golden Strike",
          description: "Strike gold with massive multipliers and bonus rounds!",
          logo: imgImage3,
          status: "available"
        },
        {
          id: 11,
          name: "Treasure Hunt",
          description: "Embark on an epic quest to find hidden treasures!",
          logo: imgImage4,
          status: "available"
        },
        {
          id: 12,
          name: "Lucky 7s",
          description: "Classic slot action with modern twists and big payouts!",
          logo: imgImage1,
          status: "available"
        },
        {
          id: 13,
          name: "Mega Fortune",
          description: "Chase the progressive jackpot and change your life!",
          logo: imgImage2,
          status: "available"
        },
        {
          id: 14,
          name: "Wild Safari",
          description: "Explore the wilderness and discover untold riches!",
          logo: imgImage3,
          status: "coming_soon"
        },
        {
          id: 15,
          name: "Crystal Palace",
          description: "Enter the palace of crystals for magical wins!",
          logo: imgImage4,
          status: "coming_soon"
        }
      ]
    ]
  ];

  return (
    <div className="h-screen overflow-hidden flex flex-col" style={{
      background: 'linear-gradient(177deg, rgba(255, 255, 255, 0.00) 7.99%, #fff 100%), linear-gradient(272deg, #D5D6F7 1.78%, #E1E2F9 46.59%, #D3C3FB 99.68%)'
    }}>
      {/* Header */}
      <header className="flex-shrink-0 bg-gradient-to-r from-[#D5D6F7] via-[#E1E2F9] to-[#D3C3FB] border-b border-purple-200/30 shadow-sm">
        <div className="max-w-[900px] mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={imgImage5} alt="Randseed Logo" className="w-10 h-10" />
              <h1 className="text-xl font-bold tracking-wide text-black">Randseed</h1>
            </div>
            
            <a 
              href="/community/wltoken" 
              target="_blank"
              className="flex items-center gap-2 border-2 border-black rounded-full px-5 py-2 hover:bg-black hover:text-white transition-all duration-200 text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 14 14.069">
                <path d={svgPaths.p3033a600} fill="currentColor" />
              </svg>
              Community
            </a>
          </div>
        </div>
      </header>

      {/* Main Content - Scrollable */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[900px] mx-auto px-6 py-6">
          {/* Banner Section - Carousel with 2 slides visible */}
          {banners && banners.length > 0 && (
            <div className="mb-6 banner-carousel-web">
              <Slider {...webSliderSettings}>
                {banners.map((banner) => (
                  <div key={banner.id} className="px-2">
                    <div 
                      onClick={() => {
                        if (banner.linkType === 0) {
                          window.location.href = banner.linkUrl;
                        } else {
                          window.open(banner.linkUrl, '_blank');
                        }
                      }}
                      className="relative w-full rounded-2xl overflow-hidden shadow-xl cursor-pointer transition-all duration-300 hover:shadow-[0_10px_30px_rgba(95,64,161,0.3)] hover:scale-[1.02]"
                      style={{
                        paddingBottom: '50%', // 2:1 aspect ratio
                        backgroundImage: `url("${banner.imageUrl}")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
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
          )}

          {/* Games Sections */}
          <div className="space-y-6">
            {games.map((gameSection, sectionIndex) => {
              const [title, gameList] = gameSection;
              
              return (
                <section key={sectionIndex}>
                  <h2 className="text-2xl font-semibold mb-4 text-black">{title}</h2>
                  
                  <div className="grid gap-4 grid-cols-3">
                    {gameList.map((game: any) => (
                      <div
                        key={game.id}
                        className={`bg-white rounded-xl p-4 shadow-md border border-gray-100 transition-all duration-300 flex flex-col items-center gap-3 ${
                          game.status === "available" 
                            ? 'hover:shadow-xl hover:-translate-y-1 hover:border-purple-200 cursor-pointer' 
                            : 'opacity-65 cursor-default'
                        }`}
                        onClick={() => {
                          if (game.status === "available") {
                            console.log('Navigate to game:', game.name);
                          }
                        }}
                      >
                        {/* Game Logo */}
                        <div className="flex-shrink-0">
                          <img
                            src={game.logo}
                            alt={game.name}
                            className="w-20 h-20 rounded-xl object-cover shadow-sm"
                          />
                        </div>
                        
                        {/* Game Info */}
                        <div className="flex-1 w-full flex flex-col items-center text-center">
                          <h3 className={`text-base font-bold mb-2 ${
                            game.status === "available" ? 'text-black' : 'text-black/65'
                          }`}>
                            {game.name}
                          </h3>
                          <p className={`text-xs leading-relaxed line-clamp-3 mb-3 ${
                            game.status === "available" ? 'text-black/65' : 'text-black/45'
                          }`}>
                            {game.description}
                          </p>
                        </div>
                        
                        {/* Play Button / Coming Soon */}
                        <div className="w-full">
                          {game.status === "coming_soon" ? (
                            <span className="block text-center text-xs text-black/45 font-medium bg-gray-100 px-3 py-2 rounded-full">
                              Coming soon
                            </span>
                          ) : (
                            <button 
                              className="w-full bg-[rgba(95,64,161,0.1)] hover:bg-[rgba(95,64,161,0.2)] text-[#5F40A1] font-semibold px-4 py-2.5 rounded-full text-sm transition-all duration-200 hover:scale-105"
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log('Play game:', game.name);
                              }}
                            >
                              Play Now
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="flex-shrink-0 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl">
        <div className="max-w-xl mx-auto flex justify-around items-center py-2">
          <button className="flex flex-col items-center gap-1 text-black/65 hover:text-black transition-colors px-6 py-1.5">
            <svg className="w-6 h-6" viewBox="0 0 27 27" fill="none">
              <rect fill="transparent" height="27" width="27" />
              <path d={svgPaths.p1bf39e00} fill="currentColor" fillOpacity="0.65" />
            </svg>
            <span className="text-xs font-medium">Money</span>
          </button>

          <button className="flex flex-col items-center gap-1 text-black transition-colors relative px-6 py-1.5">
            <div className="relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-black/85 flex items-center justify-center shadow-2xl">
                <svg className="w-7 h-7 text-white" viewBox="0 0 30 30" fill="none">
                  <circle cx="15" cy="15" fill="currentColor" r="15" />
                  <g>
                    <path d={svgPaths.p170a5300} stroke="#F8FAFF" strokeWidth="1.4728" />
                    <path d={svgPaths.p12adf040} stroke="#F8FAFF" strokeWidth="1.26015" />
                    <circle cx="20.8592" cy="20.1715" r="2.27122" stroke="#F8FAFF" strokeWidth="1.18139" />
                  </g>
                </svg>
              </div>
            </div>
            <span className="text-xs font-medium mt-3">Play</span>
          </button>

          <button className="flex flex-col items-center gap-1 text-black/65 hover:text-black transition-colors px-6 py-1.5">
            <svg className="w-6 h-6" viewBox="0 0 27 27" fill="none">
              <path d={svgPaths.p213e89c0} fill="currentColor" fillOpacity="0.65" />
            </svg>
            <span className="text-xs font-medium">Inbox</span>
          </button>

          <button className="flex flex-col items-center gap-1 text-black/65 hover:text-black transition-colors px-6 py-1.5">
            <svg className="w-6 h-6" viewBox="0 0 27 27" fill="none">
              <path d={svgPaths.p2891d1d0} fill="currentColor" fillOpacity="0.65" />
            </svg>
            <span className="text-xs font-medium">History</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
