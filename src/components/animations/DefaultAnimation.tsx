import React from 'react';
import { motion } from 'motion/react';

export const DefaultAnimation: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-50">
      <motion.div 
        className="w-full h-full bg-gradient-to-tr from-purple-400/0 via-purple-400/50 to-purple-400/0"
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ skewX: -20 }}
      />
    </div>
  );
};
