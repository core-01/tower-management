
import { Sparkles, Bot } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 10 }}
        className="bg-gray-800 p-8 rounded-2xl shadow-xl max-w-md"
      >
        <motion.div
          animate={{ rotate: [0, 15, -15, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="flex justify-center mb-6"
        >
          <Bot className="w-16 h-16 text-blue-400" />
        </motion.div>

        <h1 className="text-3xl font-bold mb-4 flex justify-center items-center gap-2">
          <Sparkles className="w-6 h-6 text-yellow-400" />
          Coming Soon
          <Sparkles className="w-6 h-6 text-yellow-400" />
        </h1>

        <p className="text-gray-300 text-lg">
          Hi there! 🤖 I'm still working on this feature. Hang tight — it'll be live soon!
        </p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-6 text-sm text-gray-400"
        >
          Meanwhile, feel free to explore other parts of Tower-Mangement.
        </motion.div>
      </motion.div>
    </div>
  );
}
