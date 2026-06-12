import React from 'react';
import { motion } from 'motion/react';

export const FruitsGardenAnimation: React.FC = () => {
  const fruits = ['🍒', '🍋', '🍇', '🍉', '🍊'];
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {fruits.map((fruit, i) => (
        <motion.div
          key={i}
          className="absolute text-[18px]"
          initial={{ y: -30, x: (i * 20 + 5) + "%" }}
          animate={{ 
            y: 80, 
            opacity: [0, 1, 1, 0],
            rotate: 360 
          }}
          transition={{ 
            duration: 1.5 + (i * 0.2), 
            delay: i * 0.2, 
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {fruit}
        </motion.div>
      ))}
    </div>
  );
};
