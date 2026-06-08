import { Banner } from "./Banner";
import imgImage from "figma:asset/3cc3ef46c78b8834bccef9c176173ec5e002ae52.png";
import imgImage1 from "figma:asset/9e4714ea6aa0ffe0502280aacb4dfdd37e5ba046.png";
import imgImage2 from "figma:asset/3a5ee0d7ed0b2b92871afe7dbe6af47b935c1999.png";
import imgImage3 from "figma:asset/a72bddeaad3e50ac932b00dab42d2aa285ca5115.png";
import imgImage4 from "figma:asset/d1557f22235f39a941ce98ff307bd7d77c24ed78.png";

export function DesktopPlayPage() {
  const games = [
    [
      "Rand Ball",
      [
        {
          id: 1,
          name: "Daily 4",
          description:
            "Just $0.5 to play! $4,500+ Daily 4 Jackpot",
          logo: imgImage,
          status: "available",
        },
      ],
    ],
    [
      "Rand Game",
      [
        {
          id: 2,
          name: "Lucky Nicky",
          description:
            "Our most well-balanced, high win rate game!",
          logo: imgImage1,
          status: "available",
        },
        {
          id: 3,
          name: "Quick Quid",
          description:
            "1 in 100 shot at a quick $50 win in our rapid-fire draw!",
          logo: imgImage3,
          status: "available",
        },
        {
          id: 4,
          name: "Triple Jokers",
          description:
            "1 in 100 shot at a quick $50 win in our rapid-fire draw!",
          logo: imgImage4,
          status: "available",
        },
        {
          id: 5,
          name: "Lucky Nicky Combo",
          description:
            "Our most well-balanced, high win rate game!",
          logo: imgImage1,
          status: "available",
        },
        {
          id: 6,
          name: "Mines",
          description:
            "💎 High-stakes adventure💎. 99.5% RTP and 5000x multipliers",
          logo: imgImage2,
          status: "available",
        },
        {
          id: 7,
          name: "Royal Flush",
          description:
            "Test your luck with the ultimate card game challenge!",
          logo: imgImage3,
          status: "available",
        },
        {
          id: 8,
          name: "Diamond Rush",
          description:
            "Collect gems and win big in this exciting adventure!",
          logo: imgImage4,
          status: "available",
        },
        {
          id: 9,
          name: "Spin Master",
          description:
            "Spin the wheel of fortune and claim your prizes!",
          logo: imgImage1,
          status: "available",
        },
        {
          id: 10,
          name: "Golden Strike",
          description:
            "Strike gold with massive multipliers and bonus rounds!",
          logo: imgImage3,
          status: "available",
        },
        {
          id: 11,
          name: "Treasure Hunt",
          description:
            "Embark on an epic quest to find hidden treasures!",
          logo: imgImage4,
          status: "available",
        },
        {
          id: 12,
          name: "Lucky 7s",
          description:
            "Classic slot action with modern twists and big payouts!",
          logo: imgImage1,
          status: "available",
        },
        {
          id: 13,
          name: "Mega Fortune",
          description:
            "Chase the progressive jackpot and change your life!",
          logo: imgImage2,
          status: "available",
        },
        {
          id: 14,
          name: "Wild Safari",
          description:
            "Explore the wilderness and discover untold riches!",
          logo: imgImage3,
          status: "coming_soon",
        },
        {
          id: 15,
          name: "Crystal Palace",
          description:
            "Enter the palace of crystals for magical wins!",
          logo: imgImage4,
          status: "coming_soon",
        },
      ],
    ],
  ];

  return (
    <>
      {/* Banner Section */}
      <Banner />

      {/* Games Sections */}
      <div className="space-y-2">
        {games.map((gameSection, sectionIndex) => {
          const [title, gameList] = gameSection;

          return (
            <section key={sectionIndex}>
              <h2 className="text-2xl font-semibold mb-1.5 text-black" style={{ fontSize: '24px', fontWeight: 600 }}>
                {title}
              </h2>

              <div className="grid gap-2 grid-cols-4">
                {gameList.map((game: any) => (
                  <div
                    key={game.id}
                    className={`bg-transparent rounded-xl p-1.5 transition-all duration-300 flex flex-col items-center gap-1.5 ${
                      game.status === "available"
                        ? "hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                        : "opacity-65 cursor-default"
                    }`}
                    onClick={() => {
                      if (game.status === "available") {
                        console.log(
                          "Navigate to game:",
                          game.name,
                        );
                      }
                    }}
                  >
                    {/* Game Logo */}
                    <div className="flex-shrink-0">
                      <img
                        src={game.logo}
                        alt={game.name}
                        className="rounded-lg object-cover shadow-sm"
                        style={{ width: '70px', height: '70px' }}
                      />
                    </div>

                    {/* Game Info */}
                    <div className="flex-1 w-full flex flex-col items-center text-center">
                      <h3
                        className={`mb-0.5 ${
                          game.status === "available"
                            ? "text-black"
                            : "text-black/65"
                        }`}
                        style={{ fontSize: '20px', fontWeight: 400 }}
                      >
                        {game.name}
                      </h3>
                      <p
                        className={`leading-snug line-clamp-2 ${
                          game.status === "available"
                            ? "text-black"
                            : "text-black/65"
                        }`}
                        style={{ fontSize: '14px', fontWeight: 400 }}
                      >
                        {game.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}