import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import InputCard from './components/InputCard';
import ResultCard from './components/ResultCard';
import { analyzeMessage } from './services/api';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // Particles / Background bubbles
  const bubbles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: Math.random() * 80 + 20,
    left: Math.random() * 100,
    animationDuration: Math.random() * 20 + 20,
    delay: Math.random() * 10,
  }));

  const handleAnalyze = async (text) => {
    setIsLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await analyzeMessage(text);
      // Ensure smooth loading feeling
      setTimeout(() => {
        setResult(data);
        setIsLoading(false);
      }, 500);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 overflow-hidden relative ${
      darkMode ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#0f1423] to-black text-white' : 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-50 via-white to-gray-200 text-gray-900'
    }`}>
      {/* Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-40">
        {bubbles.map(bubble => (
          <motion.div
            key={bubble.id}
            className={`absolute rounded-full blur-2xl ${darkMode ? 'bg-indigo-600/20' : 'bg-indigo-300/30'}`}
            style={{
              width: bubble.size,
              height: bubble.size,
              left: `${bubble.left}%`,
              bottom: -150,
            }}
            animate={{
              y: [0, -window.innerHeight - 200],
              x: Math.sin(bubble.id) * 100,
            }}
            transition={{
              duration: bubble.animationDuration,
              repeat: Infinity,
              delay: bubble.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="relative z-10 pt-32 pb-16 px-4 flex flex-col items-center justify-center min-h-screen">
        <motion.div 
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full border text-sm font-medium transition-colors bg-opacity-20 backdrop-blur-sm border-indigo-500/30 text-indigo-400 bg-indigo-500/10">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></span>
            Real-time ML Prediction Models
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-sm">
            AI Spam Detection<br/>System
          </h1>
          <p className={`text-lg md:text-xl font-medium max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Paste any text or email content below to instantly analyze whether it is spam or safe, powered by our advanced machine learning classifier.
          </p>
        </motion.div>

        <InputCard onAnalyze={handleAnalyze} isLoading={isLoading} darkMode={darkMode} />

        <div className="w-full h-8 flex justify-center items-center mt-6">
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-500 font-semibold bg-red-500/10 backdrop-blur-md px-6 py-2 rounded-full border border-red-500/20"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          {result && !error && (
            <ResultCard key="result" result={result} darkMode={darkMode} />
          )}
        </AnimatePresence>
        
        {/* Features/Tech Stack Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="mt-32 w-full max-w-5xl text-center"
        >
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-500 to-gray-400">
            Tech Stack Integration
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { title: 'React', desc: 'Frontend Framework' },
              { title: 'FastAPI', desc: 'Backend Service' },
              { title: 'Scikit-Learn', desc: 'ML Modeling' },
              { title: 'Tailwind CSS', desc: 'Styling Engine' }
            ].map((tech) => (
              <div key={tech.title} className={`p-6 rounded-2xl border backdrop-blur-md ${darkMode ? 'bg-gray-800/40 border-gray-700/50 hover:bg-gray-800/80 hover:border-indigo-500/50' : 'bg-white/60 border-gray-200 hover:bg-white min-h-[140px] hover:border-indigo-400'} transition-all duration-300 cursor-pointer`}>
                <h4 className="text-xl font-bold mb-2">{tech.title}</h4>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{tech.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </main>

      <footer className={`relative z-10 w-full py-6 mt-auto border-t text-center text-sm transition-colors ${darkMode ? 'border-gray-800 text-gray-500' : 'border-gray-200 text-gray-400'}`}>
        Designed for premium performance • SpamGuard AI © {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;
