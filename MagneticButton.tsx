import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, CheckCircle2, Lock, Truck, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';

const FREE_SHIPPING_THRESHOLD = 75;

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const [checkoutMode, setCheckoutMode] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', address: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const shippingProgress = Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShip = Math.max(0, FREE_SHIPPING_THRESHOLD - total);
  const shippingCost = total >= FREE_SHIPPING_THRESHOLD ? 0 : 7.99;
  const grandTotal = total + shippingCost;

  const handleCheckout = async () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items,
          total: grandTotal,
          customer_name: form.name,
          customer_email: form.email,
          shipping_address: form.address,
        }),
      });
      if (!res.ok) throw new Error('Order failed');
      setOrderPlaced(true);
      clearCart();
    } catch (err) {
      setErrors({ form: 'Failed to place order. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const closeDrawer = () => {
    setIsOpen(false);
    setTimeout(() => {
      setCheckoutMode(false);
      setOrderPlaced(false);
      setForm({ name: '', email: '', address: '' });
      setErrors({});
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0A0A0B] z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10 shrink-0">
              <h3 className="font-display text-lg font-bold text-white uppercase tracking-wide">
                {orderPlaced ? 'Order Confirmed' : checkoutMode ? 'Checkout' : `Cart (${items.length})`}
              </h3>
              <button onClick={closeDrawer} className="text-white/60 hover:text-white transition-colors p-1" aria-label="Close cart">
                <X size={22} />
              </button>
            </div>

            {/* Free shipping progress */}
            {!orderPlaced && items.length > 0 && !checkoutMode && (
              <div className="px-5 py-3 bg-white/5 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <Truck size={14} className="text-lime-400 shrink-0" />
                  <p className="text-white/70 text-xs">
                    {remainingForFreeShip > 0 ? (
                      <>Add <span className="text-lime-400 font-bold">${remainingForFreeShip.toFixed(2)}</span> for free shipping</>
                    ) : (
                      <span className="text-lime-400 font-bold">✓ You unlocked free shipping!</span>
                    )}
                  </p>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ width: `${shippingProgress}%` }}
                    transition={{ type: 'spring', damping: 20 }}
                    className="h-full bg-lime-400 rounded-full"
                  />
                </div>
              </div>
            )}

            {orderPlaced ? (
              <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.1 }}
                >
                  <CheckCircle2 size={64} className="text-lime-400 mb-4" />
                </motion.div>
                <h4 className="font-display text-2xl font-bold text-white mb-2">Thank you!</h4>
                <p className="text-white/60 text-sm mb-1">Your order has been placed.</p>
                <p className="text-white/40 text-xs mb-6">A confirmation email is on the way to {form.email}.</p>
                <button
                  onClick={closeDrawer}
                  className="px-6 py-3 bg-lime-400 text-black font-bold uppercase text-sm tracking-wide hover:bg-lime-300 transition-colors rounded-xl"
                >
                  Continue Shopping
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
                <ShoppingBag size={48} className="text-white/20 mb-4" />
                <p className="text-white/50 text-sm mb-1">Your cart is empty</p>
                <p className="text-white/30 text-xs mb-6">Find your perfect pair</p>
                <button
                  onClick={closeDrawer}
                  className="px-6 py-3 bg-lime-400 text-black font-bold uppercase text-sm tracking-wide hover:bg-lime-300 transition-colors rounded-xl"
                >
                  Browse Products
                </button>
              </div>
            ) : checkoutMode ? (
              <div className="flex-1 overflow-y-auto p-5">
                {/* Order summary at top of checkout */}
                <div className="mb-5 p-4 bg-white/5 rounded-xl">
                  <h4 className="text-xs uppercase tracking-wider text-white/50 mb-3 font-bold">Order Summary</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {items.map((item) => (
                      <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center gap-2 text-xs">
                        <img src={item.image} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-white truncate font-medium">{item.name}</p>
                          <p className="text-white/40">Size {item.size} · Qty {item.quantity}</p>
                        </div>
                        <span className="text-lime-400 font-bold shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Express checkout buttons */}
                <div className="mb-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-white/30 text-xs uppercase tracking-wider">Express</span>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="py-2.5 bg-white text-black text-xs font-bold rounded-xl hover:bg-white/90 transition-colors flex items-center justify-center gap-1.5">
                       Apple Pay
                    </button>
                    <button className="py-2.5 bg-white text-black text-xs font-bold rounded-xl hover:bg-white/90 transition-colors flex items-center justify-center gap-1.5">
                      <span className="text-blue-500">G</span> Pay
                    </button>
                  </div>
                  <div className="flex items-center gap-3 mt-3 mb-2">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-white/30 text-xs uppercase tracking-wider">Or pay with card</span>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-white/50 mb-1.5 block">Full Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-lime-400 focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-white/50 mb-1.5 block">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-lime-400 focus:outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-white/50 mb-1.5 block">Shipping Address</label>
                    <textarea
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-lime-400 focus:outline-none resize-none transition-colors"
                      placeholder="123 Main St, City, State 12345"
                    />
                    {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
                  </div>
                  {errors.form && <p className="text-red-400 text-sm">{errors.form}</p>}

                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between text-white/60 text-sm mb-1">
                      <span>Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white/60 text-sm mb-1">
                      <span>Shipping</span>
                      <span className={shippingCost === 0 ? 'text-lime-400' : ''}>
                        {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-white font-bold text-lg mt-2">
                      <span>Total</span>
                      <span>${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setCheckoutMode(false)}
                    className="flex-1 py-3.5 border border-white/20 text-white font-medium uppercase text-sm tracking-wide hover:bg-white/5 transition-colors rounded-xl"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="flex-1 py-3.5 bg-lime-400 text-black font-bold uppercase text-sm tracking-wide hover:bg-lime-300 transition-colors disabled:opacity-50 rounded-xl"
                  >
                    {loading ? 'Placing...' : 'Place Order'}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 mt-4 text-white/30 text-xs">
                  <Lock size={12} />
                  <span>Secure 256-bit SSL encrypted checkout</span>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-5 space-y-3">
                  {items.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.size}-${item.color}`}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-3 bg-white/5 rounded-xl p-3"
                    >
                      <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover bg-white/5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white text-sm font-semibold truncate">{item.name}</h4>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="w-3 h-3 rounded-full border border-white/20 shrink-0" style={{ backgroundColor: item.color }} />
                          <p className="text-white/40 text-xs">Size {item.size}</p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.color, -1)}
                              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-white text-sm w-6 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.color, 1)}
                              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="text-lime-400 font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.size, item.color)}
                        className="text-white/30 hover:text-red-400 transition-colors self-start p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </motion.div>
                  ))}
                </div>

                <div className="border-t border-white/10 p-5 space-y-3 shrink-0">
                  <div className="flex justify-between text-white">
                    <span className="text-sm uppercase tracking-wide text-white/60">Total</span>
                    <span className="font-display text-xl font-bold">${total.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => setCheckoutMode(true)}
                    className="w-full py-3.5 bg-lime-400 text-black font-bold uppercase text-sm tracking-wide hover:bg-lime-300 transition-colors rounded-xl"
                  >
                    Checkout
                  </button>
                  <div className="flex items-center justify-center gap-2 text-white/30 text-xs">
                    <Shield size={12} />
                    <span>Secure checkout · 30-day returns</span>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
