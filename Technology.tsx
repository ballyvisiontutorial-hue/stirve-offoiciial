import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Star, Check, Truck, Shield, RotateCcw, Ruler, Feather, Layers, Activity,
  Zap, ChevronRight, Plus, Minus, Lock, ChevronDown,
} from 'lucide-react';
import { Product } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import ScrollReveal from '../components/ScrollReveal';

interface Review {
  id: number;
  author: string;
  role: string;
  rating: number;
  title: string;
  body: string;
  verified: boolean;
}

function getSpecs(category: string) {
  const base: Record<string, { weight: string; drop: string; stack: string; upper: string; sole: string; tech: string }> = {
    Running: { weight: '8.2 oz', drop: '8mm', stack: '32mm', upper: 'Engineered Mesh', sole: 'Carbon Rubber', tech: 'Energy-Return Foam' },
    Lifestyle: { weight: '11.5 oz', drop: '10mm', stack: '24mm', upper: 'Premium Canvas', sole: 'Vulcanized Rubber', tech: 'Memory Foam Insole' },
    Basketball: { weight: '14.8 oz', drop: '12mm', stack: '28mm', upper: 'Synthetic Leather', sole: 'Herringbone Traction', tech: 'Zoom Air + Carbon Plate' },
    Training: { weight: '12.1 oz', drop: '4mm', stack: '20mm', upper: 'Reinforced Mesh', sole: 'Multi-Surface Rubber', tech: 'Stable Platform Core' },
  };
  return base[category] || base.Running;
}

function getTech(category: string) {
  const base: Record<string, { icon: typeof Zap; title: string; desc: string }[]> = {
    Running: [
      { icon: Zap, title: 'Energy-Return Foam', desc: 'Our proprietary midsole compound returns 85% of impact energy on every stride, propelling you forward with less effort.' },
      { icon: Feather, title: 'Ultralight Construction', desc: 'At just 8.2 oz, the Velocity Pro is 30% lighter than competitors. You will forget you are wearing them.' },
      { icon: Activity, title: 'Breathable Engineered Mesh', desc: '3D-knit upper adapts to your foot shape while 360-degree ventilation keeps you cool on long runs.' },
    ],
    Lifestyle: [
      { icon: Layers, title: 'Premium Canvas Upper', desc: 'Woven from 12oz organic cotton canvas that develops character with every wear. Built to age beautifully.' },
      { icon: Feather, title: 'Memory Foam Comfort', desc: 'Molded memory foam insole adapts to your foot over 72 hours of wear for a truly custom fit.' },
      { icon: Shield, title: 'Vulcanized Rubber Sole', desc: 'Heat-fused construction creates a bond stronger than adhesive. These soles will not separate.' },
    ],
    Basketball: [
      { icon: Shield, title: 'Dynamic Ankle Support', desc: 'Asymmetric collar design locks in your ankle without restricting movement. Cut harder, jump higher.' },
      { icon: Zap, title: 'Zoom Air + Carbon Plate', desc: 'Full-length zoom cushioning paired with a carbon fiber plate for explosive energy return on every jump.' },
      { icon: Activity, title: 'Herringbone Traction', desc: 'Multi-directional herringbone pattern grips the court at every angle. Zero slip, total control.' },
    ],
    Training: [
      { icon: Layers, title: 'Stable Platform Core', desc: '4mm drop and wide base create a grounded platform perfect for heavy squats and deadlifts.' },
      { icon: Shield, title: 'Reinforced Toe Guard', desc: 'TPU toe cap protects against rope climbs, burpees, and box jumps. Built for the hardest workouts.' },
      { icon: Activity, title: 'Multi-Surface Grip', desc: 'Hexagonal outsole pattern adapts from gym floor to outdoor concrete without losing traction.' },
    ],
  };
  return base[category] || base.Running;
}

function getMaterials(category: string) {
  const base: Record<string, { material: string; location: string; property: string }[]> = {
    Running: [
      { material: 'Engineered Mesh', location: 'Upper', property: 'Breathable · Flexible' },
      { material: 'PEBA Foam', location: 'Midsole', property: 'Energy Return · Lightweight' },
      { material: 'Carbon Rubber', location: 'Outsole', property: 'Durable · Grip' },
      { material: 'Recycled Polyester', location: 'Laces', property: 'Sustainable · Strong' },
    ],
    Lifestyle: [
      { material: 'Organic Cotton Canvas', location: 'Upper', property: 'Breathable · Durable' },
      { material: 'Memory Foam', location: 'Insole', property: 'Custom Fit · Comfort' },
      { material: 'Vulcanized Rubber', location: 'Outsole', property: 'Flexible · Long-Lasting' },
      { material: 'Organic Cotton', location: 'Laces', property: 'Natural · Soft' },
    ],
    Basketball: [
      { material: 'Synthetic Leather', location: 'Upper', property: 'Durable · Supportive' },
      { material: 'Zoom Air Unit', location: 'Midsole', property: 'Impact Protection · Responsive' },
      { material: 'Carbon Fiber Plate', location: 'Midfoot', property: 'Stability · Energy Transfer' },
      { material: 'Herringbone Rubber', location: 'Outsole', property: 'Multi-Directional Grip' },
    ],
    Training: [
      { material: 'Reinforced Mesh', location: 'Upper', property: 'Breathable · Protective' },
      { material: 'Compression EVA', location: 'Midsole', property: 'Stable · Dense' },
      { material: 'TPU Toe Cap', location: 'Toe', property: 'Abrasion Resistant' },
      { material: 'Multi-Surface Rubber', location: 'Outsole', property: 'Versatile Grip' },
    ],
  };
  return base[category] || base.Running;
}

function getMetrics(category: string) {
  const base: Record<string, { label: string; value: number }[]> = {
    Running: [
      { label: 'Comfort', value: 96 },
      { label: 'Energy Return', value: 92 },
      { label: 'Breathability', value: 95 },
      { label: 'Durability', value: 88 },
    ],
    Lifestyle: [
      { label: 'Comfort', value: 94 },
      { label: 'Style', value: 97 },
      { label: 'Versatility', value: 93 },
      { label: 'Durability', value: 90 },
    ],
    Basketball: [
      { label: 'Ankle Support', value: 95 },
      { label: 'Impact Protection', value: 93 },
      { label: 'Court Traction', value: 96 },
      { label: 'Durability', value: 89 },
    ],
    Training: [
      { label: 'Stability', value: 96 },
      { label: 'Grip', value: 94 },
      { label: 'Durability', value: 95 },
      { label: 'Flexibility', value: 87 },
    ],
  };
  return base[category] || base.Running;
}

const productFaqs = [
  { q: 'Are these shoes true to size?', a: 'Yes! STRYDE shoes fit true to standard US sizing. If you are between sizes, we recommend sizing up for running models.' },
  { q: 'Can I run in these every day?', a: 'Absolutely. Our shoes are engineered for daily training. The midsole foam retains 90% of its cushioning after 500km of use.' },
  { q: 'How do I clean my STRYDE shoes?', a: 'Hand wash with mild soap and warm water. Air dry only — never machine wash or tumble dry. Remove insoles before cleaning.' },
  { q: 'What is the warranty?', a: 'Every pair comes with a 2-year warranty covering manufacturing defects. Normal wear and tear is not covered.' },
];

function MetricBar({ label, value, delay }: { label: string; value: number; delay: number }) {
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <span className="text-white/60 text-xs font-medium uppercase tracking-wide">{label}</span>
        <span className="text-lime-400 text-xs font-bold">{value}%</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
          className="h-full bg-gradient-to-r from-lime-400/60 to-lime-400 rounded-full"
        />
      </div>
    </div>
  );
}

function ProductFAQ({ faq, index }: { faq: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <ScrollReveal delay={index * 0.05}>
      <div className="border-b border-white/10">
        <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left group">
          <span className="font-display text-white font-bold text-sm md:text-base pr-4 group-hover:text-lime-400 transition-colors">{faq.q}</span>
          <ChevronDown size={18} className={`text-white/40 shrink-0 transition-transform duration-300 ${open ? 'rotate-180 text-lime-400' : ''}`} />
        </button>
        <motion.div initial={false} animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
          <p className="text-white/50 text-sm leading-relaxed pb-5 pr-8">{faq.a}</p>
        </motion.div>
      </div>
    </ScrollReveal>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'specs' | 'materials' | 'reviews'>('specs');

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch('/api/products').then((r) => r.json()),
      fetch(`/api/reviews?product_id=${id}`).then((r) => r.json()),
    ]).then(([allProducts, revData]) => {
      const found = allProducts.find((p: Product) => p.id === parseInt(id || '0', 10));
      if (found) {
        setProduct(found);
        setRelated(allProducts.filter((p: Product) => p.category === found.category && p.id !== found.id).slice(0, 4));
      }
      setReviews(revData);
      setLoading(false);
      window.scrollTo(0, 0);
    }).catch(() => setLoading(false));
  }, [id]);

  const handleAdd = () => {
    if (!product) return;
    if (!selectedSize) { setError('Please select a size'); return; }
    if (!selectedColor) { setError('Please select a color'); return; }
    for (let i = 0; i < qty; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: selectedSize,
        color: selectedColor,
      });
    }
    setAdded(true);
    setError('');
    setTimeout(() => setAdded(false), 1200);
  };

  if (loading) {
    return (
      <div className="bg-[#0A0A0B] text-white min-h-screen pt-32 px-5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="aspect-square bg-[#131316] rounded-2xl shimmer" />
          <div className="space-y-4">
            <div className="h-4 bg-[#131316] rounded shimmer w-1/4" />
            <div className="h-10 bg-[#131316] rounded shimmer w-3/4" />
            <div className="h-6 bg-[#131316] rounded shimmer w-1/3" />
            <div className="h-32 bg-[#131316] rounded shimmer" />
            <div className="h-12 bg-[#131316] rounded shimmer" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-[#0A0A0B] text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/50 text-lg mb-4">Product not found</p>
          <Link to="/shop" className="text-lime-400 font-bold uppercase text-sm">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const specs = getSpecs(product.category);
  const tech = getTech(product.category);
  const materials = getMaterials(product.category);
  const metrics = getMetrics(product.category);
  const stockLeft = Math.max(3, (product.id * 7) % 12);
  const avgRating = reviews.length > 0 ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : '4.9';

  return (
    <div className="bg-[#0A0A0B] text-white min-h-screen pt-20 md:pt-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-4">
        <nav className="flex items-center gap-2 text-xs text-white/40 overflow-hidden">
          <Link to="/" className="hover:text-lime-400 transition-colors shrink-0">Home</Link>
          <ChevronRight size={12} className="shrink-0" />
          <Link to="/shop" className="hover:text-lime-400 transition-colors shrink-0">Shop</Link>
          <ChevronRight size={12} className="shrink-0" />
          <Link to={`/shop?category=${product.category}`} className="hover:text-lime-400 transition-colors shrink-0">{product.category}</Link>
          <ChevronRight size={12} className="shrink-0" />
          <span className="text-white/60 truncate">{product.name}</span>
        </nav>
      </div>

      {/* ==================== MAIN PRODUCT ==================== */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 pb-12">
        <div className="grid md:grid-cols-2 gap-6 md:gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="md:sticky md:top-28 md:self-start"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-[#1a1a1e] via-[#131316] to-[#0A0A0B]">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" decoding="async" />
              <span className="absolute top-4 left-4 px-3 py-1.5 bg-lime-400 text-black text-xs font-bold uppercase tracking-wider rounded-full">
                {product.category}
              </span>
            </div>
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <p className="text-lime-400 text-xs uppercase tracking-widest font-bold mb-2">{product.brand}</p>
            <h1 className="font-display text-3xl md:text-5xl font-black italic tracking-tight text-white mb-3">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} className="fill-lime-400 text-lime-400" />
                ))}
              </div>
              <span className="text-white/50 text-sm">{avgRating} · {reviews.length} reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-1">
              <p className="font-display text-4xl font-black text-white">${product.price}</p>
              <p className="text-white/30 text-lg line-through">${(product.price * 1.3).toFixed(0)}</p>
              <span className="px-2 py-0.5 bg-lime-400/15 text-lime-400 text-xs font-bold rounded">SAVE 23%</span>
            </div>
            <p className="text-white/40 text-xs mb-5">Free shipping · Tax included</p>

            {/* Stock urgency */}
            <div className="flex items-center gap-3 mb-5 px-4 py-3 bg-orange-500/10 border border-orange-500/20 rounded-xl">
              <Zap size={16} className="text-orange-400 shrink-0" />
              <div className="flex-1">
                <p className="text-orange-400 text-xs font-semibold">Only {stockLeft} left in stock — order soon</p>
                <div className="mt-1.5 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-400 rounded-full" style={{ width: `${Math.min(90, stockLeft * 8)}%` }} />
                </div>
              </div>
            </div>

            <p className="text-white/60 text-sm leading-relaxed mb-6">{product.description}</p>

            {/* Performance Metrics */}
            <div className="mb-6 p-5 bg-[#131316] rounded-2xl border border-white/[0.06]">
              <h4 className="font-display text-white font-bold text-sm uppercase tracking-wider mb-4">Performance Ratings</h4>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {metrics.map((m, i) => (
                  <MetricBar key={m.label} label={m.label} value={m.value} delay={i * 0.1} />
                ))}
              </div>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {tech.map((t) => (
                <div key={t.title} className="flex flex-col items-center text-center gap-1.5 p-3 bg-white/5 rounded-xl">
                  <t.icon size={20} className="text-lime-400" />
                  <span className="text-white/60 text-[10px] font-medium leading-tight">{t.title}</span>
                </div>
              ))}
            </div>

            {/* Size */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2.5">
                <p className="text-white text-sm font-semibold">Select Size {selectedSize && <span className="text-lime-400 ml-1">· US {selectedSize}</span>}</p>
                <span className="flex items-center gap-1 text-white/40 text-xs"><Ruler size={12} /> Size guide</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => { setSelectedSize(s); setError(''); }}
                    className={`min-w-[48px] h-12 px-3 rounded-xl text-sm font-medium transition-all ${
                      selectedSize === s ? 'bg-lime-400 text-black scale-105' : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="mb-5">
              <p className="text-white text-sm font-semibold mb-2.5">Select Color</p>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => { setSelectedColor(c); setError(''); }}
                    className={`w-11 h-11 rounded-full border-2 transition-all flex items-center justify-center ${
                      selectedColor === c ? 'border-lime-400 scale-110' : 'border-white/20 hover:border-white/40'
                    }`}
                    style={{ backgroundColor: c }}
                  >
                    {selectedColor === c && <Check size={16} className="text-white drop-shadow-lg" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-5">
              <p className="text-white text-sm font-semibold mb-2.5">Quantity</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-11 h-11 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="text-white text-lg font-semibold w-10 text-center">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-11 h-11 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

            {/* Add to cart */}
            <button
              onClick={handleAdd}
              className={`w-full py-4 font-bold uppercase text-sm tracking-wide transition-all rounded-xl mb-3 ${
                added ? 'bg-green-500 text-white' : 'bg-lime-400 text-black hover:bg-lime-300 hover:shadow-xl hover:shadow-lime-400/20'
              }`}
            >
              {added ? '✓ Added to Cart' : `Add to Cart · $${(product.price * qty).toFixed(2)}`}
            </button>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
              {[
                { icon: Truck, label: 'Free Shipping' },
                { icon: RotateCcw, label: '30-Day Returns' },
                { icon: Shield, label: '2-Yr Warranty' },
              ].map((b) => (
                <div key={b.label} className="flex flex-col items-center text-center gap-1.5">
                  <b.icon size={18} className="text-lime-400" />
                  <span className="text-white/50 text-[10px] uppercase tracking-wider leading-tight">{b.label}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 mt-4 text-white/30 text-xs">
              <Lock size={12} />
              <span>Secure 256-bit SSL encrypted checkout</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== TECHNOLOGY SECTION ==================== */}
      <section className="py-16 md:py-24 px-5 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-lime-400 text-xs font-bold uppercase tracking-widest mb-2">Engineered Performance</p>
            <h2 className="font-display text-4xl md:text-6xl font-black italic tracking-tighter">The Technology</h2>
            <p className="text-white/50 text-sm mt-3 max-w-lg mx-auto">Every component is obsessively engineered. Here is what makes the {product.name} different.</p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {tech.map((t, i) => (
              <ScrollReveal key={t.title} delay={i * 0.1}>
                <div className="bg-[#131316] border border-white/[0.06] rounded-2xl p-6 md:p-8 h-full hover:border-lime-400/20 transition-colors">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-lime-400/10 border border-lime-400/30 mb-4">
                    <t.icon size={22} className="text-lime-400" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white mb-2">{t.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{t.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TABS: SPECS / MATERIALS / REVIEWS ==================== */}
      <section className="py-12 md:py-20 px-5 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-1 mb-8 border-b border-white/10 overflow-x-auto no-scrollbar">
            {[
              { key: 'specs', label: 'Specifications' },
              { key: 'materials', label: 'Materials' },
              { key: 'reviews', label: `Reviews (${reviews.length})` },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`px-4 md:px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-all relative whitespace-nowrap shrink-0 ${
                  activeTab === tab.key ? 'text-lime-400' : 'text-white/40 hover:text-white/70'
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-lime-400" />
                )}
              </button>
            ))}
          </div>

          {activeTab === 'specs' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-1">
                {[
                  { label: 'Weight', value: specs.weight },
                  { label: 'Heel Drop', value: specs.drop },
                  { label: 'Stack Height', value: specs.stack },
                  { label: 'Upper Material', value: specs.upper },
                  { label: 'Outsole', value: specs.sole },
                  { label: 'Core Technology', value: specs.tech },
                  { label: 'Category', value: product.category },
                  { label: 'Brand', value: product.brand },
                ].map((s) => (
                  <div key={s.label} className="flex justify-between py-3 border-b border-white/5">
                    <span className="text-white/40 text-sm">{s.label}</span>
                    <span className="text-white/80 text-sm font-medium">{s.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'materials' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="space-y-2">
                {materials.map((m) => (
                  <div key={m.material} className="flex items-center gap-4 py-4 border-b border-white/5">
                    <div className="w-10 h-10 rounded-full bg-lime-400/10 border border-lime-400/30 flex items-center justify-center shrink-0">
                      <Layers size={18} className="text-lime-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-sm">{m.material}</h4>
                      <p className="text-white/40 text-xs">{m.location}</p>
                    </div>
                    <span className="text-lime-400 text-xs font-medium uppercase tracking-wide">{m.property}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'reviews' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 p-6 bg-[#131316] rounded-2xl">
                <div className="text-center shrink-0">
                  <p className="font-display text-5xl font-black text-lime-400">{avgRating}</p>
                  <div className="flex gap-0.5 justify-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="fill-lime-400 text-lime-400" />
                    ))}
                  </div>
                  <p className="text-white/40 text-xs mt-1">{reviews.length} reviews</p>
                </div>
                <div className="flex-1 w-full space-y-1.5">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = reviews.filter((r) => r.rating === star).length;
                    const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                    return (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-white/40 text-xs w-3">{star}</span>
                        <Star size={10} className="fill-lime-400 text-lime-400" />
                        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-lime-400 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-white/40 text-xs w-6 text-right">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4">
                {reviews.map((r) => (
                  <div key={r.id} className="p-5 bg-[#131316] rounded-2xl border border-white/[0.06]">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-full bg-lime-400/20 flex items-center justify-center text-lime-400 font-bold text-sm">
                          {r.author[0]}
                        </div>
                        <div>
                          <span className="text-white text-sm font-semibold">{r.author}</span>
                          {r.verified && (
                            <span className="text-lime-400 text-[10px] font-bold uppercase tracking-wider ml-2">✓ Verified</span>
                          )}
                          <p className="text-white/40 text-xs">{r.role}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(r.rating)].map((_, j) => (
                          <Star key={j} size={12} className="fill-lime-400 text-lime-400" />
                        ))}
                      </div>
                    </div>
                    <h4 className="text-white font-semibold text-sm mb-1">{r.title}</h4>
                    <p className="text-white/50 text-sm leading-relaxed">{r.body}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section className="py-12 md:py-20 px-5 border-t border-white/10">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal className="mb-8">
            <p className="text-lime-400 text-xs font-bold uppercase tracking-widest mb-2">Product FAQ</p>
            <h2 className="font-display text-3xl md:text-5xl font-black italic tracking-tighter">Questions & Answers</h2>
          </ScrollReveal>
          <div>
            {productFaqs.map((faq, i) => (
              <ProductFAQ key={i} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== RELATED PRODUCTS ==================== */}
      {related.length > 0 && (
        <section className="py-12 md:py-20 px-5 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="mb-8">
              <h2 className="font-display text-3xl md:text-5xl font-black italic tracking-tighter">You May Also Like</h2>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="group cursor-pointer bg-[#131316] rounded-2xl overflow-hidden border border-white/[0.06] hover:border-lime-400/30 transition-all"
                  onClick={() => navigate(`/product/${p.id}`)}
                >
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#1a1a1e] via-[#131316] to-[#0A0A0B]">
                    <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-white font-bold text-sm truncate mb-1">{p.name}</h3>
                    <span className="font-display text-lime-400 font-black text-base">${p.price}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
