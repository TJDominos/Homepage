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
    <div className="absolute inset-0 z-20 overflow-hidden rounded-[10rem] opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 pointer-events-none bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
      {renderAnimation()}
    </div>
  );
};

