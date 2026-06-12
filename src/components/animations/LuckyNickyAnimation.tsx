import React from 'react';
import { motion } from 'motion/react';

export const LuckyNickyAnimation: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="text-[36px]"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        🍀
      </motion.div>
      {/* Coins falling/pop */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-[14px]"
          animate={{
            y: [10, -30, 40],
            x: [(i - 1) * 20, (i - 1) * 30, (i - 1) * 40],
            opacity: [0, 1, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut"
          }}
        >
          🪙
        </motion.div>
      ))}
    </div>
  );
};
