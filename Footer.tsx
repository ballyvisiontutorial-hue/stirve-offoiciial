import { motion } from 'framer-motion';
import { Plus, Star, Heart } from 'lucide-react';
import { useState } from 'react';

export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  description: string;
  sizes: string[];
  colors: string[];
}

interface Props {
  product: Product;
  index: number;
  onSelect: (p: Product) => void;
}

const categoryBadges: Record<string, string> = {
  Running: 'Best Seller',
  Basketball: 'Pro Grade',
  Lifestyle: 'Trending',
  Training: 'New',
};

export default function ProductCard({ product, index, onSelect }: Props) {
  const [liked, setLiked] = useState(false);
  const badge = categoryBadges[product.category] || 'New';
  const originalPrice = (product.price * 1.23).toFixed(0);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      onClick={() => onSelect(product)}
      className="group cursor-pointer bg-[#131316] rounded-2xl overflow-hidden border border-white/[0.06] hover:border-lime-400/30 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#1a1a1e] via-[#131316] to-[#0A0A0B]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badge */}
        <span className="absolute top-3 left-3 px-2.5 py-1 bg-lime-400 text-black text-[10px] font-bold uppercase tracking-wider rounded-md">
          {badge}
        </span>

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-black/60 transition-colors"
          aria-label="Add to wishlist"
        >
          <Heart
            size={15}
            className={liked ? 'fill-red-500 text-red-500' : 'text-white/70'}
          />
        </button>

        {/* Quick add — pure CSS opacity, no framer conflict */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="w-full py-2.5 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 hover:bg-lime-400 transition-colors"
          >
            <Plus size={14} /> Quick View
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <p className="text-white/40 text-[10px] uppercase tracking-widest font-medium">{product.brand}</p>
          <div className="flex items-center gap-1">
            <Star size={11} className="fill-lime-400 text-lime-400" />
            <span className="text-white/40 text-[10px] font-medium">4.9</span>
          </div>
        </div>
        <h3 className="font-display text-white font-bold text-sm md:text-base truncate mb-2">{product.name}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-lime-400 font-black text-lg">${product.price}</span>
            <span className="text-white/25 text-xs line-through">${originalPrice}</span>
          </div>
          <div className="flex gap-1">
            {product.colors.slice(0, 3).map((c, i) => (
              <span
                key={i}
                className="w-3 h-3 rounded-full border border-white/20 ring-1 ring-black/20"
                style={{ backgroundColor: c }}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-white/30 text-[9px] font-medium ml-0.5">+{product.colors.length - 3}</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
