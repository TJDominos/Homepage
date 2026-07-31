import React from 'react';
import { motion } from 'motion/react';

export const RouletteAnimation: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center transform scale-[0.85]">
      <motion.div
        className="w-[56px] h-[56px] rounded-full border-[6px] border-red-500/90 border-t-black/90 border-b-black/90 flex items-center justify-center relative shadow-lg bg-green-800/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, ease: "linear", repeat: Infinity }}
      >
        <div className="w-[36px] h-[36px] rounded-full border border-yellow-400/60 flex items-center justify-center relative">
          <motion.div 
            className="w-[6px] h-[6px] bg-white rounded-full shadow-[0_0_4px_white] absolute top-[4px] right-[10px]"
            animate={{ rotate: -360, originX: "-10px", originY: "20px" }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </div>
  );
};
