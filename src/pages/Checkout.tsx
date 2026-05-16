import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../components/CartDrawer';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ChevronRight, MapPin, Phone, Mail, User, CreditCard, ShieldCheck, Copy, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(placedOrderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    address: ''
  });

  if (cart.length === 0 && !orderComplete) {
    return (
      <main className="bg-brand-primary min-h-screen text-brand-secondary pb-16 md:pb-0">
        <Navbar />
        <div className="pt-60 pb-40 flex flex-col items-center justify-center px-8 text-center">
          <h1 className="text-4xl font-display font-black uppercase mb-6">Your cart is empty</h1>
          <Link to="/collections" className="bg-brand-secondary text-brand-primary px-10 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-brand-accent-glow transition-all">
            Start Shopping
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      const orderId = `VZ-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
      
      // Save order to local storage for tracking simulation
      const orderData = {
        id: orderId,
        date: new Date().toISOString(),
        customer: formData,
        items: cart,
        total: totalPrice,
        status: 'Confirmed'
      };
      
      const existingOrders = JSON.parse(localStorage.getItem('veloura_orders') || '[]');
      localStorage.setItem('veloura_orders', JSON.stringify([...existingOrders, orderData]));

      setPlacedOrderId(orderId);
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
    }, 2500);
  };

  return (
    <main className="bg-brand-primary min-h-screen text-brand-secondary selection:bg-brand-accent-glow selection:text-black pb-16 md:pb-0">
      <Navbar />
      <CartDrawer />

      <div className="pt-32 pb-40 px-4 md:px-8 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {!orderComplete ? (
            <motion.div 
              key="checkout-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12"
            >
              {/* Left Side: Form */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-10 text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
                  <Link to="/shop" className="hover:text-brand-accent-glow transition-colors">Cart</Link>
                  <ChevronRight size={10} />
                  <span className="text-brand-accent-glow opacity-100">Checkout Information</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter mb-12">
                  Shipping <span className="text-vibe-gradient italic">Details.</span>
                </h1>

                <form onSubmit={handlePlaceOrder} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-black tracking-widest text-brand-secondary/40 ml-1">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-accent-glow/40" size={16} />
                        <input 
                          required
                          type="text" 
                          placeholder="Niloy Ahmed"
                          autoComplete="name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-brand-charcoal border border-brand-border rounded-2xl py-5 pl-14 pr-6 text-base font-medium focus:outline-none focus:border-brand-accent-glow/50 transition-colors"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-black tracking-widest text-brand-secondary/40 ml-1">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-accent-glow/40" size={16} />
                        <input 
                          required
                          type="tel" 
                          placeholder="+880 1XXX-XXXXXX"
                          autoComplete="tel"
                          inputMode="numeric"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full bg-brand-charcoal border border-brand-border rounded-2xl py-5 pl-14 pr-6 text-base font-medium focus:outline-none focus:border-brand-accent-glow/50 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-black tracking-widest text-brand-secondary/40 ml-1">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-accent-glow/40" size={16} />
                        <input 
                          required
                          type="email" 
                          placeholder="veloura@example.com"
                          autoComplete="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-brand-charcoal border border-brand-border rounded-2xl py-5 pl-14 pr-6 text-base font-medium focus:outline-none focus:border-brand-accent-glow/50 transition-colors"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-black tracking-widest text-brand-secondary/40 ml-1">City</label>
                      <div className="relative">
                        <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-accent-glow/40" size={16} />
                        <input 
                          required
                          type="text" 
                          placeholder="Dhaka, Bangladesh"
                          autoComplete="address-level2"
                          value={formData.city}
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                          className="w-full bg-brand-charcoal border border-brand-border rounded-2xl py-5 pl-14 pr-6 text-base font-medium focus:outline-none focus:border-brand-accent-glow/50 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black tracking-widest text-brand-secondary/40 ml-1">Detailed Address</label>
                    <textarea 
                      required
                      placeholder="House No, Road Name, Area..."
                      rows={3}
                      autoComplete="street-address"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full bg-brand-charcoal border border-brand-border rounded-2xl py-5 px-6 text-base font-medium focus:outline-none focus:border-brand-accent-glow/50 transition-colors resize-none"
                    />
                  </div>

                  <div className="p-8 bg-brand-charcoal border border-brand-border rounded-[2rem] space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-accent-glow/10 flex items-center justify-center text-brand-accent-glow">
                        <CreditCard size={18} />
                      </div>
                      <div>
                        <h4 className="text-sm font-black uppercase tracking-widest">Payment Method</h4>
                        <p className="text-[10px] text-brand-secondary/40 font-medium uppercase tracking-widest">Cash on Delivery (COD)</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-brand-accent-glow/60">
                      <ShieldCheck size={14} />
                      <span className="text-[9px] uppercase font-black tracking-[0.2em]">Secure Checkout • Encrypted Transmission</span>
                    </div>
                  </div>

                  <div className="fixed bottom-[72px] left-0 right-0 p-4 bg-brand-primary border-t border-brand-border md:static md:border-0 md:p-0 z-40">
                    <button 
                      type="submit"
                      disabled={isProcessing}
                      className="w-full min-h-[44px] py-4 bg-brand-secondary text-brand-primary rounded-2xl font-black uppercase tracking-[0.3em] text-xs hover:bg-brand-accent-glow transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin" />
                          Processing Order
                        </>
                      ) : 'Confirm and Place Order'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Side: Order Summary */}
              <div className="lg:col-span-5">
                <div className="sticky top-32 p-8 md:p-12 bg-brand-charcoal border border-brand-border rounded-[3rem]">
                  <h2 className="text-xl font-display font-black uppercase tracking-widest mb-10 border-b border-brand-border pb-6">Your Order</h2>
                  
                  <div className="max-h-[40vh] overflow-y-auto space-y-6 pr-4 mb-10 scrollbar-hide">
                    {cart.map((item) => (
                      <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4">
                        <div className="w-20 h-24 bg-brand-matte rounded-xl overflow-hidden flex-shrink-0">
                          <img src={item.image} className="w-full h-full object-cover" alt={item.name} loading="lazy" decoding="async" />
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                          <h4 className="text-xs font-black uppercase tracking-widest mb-1 line-clamp-1">{item.name}</h4>
                          <div className="flex gap-3 text-[9px] uppercase font-bold text-brand-secondary/40 tracking-widest">
                            <span>Size: {item.size}</span>
                            <span>Qty: {item.quantity}</span>
                          </div>
                          <p className="text-xs font-black mt-2 text-brand-accent-glow">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4 border-t border-brand-border pt-10">
                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest opacity-40">
                      <span>Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest opacity-40">
                      <span>Shipping</span>
                      <span className="text-brand-accent-glow">Calculated at next step</span>
                    </div>
                    <div className="flex justify-between text-xl font-display font-black uppercase tracking-widest pt-4 border-t border-brand-border/30">
                      <span>Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="order-success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto py-20 flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full bg-brand-accent-glow/10 flex items-center justify-center text-brand-accent-glow mb-10">
                <CheckCircle2 size={48} />
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-black uppercase tracking-tighter mb-6">Order <span className="text-vibe-gradient italic">Placed.</span></h1>
              <p className="text-brand-secondary/60 text-sm max-w-md mx-auto leading-relaxed uppercase tracking-widest font-medium mb-12">
                Thank you for choosing Veloura Zone. Your order is being processed by our studio.
              </p>

              <div className="w-full bg-brand-charcoal border border-brand-border rounded-[2.5rem] p-10 mb-12">
                <span className="text-[10px] text-brand-accent-glow font-black uppercase tracking-[0.4em] block mb-2">Order ID</span>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-2xl font-mono font-black tracking-widest uppercase">{placedOrderId}</span>
                  <button
                    type="button"
                    onClick={handleCopyOrderId}
                    aria-label="Copy order ID"
                    title="Copy order ID"
                    className="flex-shrink-0 w-9 h-9 rounded-xl border border-brand-border flex items-center justify-center text-brand-secondary/60 hover:text-brand-accent-glow hover:border-brand-accent-glow/50 transition-all duration-300"
                  >
                    {copied ? <Check size={15} className="text-brand-accent-glow" /> : <Copy size={15} />}
                  </button>
                </div>
                <div className="mt-8 pt-8 border-t border-brand-border flex flex-col md:flex-row justify-center gap-6 md:gap-12">
                   <div className="text-center">
                     <span className="text-[9px] text-brand-secondary/40 font-black uppercase tracking-widest block mb-1">Items</span>
                     <span className="text-sm font-bold">Confirmed</span>
                   </div>
                   <div className="text-center">
                     <span className="text-[9px] text-brand-secondary/40 font-black uppercase tracking-widest block mb-1">Notification</span>
                     <span className="text-sm font-bold">Sent to Email</span>
                   </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
                <Link to={`/tracking?id=${placedOrderId}`} className="w-full sm:w-auto sm:flex-1 sm:max-w-xs bg-brand-accent-glow text-black py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-white transition-all text-center">
                  Track Your Order
                </Link>
                <Link to="/" className="w-full sm:w-auto sm:flex-1 sm:max-w-xs border border-brand-border py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-brand-secondary hover:text-brand-primary transition-all text-center">
                  Back to Home
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </main>
  );
};
