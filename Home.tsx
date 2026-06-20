import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Eye, Heart, Leaf, Award, Users, Zap } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import Marquee from '../components/Marquee';

const timeline = [
  { year: '2018', title: 'The Spark', desc: 'Three athletes in a garage, frustrated with shoes that forced a choice between performance and style. They sketched the first STRYDE prototype on a napkin.' },
  { year: '2019', title: 'First Drop', desc: 'The Velocity Pro launches. 500 pairs sell out in 48 hours. The community is born.' },
  { year: '2021', title: 'Going Global', desc: 'STRYDE expands to 50 countries. The Iron Forge becomes the #1 rated training shoe in Europe.' },
  { year: '2023', title: 'Carbon Revolution', desc: 'We introduce our proprietary carbon plate technology. The Volt Strike changes basketball footwear forever.' },
  { year: '2025', title: '2 Million Strong', desc: 'Today, 2 million athletes in 150 countries choose STRYDE. And we are just getting started.' },
];

const values = [
  { icon: Target, title: 'Performance First', desc: 'Every design decision starts with the athlete. If it does not make you faster, stronger, or more comfortable, it does not make the shoe.' },
  { icon: Heart, title: 'No Compromise', desc: 'We refuse to choose between function and beauty. Every STRYDE shoe delivers both, without exception.' },
  { icon: Leaf, title: 'Responsibility', desc: 'Sustainable materials, ethical manufacturing, and shoes built to last decades — not seasons.' },
  { icon: Users, title: 'Community Driven', desc: 'We build with our athletes, not just for them. Your feedback shapes every product we make.' },
];

export default function About() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div className="bg-[#0A0A0B] text-white overflow-x-hidden">
      {/* ==================== HERO ==================== */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <img src="/images/about-mission.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 text-center px-5 max-w-4xl mx-auto pt-20"
        >
          <p className="text-lime-400 text-xs font-bold uppercase tracking-widest mb-4">Our Story</p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter leading-[0.85]">
            WE BUILD<br />
            <span className="text-lime-400">LEGACY</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
            STRYDE is not a shoe company. We are a movement — built by athletes, for athletes, obsessed with the perfect step.
          </p>
        </motion.div>
      </section>

      {/* ==================== MISSION & VISION ==================== */}
      <section className="py-16 md:py-32 px-5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12">
          <ScrollReveal y={-30}>
            <div className="bg-[#131316] border border-white/[0.06] rounded-3xl p-8 md:p-10 h-full">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-lime-400/10 border border-lime-400/30 mb-5">
                <Target size={24} className="text-lime-400" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-black italic tracking-tighter mb-4">Our Mission</h2>
              <p className="text-white/60 text-base leading-relaxed">
                To engineer footwear that eliminates the compromise between performance and style. Every shoe we make must empower athletes to move further, faster, and with more confidence — while looking extraordinary doing it.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal y={30}>
            <div className="bg-[#131316] border border-white/[0.06] rounded-3xl p-8 md:p-10 h-full">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-lime-400/10 border border-lime-400/30 mb-5">
                <Eye size={24} className="text-lime-400" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-black italic tracking-tighter mb-4">Our Vision</h2>
              <p className="text-white/60 text-base leading-relaxed">
                A world where every athlete — regardless of sport, level, or background — has access to footwear engineered with the same obsessive precision as Olympic equipment. We envision STRYDE on the feet of champions and everyday heroes alike.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== FOUNDER STORY ==================== */}
      <section className="py-12 md:py-24 px-5 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <ScrollReveal y={-30}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <img src="/images/about-craft.jpg" alt="Craftsmanship" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </ScrollReveal>
          <ScrollReveal y={30}>
            <p className="text-lime-400 text-xs font-bold uppercase tracking-widest mb-3">How It Started</p>
            <h2 className="font-display text-4xl md:text-5xl font-black italic tracking-tighter mb-5 leading-[0.9]">
              THE GARAGE<br />WHERE IT BEGAN
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-4">
              In 2018, three athletes — a marathon runner, a basketball player, and a CrossFit competitor — sat in a Bangalore garage, frustrated. Every shoe they owned forced a choice: perform well or look good. Never both.
            </p>
            <p className="text-white/60 text-base leading-relaxed mb-4">
              They sketched a prototype on a napkin: a shoe with energy-return foam, a breathable engineered mesh upper, and a silhouette bold enough to turn heads on the street. They called it STRYDE — because every step is a statement.
            </p>
            <p className="text-white/60 text-base leading-relaxed">
              That first prototype became the Velocity Pro. It sold out in 48 hours. A movement was born.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Marquee text="OBSESSED WITH EVERY STEP · ENGINEERED NOT DESIGNED · STRYDE" speed={35} />

      {/* ==================== TIMELINE ==================== */}
      <section className="py-16 md:py-32 px-5">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-lime-400 text-xs font-bold uppercase tracking-widest mb-2">The Journey</p>
            <h2 className="font-display text-4xl md:text-6xl font-black italic tracking-tighter">Our Timeline</h2>
          </ScrollReveal>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />

            {timeline.map((t, i) => (
              <ScrollReveal key={t.year} delay={i * 0.05}>
                <div className={`relative flex gap-6 md:gap-0 mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-lime-400 -translate-x-1/2 mt-2 ring-4 ring-black z-10" />

                  {/* Content */}
                  <div className={`pl-12 md:pl-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <p className="font-display text-3xl md:text-4xl font-black italic text-lime-400 mb-2">{t.year}</p>
                    <h3 className="font-display text-xl font-bold text-white mb-2">{t.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{t.desc}</p>
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== VALUES ==================== */}
      <section className="py-12 md:py-24 px-5 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-10">
            <p className="text-lime-400 text-xs font-bold uppercase tracking-widest mb-2">What We Believe</p>
            <h2 className="font-display text-4xl md:text-6xl font-black italic tracking-tighter">Our Values</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.1}>
                <div className="flex gap-5 bg-[#131316] border border-white/[0.06] rounded-2xl p-6 hover:border-lime-400/20 transition-colors h-full">
                  <div className="shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full bg-lime-400/10 border border-lime-400/30">
                    <v.icon size={22} className="text-lime-400" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white mb-1.5">{v.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TEAM IMAGE ==================== */}
      <section className="py-12 md:py-24 px-5 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="relative aspect-[21/9] rounded-3xl overflow-hidden">
              <img src="/images/about-team.jpg" alt="STRYDE team" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-center">
                <p className="text-white/60 text-sm uppercase tracking-widest mb-2">Built by athletes</p>
                <h2 className="font-display text-3xl md:text-5xl font-black italic tracking-tighter mb-4">FOR ATHLETES</h2>
                <Link
                  to="/shop"
                  className="group inline-flex items-center gap-2 px-8 py-3.5 bg-lime-400 text-black font-bold uppercase text-sm tracking-wide hover:bg-lime-300 transition-all rounded-xl"
                >
                  Shop the Collection
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
