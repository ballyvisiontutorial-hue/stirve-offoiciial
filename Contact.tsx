import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Zap, Shield, Truck, Star, Quote, ChevronRight, ChevronDown } from 'lucide-react';
import Marquee from '../components/Marquee';
import ScrollReveal from '../components/ScrollReveal';
import AnimatedCounter from '../components/AnimatedCounter';
import FloatingElements from '../components/FloatingElements';
import TiltCard from '../components/TiltCard';
import ProductCard, { Product } from '../components/ProductCard';

const categories = [
  { name: 'Running', desc: 'Engineered for speed', img: '/images/product-1.jpg' },
  { name: 'Lifestyle', desc: 'Everyday comfort', img: '/images/product-2.jpg' },
  { name: 'Basketball', desc: 'Dominate the court', img: '/images/product-3.jpg' },
  { name: 'Training', desc: 'Built for the grind', img: '/images/product-4.jpg' },
];

const testimonials = [
  { name: 'Marcus T.', role: 'Marathon Runner', text: 'STRYDE changed my game. The Velocity Pro shaved 3 minutes off my PR. Never going back.', rating: 5 },
  { name: 'Sarah K.', role: 'Verified Buyer', text: 'The quality is insane. I get compliments every time I wear them. Worth every penny.', rating: 5 },
  { name: 'James L.', role: 'Personal Trainer', text: 'My clients ask about my shoes every session. The Iron Forge is the best training shoe I have owned.', rating: 5 },
];

const socialImages = [
  '/images/social-1.jpg',
  '/images/social-2.jpg',
  '/images/social-3.jpg',
  '/images/social-4.jpg',
];

const faqs = [
  { q: 'What is your return policy?', a: 'We offer 30-day free returns on all unworn shoes. If you are not 100% satisfied, we will refund your purchase — no questions asked.' },
  { q: 'How long does shipping take?', a: 'Orders ship within 24 hours. Standard delivery takes 2-3 business days. Free shipping on all orders over $75.' },
  { q: 'Are STRYDE shoes true to size?', a: 'Yes! Our shoes fit true to standard US sizing. If you are between sizes, we recommend sizing up for running shoes and staying true for lifestyle models.' },
  { q: 'What is the warranty?', a: 'Every pair of STRYDE shoes comes with a 2-year warranty covering manufacturing defects. We stand behind our craftsmanship.' },
  { q: 'Do you ship internationally?', a: 'Yes! We ship to 150+ countries worldwide. International shipping rates are calculated at checkout based on destination.' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

function FAQItem({ faq, index }: { faq: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <ScrollReveal delay={index * 0.05}>
      <div className="border-b border-white/10">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between py-5 text-left group"
        >
          <span className="font-display text-white font-bold text-base md:text-lg pr-4 group-hover:text-lime-400 transition-colors">
            {faq.q}
          </span>
          <ChevronDown
            size={20}
            className={`text-white/40 shrink-0 transition-transform duration-300 ${open ? 'rotate-180 text-lime-400' : ''}`}
          />
        </button>
        <motion.div
          initial={false}
          animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <p className="text-white/50 text-sm leading-relaxed pb-5 pr-8">{faq.a}</p>
        </motion.div>
      </div>
    </ScrollReveal>
  );
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const heroTextY = useTransform(scrollY, [0, 600], [0, 120]);
  const heroTextOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroVideoScale = useTransform(scrollY, [0, 600], [1, 1.15]);
  const heroVideoY = useTransform(scrollY, [0, 600], [0, 80]);

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((data) => {
        setProducts(data.slice(0, 4));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="bg-[#0A0A0B] text-white overflow-x-hidden">
      {/* ==================== CINEMATIC HERO ==================== */}
      <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden grain">
        <motion.div style={{ scale: heroVideoScale, y: heroVideoY }} className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/images/hero-shoe.png"
            className="w-full h-full object-cover"
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0A0A0B]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
        </motion.div>

        <FloatingElements />

        <motion.div
          style={{ y: heroTextY, opacity: heroTextOpacity }}
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 text-center px-5 max-w-5xl mx-auto"
        >
          <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lime-400/10 border border-lime-400/30 mb-6 backdrop-blur-sm">
            <Zap size={14} className="text-lime-400" />
            <span className="text-lime-400 text-xs font-bold uppercase tracking-widest">New Drop · Spring 2025</span>
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black italic tracking-tighter leading-[0.82]"
            style={{ textShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
          >
            MOVE WITH
            <br />
            <span className="text-lime-400">PURPOSE</span>
          </motion.h1>

          <motion.p variants={item} className="text-white/70 text-base md:text-xl mt-6 max-w-xl mx-auto leading-relaxed">
            We don't just make shoes. We engineer the moment your foot meets the ground — and everything that follows.
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-8 sm:mt-10">
            <Link
              to="/shop"
              className="group inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 bg-lime-400 text-black font-bold uppercase text-sm tracking-wide hover:bg-lime-300 hover:shadow-2xl hover:shadow-lime-400/30 transition-all"
            >
              Shop the Collection
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/collections"
              className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 border border-white/20 text-white font-bold uppercase text-sm tracking-wide hover:bg-white/5 hover:border-white/40 transition-all backdrop-blur-sm"
            >
              Explore Collections
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-1 h-2 rounded-full bg-white/60" />
          </div>
        </motion.div>
      </section>

      <Marquee text="STRYDE · MOVE WITH PURPOSE · STRYDE · MOVE WITH PURPOSE" />

      {/* ==================== ANIMATED STATS ==================== */}
      <section className="py-16 md:py-28 px-5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: 2, suffix: 'M+', label: 'Happy Customers' },
            { value: 150, suffix: '+', label: 'Countries' },
            { value: 50, suffix: '+', label: 'Shoe Models' },
            { value: 4.9, suffix: '★', label: 'Avg Rating', decimals: 1 },
          ].map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 0.1} className="text-center">
              <div className="text-4xl md:text-7xl font-black italic text-lime-400 mb-1">
                <AnimatedCounter value={s.value} suffix={s.suffix} decimals={s.decimals || 0} />
              </div>
              <div className="text-white/50 text-xs md:text-sm uppercase tracking-wider">{s.label}</div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ==================== FEATURED PRODUCTS — 3D TILT ==================== */}
      <section className="py-12 md:py-24 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8 md:mb-10">
            <div>
              <ScrollReveal>
                <p className="text-lime-400 text-xs font-bold uppercase tracking-widest mb-2">Best Sellers</p>
                <h2 className="font-display text-4xl md:text-6xl font-black italic tracking-tighter">Featured Drops</h2>
              </ScrollReveal>
            </div>
            <Link to="/shop" className="hidden md:flex items-center gap-2 text-white/60 hover:text-lime-400 transition-colors text-sm font-medium uppercase tracking-wide">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-[#131316] rounded-2xl shimmer" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6" style={{ perspective: '1000px' }}>
              {products.map((p, i) => (
                <TiltCard key={p.id} intensity={8} className="h-full">
                  <div onClick={() => navigate(`/product/${p.id}`)} className="h-full">
                    <ProductCard product={p} index={i} onSelect={(prod) => navigate(`/product/${prod.id}`)} />
                  </div>
                </TiltCard>
              ))}
            </div>
          )}

          <div className="mt-8 md:hidden">
            <Link to="/shop" className="flex items-center justify-center gap-2 text-lime-400 text-sm font-medium uppercase tracking-wide">
              View All <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== CATEGORIES ==================== */}
      <section className="py-12 md:py-24 px-5">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-8 md:mb-10">
            <p className="text-lime-400 text-xs font-bold uppercase tracking-widest mb-2">Find Your Fit</p>
            <h2 className="font-display text-4xl md:text-6xl font-black italic tracking-tighter">Shop by Category</h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/shop?category=${cat.name}`}>
                  <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#131316]">
                    <img src={cat.img} alt={cat.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                      <h3 className="font-display text-xl md:text-2xl font-black italic text-white mb-1">{cat.name}</h3>
                      <p className="text-white/60 text-xs md:text-sm mb-2">{cat.desc}</p>
                      <span className="inline-flex items-center gap-1.5 text-lime-400 text-xs md:text-sm font-bold uppercase tracking-wide">
                        Shop <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== BRAND STORY TEASER ==================== */}
      <section className="py-12 md:py-32 px-5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <ScrollReveal y={-30}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <img src="/images/about-mission.jpg" alt="Athlete running" loading="lazy" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="font-display text-5xl font-black italic text-lime-400">2018</p>
                <p className="text-white/60 text-xs uppercase tracking-wider">The year it began</p>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal y={30}>
            <p className="text-lime-400 text-xs font-bold uppercase tracking-widest mb-3">Our Story</p>
            <h2 className="font-display text-4xl md:text-6xl font-black italic tracking-tighter mb-5 leading-[0.9]">
              BORN FROM<br />THE STREETS
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-4">
              STRYDE was founded by athletes who refused to compromise between performance and style. We engineer every shoe with cutting-edge technology and bold, unapologetic design.
            </p>
            <p className="text-white/60 text-base leading-relaxed mb-6">
              From the track to the street, every STRYDE shoe is crafted to move with you — wherever life takes you.
            </p>
            <Link to="/about" className="group inline-flex items-center gap-2 text-lime-400 font-bold uppercase text-sm tracking-wide">
              Read Our Full Story
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="py-12 md:py-24 px-5 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-10">
            <p className="text-lime-400 text-xs font-bold uppercase tracking-widest mb-2">Loved by Athletes</p>
            <h2 className="font-display text-4xl md:text-6xl font-black italic tracking-tighter">What They Say</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {testimonials.map((t, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-[#131316] border border-white/[0.06] rounded-2xl p-6 h-full hover:border-lime-400/20 transition-colors">
                  <Quote size={28} className="text-lime-400/30 mb-3" />
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} size={14} className="fill-lime-400 text-lime-400" />
                    ))}
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">"{t.text}"</p>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-white/40 text-xs">{t.role}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SOCIAL PROOF / UGC ==================== */}
      <section className="py-12 md:py-24 px-5 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-8">
            <p className="text-lime-400 text-xs font-bold uppercase tracking-widest mb-2">#StrydeSquad</p>
            <h2 className="font-display text-4xl md:text-6xl font-black italic tracking-tighter">Worn Worldwide</h2>
            <p className="text-white/50 text-sm mt-3 max-w-md mx-auto">Join 2 million athletes who choose STRYDE. Tag us @stryde to be featured.</p>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {socialImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="relative aspect-square rounded-2xl overflow-hidden bg-[#131316] cursor-pointer"
              >
                <img src={img} alt="Customer wearing STRYDE" loading="lazy" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section className="py-12 md:py-24 px-5 border-t border-white/10">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal className="text-center mb-10">
            <p className="text-lime-400 text-xs font-bold uppercase tracking-widest mb-2">Got Questions?</p>
            <h2 className="font-display text-4xl md:text-6xl font-black italic tracking-tighter">FAQ</h2>
          </ScrollReveal>
          <div>
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURES ==================== */}
      <section className="py-12 md:py-24 px-5 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {[
            { icon: Truck, title: 'Free Shipping', desc: 'On all orders over $75. Delivered in 2-3 business days.' },
            { icon: Shield, title: '2-Year Warranty', desc: 'Every pair backed by our quality guarantee.' },
            { icon: Zap, title: 'Performance Tech', desc: 'Energy-return foam, carbon plates, engineered mesh.' },
          ].map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 0.1} className="text-center md:text-left">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-lime-400/10 border border-lime-400/30 mb-4">
                <f.icon size={24} className="text-lime-400" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2">{f.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
