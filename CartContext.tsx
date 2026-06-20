import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Truck, Shield, RotateCcw, Star, Ruler, Feather, Layers, Activity, Zap } from 'lucide-react';
import { Product } from './ProductCard';
import { useCart } from '../context/CartContext';

interface Props {
  product: Product | null;
  onClose: () => void;
}

function getSpecs(category: string) {
  const base = {
    Running: { weight: '8.2 oz', drop: '8mm', stack: '32mm', upper: 'Engineered Mesh', sole: 'Carbon Rubber' },
    Lifestyle: { weight: '11.5 oz', drop: '10mm', stack: '24mm', upper: 'Premium Canvas', sole: 'Vulcanized Rubber' },
    Basketball: { weight: '14.8 oz', drop: '12mm', stack: '28mm', upper: 'Synthetic Leather', sole: 'Herringbone Traction' },
    Training: { weight: '12.1 oz', drop: '4mm', stack: '20mm', upper: 'Reinforced Mesh', sole: 'Multi-Surface Rubber' },
  };
  return base[category as keyof typeof base] || base.Running;
}

function getFeatures(category: string) {
  const base = {
    Running: [
      { icon: Zap, label: 'Energy Return Foam' },
      { icon: Feather, label: 'Ultralight Design' },
      { icon: Activity, label: 'Breathable Mesh' },
    ],
    Lifestyle: [
      { icon: Layers, label: 'Premium Materials' },
      { icon: Feather, label: 'All-Day Comfort' },
      { icon: Shield, label: 'Durable Build' },
    ],
    Basketball: [
      { icon: Shield, label: 'Ankle Support' },
      { icon: Zap, label: 'Impact Cushioning' },
      { icon: Activity, label: 'Court Traction' },
    ],
    Training: [
      { icon: Layers, label: 'Stable Platform' },
      { icon: Shield, label: 'Reinforced Toe' },
      { icon: Activity, label: 'Multi-Surface Grip' },
    ],
  };
  return base[category as keyof typeof base] || base.Running;
}

const reviews = [
  { name: 'Marcus T.', rating: 5, text: 'Best shoes I have ever owned. The comfort is unreal and they look incredible.', verified: true },
  { name: 'Sarah K.', rating: 5, text: 'Perfect fit, premium quality. Worth every penny. Will buy again.', verified: true },
  { name: 'James L.', rating: 5, text: 'These feel like walking on clouds. The design turns heads everywhere.', verified: true },
];

export default function ProductModal({ product, onClose }: Props) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState('');

  if (!product) return null;

  const specs = getSpecs(product.category);
  const features = getFeatures(product.category);
  const stockLeft = Math.max(3, (product.id * 7) % 12);

  const handleAdd = () => {
    if (!selectedSize) {
      setError('Please select a size');
      return;
    }
    if (!selectedColor) {
      setError('Please select a color');
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
    });
    setAdded(true);
    setError('');
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 800);
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[80] flex items-center justify-center p-0 md:p-4"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0A0A0B] md:rounded-3xl rounded-none w-full max-w-5xl max-h-[100vh] md:max-h-[92vh] overflow-y-auto border border-white/[0.06] shadow-2xl"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/15 transition-colors"
              >
                <X size={18} />
              </button>

              <div className="grid md:grid-cols-2 gap-0">
                {/* Image side */}
                <div className="relative aspect-square md:aspect-auto bg-gradient-to-br from-[#1a1a1e] via-[#131316] to-[#0A0A0B] overflow-hidden md:sticky md:top-0 md:h-full">
                  <motion.img
                    initial={{ scale: 1.15 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                  <span className="absolute top-4 left-4 px-3 py-1.5 bg-lime-400 text-black text-xs font-bold uppercase tracking-wider rounded-full">
                    {product.category}
                  </span>
                </div>

                {/* Details side */}
                <div className="p-6 md:p-8 flex flex-col">
                  <p className="text-lime-400 text-xs uppercase tracking-widest font-bold mb-2">{product.brand}</p>
                  <h2 className="font-display text-2xl md:text-3xl font-black italic tracking-tight text-white mb-2">{product.name}</h2>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="fill-lime-400 text-lime-400" />
                      ))}
                    </div>
                    <span className="text-white/40 text-xs">4.9 · 328 reviews</span>
                  </div>

                  <div className="flex items-baseline gap-3 mb-1">
                    <p className="font-display text-3xl font-black text-white">${product.price}</p>
                    <p className="text-white/30 text-sm line-through">${(product.price * 1.3).toFixed(0)}</p>
                    <span className="px-2 py-0.5 bg-lime-400/15 text-lime-400 text-xs font-bold rounded">SAVE 23%</span>
                  </div>
                  <p className="text-white/40 text-xs mb-5">Free shipping · Tax included</p>

                  {/* Stock urgency */}
                  <div className="flex items-center gap-2 mb-5 px-3 py-2 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                    <div className="flex-1">
                      <p className="text-orange-400 text-xs font-semibold">⚡ Only {stockLeft} left in stock</p>
                      <div className="mt-1.5 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-400 rounded-full" style={{ width: `${Math.min(90, stockLeft * 8)}%` }} />
                      </div>
                    </div>
                  </div>

                  <p className="text-white/60 text-sm leading-relaxed mb-6">{product.description}</p>

                  {/* Feature highlights */}
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {features.map((f) => (
                      <div key={f.label} className="flex flex-col items-center text-center gap-1.5 p-2 bg-white/5 rounded-lg">
                        <f.icon size={18} className="text-lime-400" />
                        <span className="text-white/60 text-[10px] font-medium leading-tight">{f.label}</span>
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
                          className={`min-w-[44px] h-11 px-3 rounded-lg text-sm font-medium transition-all ${
                            selectedSize === s
                              ? 'bg-lime-400 text-black scale-105'
                              : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color */}
                  <div className="mb-6">
                    <p className="text-white text-sm font-semibold mb-2.5">Select Color</p>
                    <div className="flex flex-wrap gap-2.5">
                      {product.colors.map((c) => (
                        <button
                          key={c}
                          onClick={() => { setSelectedColor(c); setError(''); }}
                          className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                            selectedColor === c ? 'border-lime-400 scale-110' : 'border-white/20 hover:border-white/40'
                          }`}
                          style={{ backgroundColor: c }}
                        >
                          {selectedColor === c && <Check size={15} className="text-white drop-shadow-lg" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mb-3"
                    >
                      {error}
                    </motion.p>
                  )}

                  <button
                    onClick={handleAdd}
                    disabled={added}
                    className={`w-full py-4 font-bold uppercase text-sm tracking-wide transition-all rounded-xl ${
                      added ? 'bg-green-500 text-white' : 'bg-lime-400 text-black hover:bg-lime-300 hover:shadow-lg hover:shadow-lime-400/20'
                    }`}
                  >
                    {added ? '✓ Added to Cart' : `Add to Cart · $${product.price}`}
                  </button>

                  {/* Trust badges */}
                  <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-white/10">
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

                  {/* Specifications */}
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <h4 className="font-display text-white font-bold text-sm uppercase tracking-wider mb-3">Specifications</h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      {[
                        { label: 'Weight', value: specs.weight },
                        { label: 'Heel Drop', value: specs.drop },
                        { label: 'Stack Height', value: specs.stack },
                        { label: 'Upper Material', value: specs.upper },
                        { label: 'Outsole', value: specs.sole },
                        { label: 'Category', value: product.category },
                      ].map((s) => (
                        <div key={s.label} className="flex justify-between py-1.5 border-b border-white/5">
                          <span className="text-white/40 text-xs">{s.label}</span>
                          <span className="text-white/80 text-xs font-medium">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reviews */}
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <h4 className="font-display text-white font-bold text-sm uppercase tracking-wider mb-3">Customer Reviews</h4>
                    <div className="space-y-3">
                      {reviews.map((r, i) => (
                        <div key={i} className="p-3 bg-white/5 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="text-white text-xs font-semibold">{r.name}</span>
                              {r.verified && (
                                <span className="text-lime-400 text-[9px] font-bold uppercase tracking-wider">✓ Verified</span>
                              )}
                            </div>
                            <div className="flex gap-0.5">
                              {[...Array(r.rating)].map((_, j) => (
                                <Star key={j} size={10} className="fill-lime-400 text-lime-400" />
                              ))}
                            </div>
                          </div>
                          <p className="text-white/50 text-xs leading-relaxed">{r.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
