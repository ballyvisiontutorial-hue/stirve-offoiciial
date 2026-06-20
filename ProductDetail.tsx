import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import TiltCard from '../components/TiltCard';
import Marquee from '../components/Marquee';

const collections = [
  {
    name: 'Running',
    tagline: 'Engineered for speed',
    desc: 'Ultralight racing flats and daily trainers with energy-return foam. Built for PRs and podiums.',
    img: '/images/product-1.jpg',
    count: '4 models',
    accent: 'from-lime-400/20',
  },
  {
    name: 'Lifestyle',
    tagline: 'Everyday comfort',
    desc: 'Premium canvas, leather, and knit uppers for all-day wear. Where comfort meets contemporary style.',
    img: '/images/product-2.jpg',
    count: '4 models',
    accent: 'from-blue-400/20',
  },
  {
    name: 'Basketball',
    tagline: 'Dominate the court',
    desc: 'Explosive cushioning, carbon plates, and ankle support. Built for the hardest cuts and highest jumps.',
    img: '/images/product-3.jpg',
    count: '2 models',
    accent: 'from-orange-400/20',
  },
  {
    name: 'Training',
    tagline: 'Built for the grind',
    desc: 'Stable platforms, reinforced toes, and multi-surface grip. From heavy lifts to box jumps.',
    img: '/images/product-4.jpg',
    count: '2 models',
    accent: 'from-green-400/20',
  },
];

export default function Collections() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div className="bg-[#0A0A0B] text-white min-h-screen pt-20 md:pt-24 overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden grain">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <img src="/images/about-team.jpg" alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B]/50 to-[#0A0A0B]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-5"
        >
          <p className="text-lime-400 text-xs font-bold uppercase tracking-widest mb-3">Explore</p>
          <h1 className="font-display text-5xl md:text-8xl font-black italic tracking-tighter leading-[0.85]">
            THE<br /><span className="text-lime-400">COLLECTIONS</span>
          </h1>
          <p className="text-white/50 text-sm md:text-base mt-5 max-w-md mx-auto">Four collections. One purpose. Find the shoe engineered for your stride.</p>
        </motion.div>
      </section>

      <Marquee text="RUNNING · LIFESTYLE · BASKETBALL · TRAINING · STRYDE" speed={28} />

      {/* Collections grid with 3D tilt */}
      <section className="py-12 md:py-20 px-5">
        <div className="max-w-7xl mx-auto space-y-6 md:space-y-10">
          {collections.map((col, i) => (
            <ScrollReveal key={col.name} delay={i * 0.05}>
              <TiltCard intensity={6} className="group cursor-pointer" >
                <div onClick={() => window.location.href = `/shop?category=${col.name}`}>
                  <div className={`relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden bg-[#131316] border border-white/[0.06]`} style={{ transformStyle: 'preserve-3d' }}>
                    <img src={col.img} alt={col.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700" />
                    <div className={`absolute inset-0 bg-gradient-to-r ${col.accent} via-transparent to-transparent`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/40 to-transparent" />
                    <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-12" style={{ transform: 'translateZ(40px)' }}>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-lime-400 text-black text-[10px] font-bold uppercase tracking-wider rounded-full">{col.count}</span>
                        <span className="text-white/40 text-xs uppercase tracking-widest">{col.tagline}</span>
                      </div>
                      <h2 className="font-display text-4xl md:text-7xl font-black italic tracking-tighter mb-3">{col.name}</h2>
                      <p className="text-white/60 text-sm md:text-base max-w-md leading-relaxed mb-4">{col.desc}</p>
                      <span className="inline-flex items-center gap-2 text-lime-400 font-bold uppercase text-sm tracking-wide">
                        Shop Collection <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Breadcrumb nav */}
      <section className="py-8 px-5 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-white/40">
          <Link to="/" className="hover:text-lime-400">Home</Link>
          <ChevronRight size={12} />
          <span className="text-white/60">Collections</span>
        </div>
      </section>
    </div>
  );
}
