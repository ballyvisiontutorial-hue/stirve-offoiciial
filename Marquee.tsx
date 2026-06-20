import { motion } from 'framer-motion';

export default function FloatingElements() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
      {/* Floating shoe silhouettes / geometric shapes */}
      <motion.div
        animate={{ y: [0, -30, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[20%] left-[8%] w-16 h-16 rounded-full bg-lime-400/5 border border-lime-400/10 backdrop-blur-sm hidden lg:block"
      />
      <motion.div
        animate={{ y: [0, 40, 0], rotate: [0, -12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-[60%] right-[10%] w-24 h-24 rounded-full bg-white/[0.02] border border-white/5 backdrop-blur-sm hidden lg:block"
      />
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-[35%] right-[15%] w-10 h-10 rounded-full bg-lime-400/5 border border-lime-400/10 hidden lg:block"
      />
    </div>
  );
}
