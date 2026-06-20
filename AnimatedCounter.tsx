import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, Feather, Shield, Activity, Layers, ArrowRight, ChevronRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import Marquee from '../components/Marquee';
import TiltCard from '../components/TiltCard';

const technologies = [
  {
    icon: Zap,
    name: 'Energy-Return Foam',
    tagline: '85% energy return',
    desc: 'Our proprietary PEBA-based midsole compound absorbs impact and propels you forward. Lab-tested to return 85% of energy on every stride — 20% more than standard EVA foam.',
    stat: '+20%',
    statLabel: 'vs standard foam',
  },
  {
    icon: Feather,
    name: 'Ultralight Construction',
    tagline: 'As light as air',
    desc: '3D-knit uppers and optimized midsole geometry reduce weight by up to 30% versus competitors. At 8.2 oz, you will forget you are wearing them.',
    stat: '8.2oz',
    statLabel: 'lightest model',
  },
  {
    icon: Shield,
    name: 'Carbon Fiber Plate',
    tagline: 'Explosive propulsion',
    desc: 'A full-length carbon fiber plate runs from heel to toe, creating a lever effect that propels you forward. Originally developed for our basketball line, now in running.',
    stat: '15%',
    statLabel: 'faster first step',
  },
  {
    icon: Activity,
    name: 'Engineered Mesh',
    tagline: '360° breathability',
    desc: 'Variable-density knit adapts to your foot shape while maintaining structural support. 360-degree ventilation channels keep your foot 40% cooler on long runs.',
    stat: '40%',
    statLabel: 'cooler feet',
  },
  {
    icon: Layers,
    name: 'Herringbone Traction',
    tagline: 'Zero slip, total control',
    desc: 'Multi-directional herringbone pattern grips at every angle. Tested on NBA-grade hardwood, outdoor asphalt, and indoor turf. Zero slip in any direction.',
    stat: '0°',
    statLabel: 'slip angle',
  },
  {
    icon: Shield,
    name: 'Sustainable Materials',
    tagline: 'Built to last, built to matter',
    desc: 'Recycled polyester laces, organic cotton canvas, and responsibly-sourced rubber. Every shoe is designed to last decades, not seasons. Resoleable construction on select models.',
    stat: '100%',
    statLabel: 'recycled laces',
  },
];

export default function Technology() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div className="bg-[#0A0A0B] text-white min-h-screen pt-20 md:pt-24 overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden grain">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <img src="/images/about-craft.jpg" alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B]/50 to-[#0A0A0B]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-5"
        >
          <p className="text-lime-400 text-xs font-bold uppercase tracking-widest mb-3">Innovation Lab</p>
          <h1 className="font-display text-5xl md:text-8xl font-black italic tracking-tighter leading-[0.85]">
            THE<br /><span className="text-lime-400">TECHNOLOGY</span>
          </h1>
          <p className="text-white/50 text-sm md:text-base mt-5 max-w-lg mx-auto">Six proprietary technologies. One obsession: the perfect step.</p>
        </motion.div>
      </section>

      <Marquee text="ENGINEERED NOT DESIGNED · OBSESSED WITH EVERY STEP · STRYDE" speed={32} />

      {/* Tech grid with 3D tilt */}
      <section className="py-12 md:py-20 px-5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {technologies.map((tech, i) => (
            <ScrollReveal key={tech.name} delay={(i % 3) * 0.1}>
              <TiltCard intensity={10} className="h-full">
                <div className="bg-[#131316] border border-white/[0.06] rounded-2xl p-6 md:p-8 h-full hover:border-lime-400/20 transition-colors" style={{ transformStyle: 'preserve-3d' }}>
                  <div style={{ transform: 'translateZ(30px)' }}>
                    <div className="flex items-start justify-between mb-5">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-lime-400/10 border border-lime-400/30">
                        <tech.icon size={22} className="text-lime-400" />
                      </div>
                      <div className="text-right">
                        <p className="font-display text-3xl font-black italic text-lime-400">{tech.stat}</p>
                        <p className="text-white/30 text-[10px] uppercase tracking-wider">{tech.statLabel}</p>
                      </div>
                    </div>
                    <h3 className="font-display text-lg font-bold text-white mb-1">{tech.name}</h3>
                    <p className="text-lime-400/60 text-xs uppercase tracking-wider mb-3">{tech.tagline}</p>
                    <p className="text-white/50 text-sm leading-relaxed">{tech.desc}</p>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-5 border-t border-white/10">
        <ScrollReveal className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-4xl md:text-6xl font-black italic tracking-tighter mb-5">EXPERIENCE THE DIFFERENCE</h2>
          <p className="text-white/50 text-sm md:text-base mb-8">Every STRYDE shoe is engineered with these technologies. Find your perfect pair.</p>
          <Link
            to="/shop"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-lime-400 text-black font-bold uppercase text-sm tracking-wide hover:bg-lime-300 transition-all rounded-xl"
          >
            Shop Now
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </ScrollReveal>
      </section>

      {/* Breadcrumb */}
      <section className="py-8 px-5 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-white/40">
          <Link to="/" className="hover:text-lime-400">Home</Link>
          <ChevronRight size={12} />
          <span className="text-white/60">Technology</span>
        </div>
      </section>
    </div>
  );
}
