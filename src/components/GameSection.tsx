import React from "react";
import { ProductLogo } from "./ProductLogo";
import type { Game } from "../api/home";
import { GameHoverOverlay } from "./GameHoverOverlay";

interface GameSectionProps {
  title: string;
  games: Game[];
  onGameClick?: (game: Game) => void;
  isDesktop?: boolean;
}

const GameSection: React.FC<GameSectionProps> = ({
  title,
  games,
  onGameClick,
  isDesktop,
}) => {
  const handleGameClick = (game: Game) => {
    if (game.status === "coming_soon") return;
    if (onGameClick) {
      onGameClick(game);
    }
  };

  if (isDesktop) {
    return (
      <div className="desktop-game-section">
        <div className="desktop-section-title">{title}</div>
        <div className="desktop-game-grid">
          {games.map((game) => {
            const isComingSoon = game.status === "coming_soon";
            return (
              <div
                className={`desktop-game-card group relative${isComingSoon ? " coming-soon" : ""}`}
                key={game.id}
                onClick={() => handleGameClick(game)}
                style={{ cursor: isComingSoon ? "default" : "pointer" }}
              >
                <div className="desktop-game-logo relative z-10 w-[70rem] h-[70rem] shrink-0 rounded-[10rem] overflow-hidden shadow-[0_2rem_8rem_rgba(0,0,0,0.08)] bg-white transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-[4rem]">
                  <ProductLogo
                    src={game.logo}
                    className="desktop-game-logo-img w-full h-full object-cover rounded-[10rem]"
                  />
                  {!isComingSoon && <GameHoverOverlay gameName={game.name} />}
                </div>
                <div className="desktop-game-content relative z-10 text-center w-full transition-transform duration-300 group-hover:translate-y-[2rem]">
                  <div className="desktop-game-name mb-[2rem] text-black text-[20rem] font-normal leading-tight">{game.name}</div>
                  <div className="desktop-game-desc text-black/80 text-[14rem] font-normal leading-[1.45] line-clamp-2">
                    {game.description || "No description available"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="game-section">
      <div className="section-title">{title}</div>
      <div className="game-list">
        {games.map((game) => {
          const isComingSoon = game.status === "coming_soon";
          return (
            <div
              className={`game-item group relative${isComingSoon ? " coming-soon" : " clickable"}`}
              key={game.id}
              onClick={() => handleGameClick(game)}
              style={{
                cursor: isComingSoon ? "default" : "pointer",
              }}
            >
              <div className="game-logo relative z-10 w-[52rem] h-[52rem] shrink-0 rounded-[10rem] overflow-hidden bg-white">
                <ProductLogo src={game.logo} className="game-logo-img w-full h-full object-cover rounded-[10rem]" />
                {!isComingSoon && <GameHoverOverlay gameName={game.name} />}
              </div>
              <div className="game-content relative z-10">
                <div className="game-header">
                  <div className="game-name">{game.name}</div>
                </div>
                <div className="game-desc">
                  <div>{game.description || "No description available"}</div>
                </div>
              </div>
              <div className="game-action relative z-10">
                {game.status === "coming_soon" ? (
                  <button className="play-btn disabled" disabled>
                    Coming soon
                  </button>
                ) : (
                  <button
                    className="play-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGameClick(game);
                    }}
                  >
                    Play Now
                  </button>
                )}
              </div>
              {game.status === "coming_soon" ? (
                <div className="game-status relative z-10">Coming soon</div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameSection;
