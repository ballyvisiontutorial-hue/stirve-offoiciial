import { motion } from 'framer-motion';

export default function Marquee({ text, speed = 30 }: { text: string; speed?: number }) {
  const items = Array.from({ length: 8 }, (_, i) => i);
  return (
    <div className="overflow-hidden py-3 md:py-4 bg-lime-400 -rotate-1 my-4 md:my-8">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {[...items, ...items].map((_, i) => (
          <span key={i} className="font-display text-black text-2xl md:text-4xl font-black italic uppercase tracking-tighter flex items-center gap-8">
            {text}
            <span className="w-2.5 h-2.5 rounded-full bg-black/20" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
