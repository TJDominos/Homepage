import React from "react";
import { ProductLogo } from "./ProductLogo";
import type { Game } from "../api/home";

interface DesktopGameSectionProps {
  title: string;
  games: Game[];
  onGameClick: (game: Game) => void;
}

const DesktopGameSection: React.FC<DesktopGameSectionProps> = ({ title, games, onGameClick }) => {
  return (
    <div className="desktop-game-section">
      <div className="desktop-section-title">{title}</div>
      <div className="desktop-game-grid">
        {games.map((game) => {
          const isComingSoon = game.status === "coming_soon";

          return (
            <div
              className={`desktop-game-card${isComingSoon ? " coming-soon" : ""}`}
              key={game.id}
              onClick={() => {
                if (!isComingSoon) {
                  onGameClick(game);
                }
              }}
              style={{ cursor: isComingSoon ? "default" : "pointer" }}
            >
              <div className="desktop-game-logo">
                <ProductLogo src={game.logo} className="desktop-game-logo-img" />
              </div>
              <div className="desktop-game-content">
                <div className="desktop-game-name">{game.name}</div>
                <div className="desktop-game-desc">
                  {game.description || "No description available"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DesktopGameSection;
