import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export const Daily4Animation: React.FC = () => {
  const [nums, setNums] = useState([4, 6, 1, 6]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNums(Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)));
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center gap-[4rem]">
      {nums.map((num, i) => {
        const isLast = i === 3;
        return (
          <motion.div
            key={i}
            className={`w-[16rem] h-[16rem] rounded-full shadow-md flex items-center justify-center font-bold text-white border border-white/60 text-[10rem] relative ${isLast ? 'bg-[#ff4d4d]' : 'bg-[#18181b]'}`}
            animate={{ 
              y: [0, -5, 0],
            }}
            transition={{ 
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.1
            }}
          >
            <div className="absolute top-[3rem] left-[3rem] w-[3rem] h-[3rem] bg-white rounded-full opacity-90"></div>
            {num}
          </motion.div>
        );
      })}
    </div>
  );
};
