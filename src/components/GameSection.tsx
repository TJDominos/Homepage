import React, { useState, useRef } from "react";
import { ProductLogo } from "./ProductLogo";
import type { Game } from "../api/home";
import { GameHoverOverlay } from "./GameHoverOverlay";

interface GameSectionProps {
  title: string;
  games: Game[];
  onGameClick?: (game: Game) => void;
  isDesktop?: boolean;
}

const MOVE_THRESHOLD = 10;

const GameSection: React.FC<GameSectionProps> = ({
  title,
  games,
  onGameClick,
  isDesktop,
}) => {
  const [touchedGameId, setTouchedGameId] = useState<string | number | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

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
                <div className="desktop-game-logo relative z-10 w-[70px] h-[70px] shrink-0 rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-transform duration-300 group-hover:scale-[1.04]">
                  <ProductLogo
                    src={game.logo}
                    className="desktop-game-logo-img flex-shrink-0 w-full h-full object-cover rounded-2xl"
                  />
                  {!isComingSoon && (
                    <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <GameHoverOverlay gameName={game.name} />
                    </div>
                  )}
                </div>
                <div className="desktop-game-content relative z-10 text-center w-full">
                  <div className="desktop-game-name mb-4 text-black text-sm font-normal leading-tight">{game.name}</div>
                  <div className="desktop-game-desc text-black/80 text-sm font-normal leading-[1.45] line-clamp-2">
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
          const isTouched = touchedGameId === game.id;

          return (
            <div
              className={`game-item group relative${isComingSoon ? " coming-soon" : " clickable"}`}
              key={game.id}
              onTouchStart={(e) => {
                if (isComingSoon) return;
                const touch = e.touches[0];
                touchStartRef.current = { x: touch.clientX, y: touch.clientY };
                setTouchedGameId(game.id);
              }}
              onTouchMove={(e) => {
                if (touchedGameId !== game.id || !touchStartRef.current) return;
                const touch = e.touches[0];
                const deltaX = Math.abs(touch.clientX - touchStartRef.current.x);
                const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);

                if (deltaX > MOVE_THRESHOLD || deltaY > MOVE_THRESHOLD) {
                  setTouchedGameId(null);
                }
              }}
              onTouchEnd={() => {
                setTouchedGameId(null);
                touchStartRef.current = null;
              }}
              onTouchCancel={() => {
                setTouchedGameId(null);
                touchStartRef.current = null;
              }}
              onClick={() => handleGameClick(game)}
              style={{
                cursor: isComingSoon ? "default" : "pointer",
              }}
            >
              <div className="game-logo relative z-10 w-[52px] h-[52px] shrink-0 rounded-[10px] overflow-hidden">
                <ProductLogo src={game.logo} className="game-logo-img w-full h-full object-cover rounded-[10px]" />
                {!isComingSoon && (
                  <div
                    className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-150 ${
                      isTouched ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <GameHoverOverlay gameName={game.name} />
                  </div>
                )}
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
