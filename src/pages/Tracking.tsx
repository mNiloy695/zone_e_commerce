import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../components/CartDrawer';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Package, Truck, CheckCircle2, Clock, User, MapPin, Phone, AlertCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export const Tracking = () => {
  const location = useLocation();
  const [orderId, setOrderId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [foundOrder, setFoundOrder] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    if (id) {
      setOrderId(id);
      performSearch(id);
    }
  }, [location]);

  const performSearch = (id: string) => {
    setIsSearching(true);
    setError('');
    
    // Simulate API delay
    setTimeout(() => {
      const orders = JSON.parse(localStorage.getItem('veloura_orders') || '[]');
      const order = orders.find((o: any) => o.id.toLowerCase() === id.toLowerCase());
      
      if (order) {
        setFoundOrder(order);
        setShowResult(true);
      } else {
        setError('Order ID not found. Please check and try again.');
        setShowResult(false);
      }
      setIsSearching(false);
    }, 1200);
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId) return;
    performSearch(orderId);
  };

  return (
    <main className="bg-brand-primary min-h-screen text-brand-secondary selection:bg-brand-accent-glow selection:text-black pb-16 md:pb-0">
      <Navbar />
      <CartDrawer />
      
      <div className="pt-40 pb-20 px-4 md:px-8 container mx-auto flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-brand-accent-glow text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Logistics</span>
          <h1 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter mb-6">Track Your <span className="text-vibe-gradient italic">Drop.</span></h1>
          <p className="text-brand-secondary/40 text-xs md:text-sm max-w-lg mx-auto leading-relaxed uppercase tracking-widest font-medium">
            Enter your order ID below to see detailed status and shipment info.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-3xl bg-brand-charcoal border border-brand-border rounded-[2.5rem] p-6 md:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
        >
          <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-accent-glow/40" size={18} />
              <input 
                type="text" 
                placeholder="EX: VZ-9982-X"
                autoComplete="off"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full bg-brand-primary border border-brand-border rounded-2xl py-5 pl-14 pr-6 text-base font-medium tracking-wider focus:outline-none focus:border-brand-accent-glow/50 transition-colors uppercase"
              />
            </div>
            <button 
              type="submit"
              disabled={isSearching}
              className="bg-brand-accent-glow text-black font-black uppercase tracking-[0.2em] px-10 py-5 rounded-2xl hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed min-w-[180px] flex items-center justify-center gap-2 text-[11px]"
            >
              {isSearching ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  Searching
                </>
              ) : 'Track Now'}
            </button>
          </form>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3 text-red-500 text-[10px] uppercase font-bold tracking-widest ml-1"
              >
                <AlertCircle size={14} />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {showResult && foundOrder && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-12 space-y-12"
              >
                {/* Header Info */}
                <div className="pt-12 border-t border-brand-border flex flex-col md:flex-row justify-between gap-8">
                  <div className="flex flex-col gap-6">
                    <div>
                      <span className="text-[9px] text-brand-accent-glow font-black uppercase tracking-widest block mb-1">Order Status</span>
                      <h3 className="text-2xl font-display font-black uppercase text-glow-subtle">{foundOrder.status}</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-brand-secondary/5 flex items-center justify-center border border-brand-border text-brand-accent-glow">
                           <User size={14} />
                         </div>
                         <div>
                            <span className="text-[8px] text-brand-secondary/40 font-black uppercase tracking-widest block">Customer</span>
                            <p className="text-xs font-bold uppercase">{foundOrder.customer.name}</p>
                            <p className="text-[9px] text-brand-secondary/40 font-medium">{foundOrder.customer.email}</p>
                         </div>
                       </div>
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-brand-secondary/5 flex items-center justify-center border border-brand-border text-brand-accent-glow">
                           <MapPin size={14} />
                         </div>
                         <div>
                            <span className="text-[8px] text-brand-secondary/40 font-black uppercase tracking-widest block">Ship To</span>
                            <p className="text-xs font-bold uppercase">{foundOrder.customer.city}</p>
                            <p className="text-[9px] text-brand-secondary/40 font-medium">{foundOrder.customer.phone}</p>
                         </div>
                       </div>
                    </div>
                  </div>

                  <div className="md:text-right border-l md:border-l-0 md:border-r md:pr-12 md:mr-12 border-brand-border pl-6 md:pl-0">
                    <span className="text-[9px] text-brand-secondary/40 font-black uppercase tracking-widest block mb-1">Items Summary</span>
                    <div className="flex flex-col gap-2">
                       {foundOrder.items.map((item: any, idx: number) => (
                         <span key={idx} className="text-[10px] font-bold uppercase tracking-wider">{item.name} x{item.quantity}</span>
                       ))}
                    </div>
                    <p className="text-xl font-display font-black text-brand-accent-glow mt-4">${foundOrder.total.toFixed(2)}</p>
                  </div>
                </div>

                {/* Tracking Progress */}
                <div className="p-8 bg-brand-primary/50 border border-brand-border rounded-3xl space-y-10 relative overflow-hidden">
                  <div className="absolute left-14 top-12 bottom-12 w-[1px] bg-brand-border" />
                  <div className="absolute left-14 top-12 h-2/3 w-[1px] bg-brand-accent-glow shadow-[0_0_15px_rgba(197,160,89,0.5)]" />

                  {[
                    { title: 'Delivered', time: 'Awaiting', icon: CheckCircle2, completed: false },
                    { title: 'Out for Delivery', time: 'Estimated: Today', icon: Truck, completed: true, active: true },
                    { title: 'In Transit', time: 'May 16, 2026', icon: Package, completed: true },
                    { title: 'Processing at Studio', time: new Date(foundOrder.date).toLocaleDateString(), icon: Clock, completed: true },
                  ].map((step, i) => (
                    <div key={i} className={`flex items-start gap-8 relative z-10 transition-all duration-700 ${step.active ? 'opacity-100' : step.completed ? 'opacity-60' : 'opacity-20'}`}>
                      <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center bg-brand-charcoal transition-all duration-500 ${step.active ? 'border-brand-accent-glow bg-brand-accent-glow text-black scale-110 shadow-[0_0_20px_rgba(197,160,89,0.3)]' : step.completed ? 'border-brand-accent-glow/40 text-brand-accent-glow' : 'border-brand-border text-brand-border'}`}>
                        <step.icon size={18} />
                      </div>
                      <div className="pt-2">
                        <h4 className="text-xs font-black uppercase tracking-widest mb-1">{step.title}</h4>
                        <p className="text-[9px] font-medium text-brand-secondary/40 uppercase tracking-widest">{step.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {!showResult && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-4xl"
          >
             {[
               { title: 'Express COD', desc: 'Secure cash on delivery all over BD.', icon: ShieldCheck },
               { title: 'Real-time Sync', desc: 'Precise location data for every drop.', icon: Truck },
               { title: '24/7 Support', desc: 'Elite assistance for any shipment issue.', icon: Phone }
             ].map((feature, i) => (
               <div key={i} className="flex flex-col items-center">
                 <div className="w-12 h-12 rounded-2xl bg-brand-charcoal flex items-center justify-center text-brand-secondary/40 mb-6 border border-brand-border">
                   {<feature.icon size={20} />}
                 </div>
                 <h4 className="text-[10px] font-black uppercase tracking-widest mb-2">{feature.title}</h4>
                 <p className="text-[9px] text-brand-secondary/40 uppercase leading-relaxed tracking-widest font-medium">{feature.desc}</p>
               </div>
             ))}
          </motion.div>
        )}
      </div>

      <Footer />
    </main>
  );
};

// Placeholder icons since I didn't import them all
const ShieldCheck = ({ size }: { size: number }) => <CheckCircle2 size={size} />;
