import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube, Mail, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      return;
    }
    setSubscribed(true);
    setError('');
    setEmail('');
  };

  return (
    <footer className="bg-black text-white border-t border-white/10">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-display text-3xl md:text-4xl font-black italic tracking-tighter mb-2">
                JOIN THE <span className="text-lime-400">STRYDE</span> SQUAD
              </h3>
              <p className="text-white/50 text-sm">Get 10% off your first order plus early access to new drops.</p>
            </div>
            <div>
              {subscribed ? (
                <div className="flex items-center gap-3 px-5 py-4 bg-lime-400/10 border border-lime-400/30 rounded-xl">
                  <Check size={20} className="text-lime-400" />
                  <p className="text-white text-sm font-medium">You are in! Check your inbox for 10% off.</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(''); }}
                      placeholder="Enter your email"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white text-sm placeholder-white/30 focus:border-lime-400 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-lime-400 text-black font-bold uppercase text-sm tracking-wide hover:bg-lime-300 transition-colors rounded-xl whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </form>
              )}
              {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-10">
          <div className="col-span-2">
            <h3 className="font-display text-3xl font-black italic tracking-tighter mb-3">
              STRYDE<span className="w-2 h-2 rounded-full bg-lime-400 inline-block ml-1 mb-1" />
            </h3>
            <p className="text-white/50 text-sm leading-relaxed mb-4 max-w-xs">
              Premium footwear engineered for performance and style. Every step matters.
            </p>
            <div className="flex gap-3 mb-4">
              {['Free Shipping $75+', '30-Day Returns', '2-Year Warranty'].map((t) => (
                <span key={t} className="text-[10px] text-white/30 uppercase tracking-wider">{t}</span>
              ))}
            </div>
            <div className="flex gap-3">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-lime-400 hover:text-black flex items-center justify-center transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Shop</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/shop" className="text-white/70 hover:text-lime-400 transition-colors">All Products</Link></li>
              <li><Link to="/shop?category=Running" className="text-white/70 hover:text-lime-400 transition-colors">Running</Link></li>
              <li><Link to="/shop?category=Lifestyle" className="text-white/70 hover:text-lime-400 transition-colors">Lifestyle</Link></li>
              <li><Link to="/shop?category=Basketball" className="text-white/70 hover:text-lime-400 transition-colors">Basketball</Link></li>
              <li><Link to="/shop?category=Training" className="text-white/70 hover:text-lime-400 transition-colors">Training</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Support</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="text-white/70 hover:text-lime-400 transition-colors">Size Guide</a></li>
              <li><a href="#" className="text-white/70 hover:text-lime-400 transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-white/70 hover:text-lime-400 transition-colors">Returns</a></li>
              <li><a href="#" className="text-white/70 hover:text-lime-400 transition-colors">Warranty</a></li>
              <li><a href="#" className="text-white/70 hover:text-lime-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="text-white/70 hover:text-lime-400 transition-colors">About Us</Link></li>
              <li><Link to="/technology" className="text-white/70 hover:text-lime-400 transition-colors">Technology</Link></li>
              <li><Link to="/collections" className="text-white/70 hover:text-lime-400 transition-colors">Collections</Link></li>
              <li><Link to="/contact" className="text-white/70 hover:text-lime-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs">© 2025 STRYDE. All rights reserved.</p>
          {/* Payment trust icons */}
          <div className="flex items-center gap-3">
            <span className="text-white/30 text-[10px] uppercase tracking-wider mr-1">Secure Checkout</span>
            {['VISA', 'MC', 'AMEX', 'PYPL'].map((p) => (
              <div key={p} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-white/40 text-[9px] font-bold tracking-wider">
                {p}
              </div>
            ))}
          </div>
          <div className="flex gap-6 text-xs text-white/40">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
