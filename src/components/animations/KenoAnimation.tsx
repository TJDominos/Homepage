import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export const KenoAnimation: React.FC = () => {
  const [activeIndices, setActiveIndices] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newActive = [];
      const len = 9;
      for (let i = 0; i < len; i++) {
        if (Math.random() > 0.5) newActive.push(i);
      }
      setActiveIndices(newActive);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center gap-[2rem] flex-wrap p-[8rem] opacity-90">
      {Array.from({ length: 9 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-[14rem] h-[14rem] rounded-sm bg-purple-600 flex items-center justify-center text-[8px] text-white font-bold transition-opacity duration-300"
          style={{ opacity: activeIndices.includes(i) ? 1 : 0.2 }}
        >
          {i + 1}
        </motion.div>
      ))}
    </div>
  );
};
