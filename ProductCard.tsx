import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import ProductCard, { Product } from '../components/ProductCard';
import ProductModal from '../components/ProductModal';

const categories = ['All', 'Running', 'Lifestyle', 'Basketball', 'Training'];

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<Product | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeCategory = searchParams.get('category') || 'All';
  const productIdParam = searchParams.get('product');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeCategory !== 'All') params.set('category', activeCategory);
      if (search) params.set('search', search);
      const res = await fetch(`/api/products?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();

      let sorted = [...data];
      if (sortBy === 'price-low') sorted.sort((a, b) => a.price - b.price);
      if (sortBy === 'price-high') sorted.sort((a, b) => b.price - a.price);
      if (sortBy === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));

      setProducts(sorted);
      setError('');

      // If navigated with ?product=ID, open the quick-view modal
      if (productIdParam) {
        const found = sorted.find((p) => p.id === parseInt(productIdParam, 10));
        if (found) setSelected(found);
      }
    } catch (err) {
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [activeCategory, search, sortBy]);

  useEffect(() => {
    if (productIdParam) {
      const t = setTimeout(() => {
        searchParams.delete('product');
        setSearchParams(searchParams, { replace: true });
      }, 500);
      return () => clearTimeout(t);
    }
  }, [productIdParam]);

  const setCategory = (cat: string) => {
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  // Product card click navigates to full product page
  const handleSelect = (p: Product) => {
    navigate(`/product/${p.id}`);
  };

  return (
    <div className="bg-[#0A0A0B] text-white min-h-screen pt-20 md:pt-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-6 md:py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 md:mb-8">
          <p className="text-lime-400 text-xs font-bold uppercase tracking-widest mb-2">Collection</p>
          <div className="flex items-end justify-between gap-4">
            <h1 className="font-display text-4xl md:text-7xl font-black italic tracking-tighter">
              {activeCategory === 'All' ? 'ALL SHOES' : activeCategory.toUpperCase()}
            </h1>
            {!loading && (
              <span className="text-white/40 text-xs md:text-sm font-medium shrink-0 mb-2">
                {products.length} {products.length === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 md:flex-wrap md:overflow-visible md:pb-0 flex-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2.5 rounded-full text-sm font-medium uppercase tracking-wide transition-all whitespace-nowrap shrink-0 ${
                  activeCategory === cat
                    ? 'bg-lime-400 text-black'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex gap-3 shrink-0">
            <div className="relative flex-1 md:flex-none">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-lime-400 focus:outline-none w-full md:w-48 transition-colors"
              />
            </div>
            <div className="relative">
              <SlidersHorizontal size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white/5 border border-white/10 rounded-full pl-9 pr-8 py-2.5 text-sm text-white focus:border-lime-400 focus:outline-none cursor-pointer transition-colors"
              >
                <option value="featured" className="bg-zinc-900">Featured</option>
                <option value="price-low" className="bg-zinc-900">Price: Low to High</option>
                <option value="price-high" className="bg-zinc-900">Price: High to Low</option>
                <option value="name" className="bg-zinc-900">Name A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i}>
                <div className="aspect-square bg-[#131316] rounded-2xl shimmer mb-3" />
                <div className="h-3 bg-[#131316] rounded shimmer mb-2 w-2/3" />
                <div className="h-4 bg-[#131316] rounded shimmer w-1/3" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-400 mb-4">{error}</p>
            <button onClick={fetchProducts} className="px-6 py-2.5 bg-lime-400 text-black font-bold uppercase text-sm rounded-full hover:bg-lime-300 transition-colors">
              Retry
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/50 text-lg mb-2">No products found.</p>
            <p className="text-white/30 text-sm">Try a different category or search term.</p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} onSelect={handleSelect} />
            ))}
          </motion.div>
        )}
      </div>

      {/* Quick view modal (for ?product=ID navigation from old links) */}
      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
