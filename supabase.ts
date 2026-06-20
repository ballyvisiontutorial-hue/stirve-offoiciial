import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';

const announcements = [
  '✦ FREE SHIPPING ON ORDERS OVER $75',
  '✦ 30-DAY FREE RETURNS',
  '✦ NEW SPRING 2025 COLLECTION NOW LIVE',
];

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'Collections', path: '/collections' },
  { label: 'Tech', path: '/technology' },
  { label: 'About', path: '/about' },
];

const mobileLinks = [
  { label: 'All Shoes', path: '/shop' },
  { label: 'Collections', path: '/collections' },
  { label: 'Technology', path: '/technology' },
  { label: 'Running', path: '/shop?category=Running' },
  { label: 'Lifestyle', path: '/shop?category=Lifestyle' },
  { label: 'Basketball', path: '/shop?category=Basketball' },
  { label: 'Training', path: '/shop?category=Training' },
  { label: 'Our Story', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const { count, setIsOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [annIndex, setAnnIndex] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnnIndex((prev) => (prev + 1) % announcements.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.search]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    if (path.includes('category=')) {
      const cat = path.split('category=')[1];
      return location.search === `?category=${cat}`;
    }
    return location.pathname === path;
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Announcement bar */}
      <div className="bg-lime-400 text-black overflow-hidden h-8 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={annIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-[10px] md:text-xs font-bold uppercase tracking-widest"
          >
            {announcements[annIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Main nav */}
      <div
        className={`transition-all duration-300 ${
          scrolled ? 'bg-[#0A0A0B]/80 backdrop-blur-xl border-b border-white/10' : 'bg-[#0A0A0B]/40 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-14 md:h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 group shrink-0" aria-label="STRYDE home">
            <span className="font-display text-xl md:text-2xl font-black tracking-tighter text-white italic">
              STRYDE
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-lime-400 mt-3 group-hover:scale-150 transition-transform" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.path}
                className="relative px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors hover:text-white"
              >
                <span className={isActive(l.path) ? 'text-white' : 'text-white/50'}>{l.label}</span>
                {isActive(l.path) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-lime-400 rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 md:gap-2 shrink-0">
            <button
              onClick={() => navigate('/shop')}
              className="p-2.5 text-white/60 hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Search products"
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2.5 text-white/60 hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Open cart"
            >
              <ShoppingBag size={20} />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-lime-400 text-black text-[10px] font-bold rounded-full flex items-center justify-center"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2.5 text-white min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-[#0A0A0B]/98 backdrop-blur-xl border-b border-white/10"
          >
            <div className="px-5 py-3 flex flex-col gap-0">
              {mobileLinks.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    to={l.path}
                    className="block text-base font-semibold uppercase tracking-wider text-white/70 hover:text-lime-400 py-3.5 border-b border-white/5 min-h-[44px] flex items-center"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
