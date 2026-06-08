import React from "react";
import ProductLogo from "../../ProductLogo";
import type { Game } from "../../../../api/home";

interface GameSectionProps {
  title: string;
  games: Game[];
  onGameClick?: (game: Game) => void;
}

const GameSection: React.FC<GameSectionProps> = ({ title, games, onGameClick }) => {
  const handleGameClick = (game: Game) => {
    if (game.status === "coming_soon") return;
    if (onGameClick) {
      onGameClick(game);
    }
  };

  return (
    <div className="game-section">
      <div className="section-title">{title}</div>
      <div className="game-list">
        {games.map((game) => {
          return (
            <div
              className={`game-item${game.status === "coming_soon" ? " coming-soon" : " clickable"}`}
              key={game.id}
              onClick={() => handleGameClick(game)}
              style={{ cursor: game.status === "coming_soon" ? "default" : "pointer" }}
            >
              <div className="game-logo">
                <ProductLogo src={game.logo} className="game-logo-img" />
              </div>
              <div className="game-content">
                <div className="game-header">
                  <div className="game-name">{game.name}</div>
                </div>
                <div className="game-desc">
                  <div>{game.description || "No description available"}</div>
                </div>
              </div>
              <div className="game-action">
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
                <div className="game-status">Coming soon</div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameSection;
