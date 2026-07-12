import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Building2 } from 'lucide-react';

export const QuickQuidAnimation: React.FC = () => {
  const [activeCells, setActiveCells] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newActive = [];
      for (let i = 0; i < 16; i++) {
        if (Math.random() > 0.7) newActive.push(i);
      }
      setActiveCells(newActive);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-90 bg-purple-950/40">
      {/* City skyline silhouette */}
      <motion.div
        className="absolute bottom-0 w-full flex justify-center items-end text-purple-400/30 gap-[2px] px-2"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Building2 size={24} />
        <Building2 size={32} className="mb-[-4px]" />
        <Building2 size={20} />
        <Building2 size={28} className="mb-[-2px]" />
      </motion.div>

      {/* Cyber/Neon Grid */}
      <div className="relative z-10 grid grid-cols-4 gap-[2px] p-2 bg-purple-800/30 border border-purple-500/30 rounded-md backdrop-blur-sm transform rotate-12 scale-[0.85] shadow-[0_0_15px_rgba(168,85,247,0.3)]">
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-[10px] h-[10px] rounded-[1px] bg-yellow-400 transition-opacity duration-300"
            style={{ opacity: activeCells.includes(i) ? 0.9 : 0.15 }}
            animate={activeCells.includes(i) ? { 
              boxShadow: ["0 0 0px #facc15", "0 0 8px #facc15", "0 0 0px #facc15"] 
            } : {}}
            transition={{ duration: 0.8 }}
          />
        ))}
      </div>
    </div>
  );
};
