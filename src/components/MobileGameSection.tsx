import React, { useRef, useState } from "react";
import type { Game } from "../api/home";
import { ProductLogo } from "./ProductLogo";
import { GameHoverOverlay } from "./GameHoverOverlay";

const MOVE_THRESHOLD = 10;

export const MobileGameSection = ({ title, games, onGameClick }: { title: string; games: Game[]; onGameClick: (g: Game) => void }) => {
  const [touchedGameId, setTouchedGameId] = useState<string | number | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleGameClick = (game: Game) => {
    if (game.status === "coming_soon") return;
    onGameClick(game);
  };

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
                padding: "8px",
                margin: "-8px",
                marginBottom: "3px"
              }}
            >
              <div className="game-logo relative z-10 w-[52px] h-[52px] shrink-0 rounded-[10px] overflow-hidden">
                <ProductLogo
                  src={game.logo}
                  className="game-logo-img w-full h-full object-cover rounded-[10px]"
                />
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
                {isComingSoon ? (
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

              {isComingSoon ? (
                <div className="game-status relative z-10">Coming soon</div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

