import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, RefreshCw } from 'lucide-react';

const quotes = [
  { text: 'Small repeats become large changes.', author: 'QuestHabit' },
  { text: 'You only need one clean rep to restart momentum.', author: 'QuestHabit' },
  { text: 'The streak is useful. The return is the skill.', author: 'QuestHabit' },
  { text: 'Make the next action obvious enough to begin.', author: 'QuestHabit' },
  { text: 'Energy follows motion more often than permission.', author: 'QuestHabit' },
];

const QuoteWidget = () => {
  const [quoteIndex, setQuoteIndex] = useState(() => Math.floor(Math.random() * quotes.length));
  const [spinning, setSpinning] = useState(false);

  const handleNewQuote = () => {
    setSpinning(true);
    setTimeout(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
      setSpinning(false);
    }, 300);
  };

  const quote = quotes[quoteIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-gradient-to-br from-cyan-950/50 to-emerald-950/40 backdrop-blur-xl border border-cyan-500/40 rounded-2xl p-6 shadow-2xl overflow-hidden relative"
    >
      <div className="absolute -top-4 -right-4 w-20 h-20 bg-cyan-500/10 rounded-full blur-2xl" />
      <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-emerald-500/10 rounded-full blur-2xl" />

      <div className="relative z-10">
        <div className="flex items-start gap-3 mb-4">
          <motion.div
            animate={{ rotate: spinning ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <Lightbulb className="w-6 h-6 text-yellow-400" />
          </motion.div>
          <h3 className="text-lg font-bold text-cyan-100">Daily Nudge</h3>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={quoteIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-lg font-semibold text-white mb-3 italic leading-relaxed">
              "{quote.text}"
            </p>
            <p className="text-sm text-cyan-200 text-right">{quote.author}</p>
          </motion.div>
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNewQuote}
          className="mt-5 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600/50 to-emerald-600/50 hover:from-cyan-600 hover:to-emerald-600 border border-cyan-500/30 text-cyan-100 hover:text-white font-semibold py-2 rounded-lg transition-all duration-300 cursor-pointer"
        >
          <RefreshCw size={14} className={spinning ? 'animate-spin' : ''} />
          New Nudge
        </motion.button>
      </div>
    </motion.div>
  );
};

export default QuoteWidget;
