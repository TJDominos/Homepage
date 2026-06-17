import React from 'react';
import {
  Daily4Animation,
  RouletteAnimation,
  FruitsGardenAnimation,
  MinesAnimation,
  KenoAnimation,
  LuckyNickyAnimation,
  DefaultAnimation
} from './animations';

interface Props {
  gameName: string;
}

export const GameHoverOverlay: React.FC<Props> = ({ gameName }) => {
  const normalizedName = gameName.toLowerCase();

  const renderAnimation = () => {
    if (normalizedName.includes('daily 4')) {
      return <Daily4Animation />;
    }
    if (normalizedName.includes('roulette')) {
      return <RouletteAnimation />;
    }
    if (normalizedName.includes('fruits garden')) {
      return <FruitsGardenAnimation />;
    }
    if (normalizedName.includes('mines')) {
      return <MinesAnimation />;
    }
    if (normalizedName.includes('keno')) {
      return <KenoAnimation />;
    }
    if (normalizedName.includes('lucky nicky')) {
      return <LuckyNickyAnimation />;
    }
    return <DefaultAnimation />;
  };

  return (
    <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none bg-black/40">
      {renderAnimation()}
    </div>
  );
};

