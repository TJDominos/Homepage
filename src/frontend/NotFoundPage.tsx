import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 min-h-[500px]">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-10 md:p-14 flex flex-col items-center justify-center w-full max-w-[500px] shadow-sm border border-black/5"
      >
        <h2 className="text-[#6A3FE6] text-[28px] font-bold mb-2">
          404
        </h2>
        <h1 className="text-[32px] font-bold text-black mb-4 text-center leading-tight">
          Page not found
        </h1>
        <p className="text-[15px] text-black/50 mb-10 text-center font-medium">
          No route matched this URL.
        </p>
        
        <button
          onClick={() => navigate('/')}
          className="bg-[#111] hover:bg-black text-white rounded-full px-8 py-3 h-[44px] flex items-center justify-center text-[15px] font-bold transition-all shadow-sm w-full max-w-[200px]"
        >
          Back to home
        </button>
      </motion.div>
    </div>
  );
};
