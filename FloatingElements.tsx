import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorGlow() {
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const xSpring = useSpring(x, { stiffness: 500, damping: 40 });
  const ySpring = useSpring(y, { stiffness: 500, damping: 40 });

  useEffect(() => {
    // Disable on touch devices
    if ('ontouchstart' in window) return;

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const handleLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, [x, y]);

  if (!visible) return null;

  return (
    <motion.div
      style={{ x: xSpring, y: ySpring }}
      className="fixed top-0 left-0 w-6 h-6 rounded-full bg-lime-400/20 pointer-events-none z-[9999] mix-blend-screen hidden md:block"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full h-full rounded-full border border-lime-400/40" />
    </motion.div>
  );
}
