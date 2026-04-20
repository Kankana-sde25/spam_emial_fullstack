import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';

const InputCard = ({ onAnalyze, isLoading, darkMode }) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim().length === 0) return;
    onAnalyze(text);
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`w-full max-w-3xl mx-auto p-1 rounded-2xl bg-gradient-to-br transition-colors duration-300 ${
        darkMode 
          ? 'from-indigo-500/20 via-purple-500/20 to-pink-500/20 shadow-[0_0_40px_-15px_rgba(79,70,229,0.3)]' 
          : 'from-indigo-200 via-purple-200 to-pink-200 shadow-xl'
      }`}
    >
      <div className={`p-6 sm:p-8 rounded-[14px] backdrop-blur-xl ${
        darkMode ? 'bg-gray-900/80' : 'bg-white/80'
      }`}>
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste the message content here to analyze..."
            className={`w-full h-48 sm:h-64 p-4 rounded-xl border focus:outline-none focus:ring-2 transition-all resize-none ${
              darkMode 
                ? 'bg-gray-800/50 border-gray-700 text-gray-100 focus:ring-indigo-500/50 placeholder-gray-500' 
                : 'bg-gray-50 border-gray-200 text-gray-900 focus:ring-indigo-400 placeholder-gray-400'
            }`}
          />
          <div className={`absolute bottom-4 right-4 text-xs font-medium ${
            darkMode ? 'text-gray-500' : 'text-gray-400'
          }`}>
            {text.length} characters
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={isLoading || text.trim().length === 0}
            className={`relative flex items-center justify-center space-x-2 px-8 py-3 rounded-xl font-semibold text-white transition-all overflow-hidden group ${
              (isLoading || text.trim().length === 0)
                ? 'opacity-60 cursor-not-allowed bg-gray-500'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-[0_0_20px_rgba(79,70,229,0.5)]'
            }`}
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            
            <span className="relative z-10">
              {isLoading ? 'Analyzing...' : 'Analyze Message'}
            </span>
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin relative z-10" />
            ) : (
              <Send className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default InputCard;
