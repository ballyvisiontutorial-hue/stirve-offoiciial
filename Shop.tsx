import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare, Check, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    }
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'hello@stryde.com', sub: 'We reply within 24 hours' },
    { icon: Phone, label: 'Phone', value: '+1 (800) 787-9333', sub: 'Mon–Fri, 9am–6pm EST' },
    { icon: MapPin, label: 'HQ', value: 'San Francisco, CA', sub: '1500 Market Street' },
    { icon: MessageSquare, label: 'Live Chat', value: 'Available 24/7', sub: 'Click the chat icon' },
  ];

  return (
    <div className="bg-[#0A0A0B] text-white min-h-screen pt-20 md:pt-24 overflow-x-hidden">
      {/* Hero */}
      <section className="relative py-16 md:py-24 px-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="text-lime-400 text-xs font-bold uppercase tracking-widest mb-3">Get in Touch</p>
          <h1 className="font-display text-5xl md:text-8xl font-black italic tracking-tighter leading-[0.85]">
            LET'S<br /><span className="text-lime-400">TALK</span>
          </h1>
          <p className="text-white/50 text-sm md:text-base mt-5 max-w-md mx-auto">Questions about sizing, orders, or just want to say hi? We are here for you.</p>
        </motion.div>
      </section>

      {/* Contact info cards */}
      <section className="py-8 md:py-12 px-5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {contactInfo.map((info, i) => (
            <ScrollReveal key={info.label} delay={i * 0.08}>
              <div className="bg-[#131316] border border-white/[0.06] rounded-2xl p-5 md:p-6 text-center h-full hover:border-lime-400/20 transition-colors">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-lime-400/10 border border-lime-400/30 mb-3">
                  <info.icon size={20} className="text-lime-400" />
                </div>
                <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">{info.label}</p>
                <p className="text-white font-semibold text-sm mb-0.5">{info.value}</p>
                <p className="text-white/30 text-xs">{info.sub}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="py-12 md:py-20 px-5">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            {sent ? (
              <div className="text-center py-16">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.1 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-lime-400/10 border border-lime-400/30 mb-5"
                >
                  <Check size={32} className="text-lime-400" />
                </motion.div>
                <h3 className="font-display text-3xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-white/50 text-sm mb-6">We will get back to you within 24 hours.</p>
                <button
                  onClick={() => setSent(false)}
                  className="px-6 py-3 bg-lime-400 text-black font-bold uppercase text-sm tracking-wide hover:bg-lime-300 transition-colors rounded-xl"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-white/50 mb-1.5 block">Full Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({}); }}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:border-lime-400 focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-white/50 mb-1.5 block">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({}); }}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:border-lime-400 focus:outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-white/50 mb-1.5 block">Subject (optional)</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:border-lime-400 focus:outline-none transition-colors"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-white/50 mb-1.5 block">Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => { setForm({ ...form, message: e.target.value }); setErrors({}); }}
                    rows={5}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:border-lime-400 focus:outline-none resize-none transition-colors"
                    placeholder="Tell us more..."
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-lime-400 text-black font-bold uppercase text-sm tracking-wide hover:bg-lime-300 transition-colors rounded-xl"
                >
                  Send Message
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="py-8 px-5 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-white/40">
          <Link to="/" className="hover:text-lime-400">Home</Link>
          <ChevronRight size={12} />
          <span className="text-white/60">Contact</span>
        </div>
      </section>
    </div>
  );
}
