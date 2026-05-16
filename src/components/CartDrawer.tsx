import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

export const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 1 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-brand-primary/95 backdrop-blur-3xl z-[101] shadow-[-20px_0_40px_rgba(0,0,0,0.5)] flex flex-col border-l border-brand-border"
          >
            <div className="p-8 border-b border-brand-border flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-accent-glow flex items-center justify-center">
                   <ShoppingBag size={20} className="text-black" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-black uppercase tracking-tighter text-brand-secondary">Your Cart</h2>
                  <p className="text-[10px] text-brand-muted uppercase tracking-[0.2em] font-bold">Selected Items</p>
                </div>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-3 hover:bg-brand-secondary/5 rounded-full transition-all duration-300">
                <X size={24} className="text-brand-muted hover:text-brand-secondary" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 hide-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 rounded-full border border-dashed border-brand-border flex items-center justify-center mb-8 bg-brand-secondary/5">
                    <ShoppingBag size={36} className="text-brand-muted/20" />
                  </div>
                  <h3 className="text-xl font-display font-black uppercase mb-3 tracking-wider text-brand-muted">Cart is Empty</h3>
                  <p className="text-xs text-brand-muted/60 mb-8 uppercase tracking-wider">Awaiting selection.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="px-10 py-4 bg-brand-secondary text-brand-primary font-display font-black uppercase tracking-wider text-[10px] hover:bg-brand-accent-glow hover:text-black transition-all rounded-xl shadow-xl"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-6 group relative">
                    <div className="w-28 h-36 bg-brand-matte rounded-2xl overflow-hidden flex-shrink-0 border border-brand-border group-hover:border-brand-accent-glow/20 transition-colors duration-500">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    <div className="flex-1 flex flex-col py-2">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-display font-black uppercase text-base leading-tight tracking-tight mb-1 text-brand-secondary">{item.name}</h4>
                          <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-brand-muted">
                            Size: {item.size} // {item.color}
                          </p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id, item.size, item.color)}
                          className="text-brand-muted/20 hover:text-red-500 transition-all p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center bg-brand-secondary/5 rounded-xl p-1 border border-brand-border">
                          <button 
                            onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-brand-muted hover:text-brand-secondary"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-10 text-center text-xs font-mono font-bold tracking-widest text-brand-secondary">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-brand-muted hover:text-brand-accent-glow"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="font-display font-black text-brand-secondary text-lg tracking-tight">
                          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-8 border-t border-brand-border bg-brand-secondary/[0.02]">
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-muted block mb-1">Estimated Total</span>
                    <span className="text-[9px] text-brand-muted/60 italic uppercase tracking-widest leading-none">Incl. VAT & Handling</span>
                  </div>
                  <span className="text-4xl font-display font-black text-brand-accent-glow text-glow">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalPrice)}
                  </span>
                </div>
                <Link 
                  to="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full h-16 bg-brand-secondary text-brand-primary font-display font-black uppercase tracking-[0.1em] text-[10px] flex items-center justify-center gap-4 group transition-all duration-500 hover:bg-brand-accent-glow hover:text-black rounded-2xl shadow-2xl"
                >
                  Checkout Now
                  <div className="w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center group-hover:translate-x-2 transition-transform duration-500">
                    <ArrowRight size={14} />
                  </div>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
