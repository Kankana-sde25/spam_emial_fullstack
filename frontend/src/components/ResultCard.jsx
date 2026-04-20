import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const ResultCard = ({ result, darkMode }) => {
  if (!result) return null;

  const isSpam = result.prediction.toLowerCase() === 'spam';
  const confidence = (result.spam_probability * 100).toFixed(1);
  
  // Choose colors
  const spambg = darkMode ? 'bg-red-500/10 border-red-500/20' : 'bg-red-50 border-red-200';
  const spamtext = darkMode ? 'text-red-400' : 'text-red-600';
  
  const safebg = darkMode ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200';
  const safetext = darkMode ? 'text-emerald-400' : 'text-emerald-600';

  const cardbg = isSpam ? spambg : safebg;
  const textcolor = isSpam ? spamtext : safetext;
  const Icon = isSpam ? AlertTriangle : CheckCircle;

  return (
    <motion.div
      initial={{ y: 20, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      className={`w-full max-w-3xl mx-auto mt-8 p-6 sm:p-8 rounded-2xl border backdrop-blur-md shadow-lg ${cardbg}`}
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className={`p-4 rounded-full ${isSpam ? 'bg-red-500/20' : 'bg-emerald-500/20'}`}>
            <Icon className={`w-8 h-8 ${textcolor}`} />
          </div>
          <div>
            <h3 className={`text-2xl font-bold uppercase tracking-wide ${textcolor}`}>
              {isSpam ? 'Warning: Spam Detected' : 'Safe Message'}
            </h3>
            <p className={`mt-1 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              The AI predicts this message is {isSpam ? 'likely' : 'unlikely'} to be spam.
            </p>
          </div>
        </div>

        <div className={`flex flex-col items-center justify-center sm:border-l pl-0 sm:pl-8 ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
          <div className="text-4xl font-black tabular-nums tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-gray-500 to-gray-900 dark:from-white dark:to-gray-500">
            {confidence}%
          </div>
          <div className={`text-sm font-semibold uppercase tracking-widest mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Confidence
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-8">
        <div className="flex justify-between text-xs font-semibold mb-2 text-gray-500">
          <span>Safe (0%)</span>
          <span>Spam (100%)</span>
        </div>
        <div className={`h-3 rounded-full overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${confidence}%` }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            className={`h-full ${
              isSpam 
                ? 'bg-gradient-to-r from-orange-400 to-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' 
                : 'bg-gradient-to-r from-teal-400 to-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]'
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ResultCard;
