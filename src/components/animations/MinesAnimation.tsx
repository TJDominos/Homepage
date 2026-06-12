import React from 'react';
import { motion } from 'motion/react';

export const MinesAnimation: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Bomb */}
      <motion.div
        className="absolute text-[32px] origin-center z-10"
        animate={{ 
          scale: [0, 1.2, 1, 1.1, 1, 1.5, 0, 0],
          opacity: [0, 1, 1, 1, 1, 0, 0, 0],
          rotate: [0, -15, 15, -15, 15, 0, 0, 0]
        }}
        transition={{ duration: 3, times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.51, 1], ease: "easeInOut", repeat: Infinity }}
      >
        💣
      </motion.div>
      {/* Explosion flash */}
      <motion.div
        className="absolute w-[80rem] h-[80rem] bg-orange-500 rounded-full blur-[12px] mix-blend-screen z-20"
        animate={{ scale: [0, 0, 2, 0], opacity: [0, 0, 1, 0] }}
        transition={{ duration: 3, times: [0, 0.45, 0.5, 0.6], ease: "easeOut", repeat: Infinity }}
      />
      {/* Gem */}
      <motion.div
        className="absolute text-[36px] origin-center z-30"
        animate={{ scale: [0, 0, 1, 1, 0], opacity: [0, 0, 1, 1, 0], y: [20, 20, 0, 0, -20] }}
        transition={{ duration: 3, times: [0, 0.5, 0.6, 0.9, 1], ease: "anticipate", repeat: Infinity }} 
      >
        💎
      </motion.div>
    </div>
  );
};
