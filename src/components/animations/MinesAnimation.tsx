import React from 'react';
import { motion } from 'motion/react';
import { Bomb, Gem } from 'lucide-react';

export const MinesAnimation: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center transform scale-[0.85]">
      {/* Bomb */}
      <motion.div
        className="absolute origin-center z-10 text-red-500 drop-shadow-[0_2px_8px_rgba(239,68,68,0.5)]"
        animate={{ 
          scale: [0, 1.2, 1, 1.1, 1, 1.5, 0, 0],
          opacity: [0, 1, 1, 1, 1, 0, 0, 0],
          rotate: [0, -15, 15, -15, 15, 0, 0, 0]
        }}
        transition={{ duration: 2.4, times: [0, 0.1, 0.2, 0.3, 0.4, 0.48, 0.5, 1], ease: "easeInOut", repeat: Infinity }}
      >
        <div className="relative flex items-center justify-center w-[32px] h-[32px]">
          <Bomb size={32} />
          {/* Fuse Spark */}
          <motion.div
            className="absolute top-[2px] right-[4px] w-[5px] h-[5px] bg-[#fcd34d] rounded-full blur-[1px] mix-blend-screen"
            animate={{ 
              scale: [0, 1, 1.5, 0.8, 2, 0, 0],
              opacity: [0, 0, 1, 1, 1, 0, 0]
            }}
            transition={{ duration: 2.4, times: [0, 0.1, 0.2, 0.35, 0.45, 0.48, 1], ease: "linear", repeat: Infinity }}
          />
          {/* Fuse Glow */}
          <motion.div
            className="absolute top-0 right-[2px] w-[10px] h-[10px] bg-[#ea580c] rounded-full blur-[4px] mix-blend-screen"
            animate={{ 
              scale: [0, 0, 1, 1.5, 2, 0, 0],
              opacity: [0, 0, 0.6, 0.9, 1, 0, 0] 
            }}
            transition={{ duration: 2.4, times: [0, 0.1, 0.2, 0.35, 0.45, 0.48, 1], ease: "linear", repeat: Infinity }}
          />
        </div>
      </motion.div>
      {/* Explosion flash */}
      <motion.div
        className="absolute w-[80px] h-[80px] bg-orange-500 rounded-full blur-[12px] mix-blend-screen z-20"
        animate={{ scale: [0, 0, 2, 0], opacity: [0, 0, 1, 0] }}
        transition={{ duration: 2.4, times: [0, 0.48, 0.5, 0.6], ease: "easeOut", repeat: Infinity }}
      />
      {/* Gem */}
      <motion.div
        className="absolute origin-center z-30 text-green-500 drop-shadow-[0_2px_8px_rgba(34,197,94,0.4)]"
        animate={{ scale: [0, 0, 1.2, 1, 1, 0], opacity: [0, 0, 1, 1, 1, 0], y: [15, 15, 0, 0, 0, -15] }}
        transition={{ duration: 2.4, times: [0, 0.48, 0.53, 0.6, 0.9, 1], ease: "anticipate", repeat: Infinity }} 
      >
        <Gem size={32} fill="currentColor" />
      </motion.div>
    </div>
  );
};
