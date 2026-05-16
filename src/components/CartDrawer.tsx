import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
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
            className="fixed inset-0 bg-black/70 backdrop-blur-[3px] z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 1 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-brand-primary/95 backdrop-blur-3xl z-[101] shadow-[-18px_0_46px_rgba(0,0,0,0.35)] flex flex-col border-l border-brand-border/60"
          >
            <div className="px-6 md:px-8 py-6 border-b border-brand-border/60 flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-brand-accent-glow/90 shadow-[0_8px_22px_rgba(197,160,89,0.2)] flex items-center justify-center">
                   <ShoppingBag size={18} className="text-black" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-display font-black uppercase tracking-[-0.02em] text-brand-secondary">Your Cart</h2>
                  <p className="text-[10px] text-brand-muted uppercase tracking-[0.22em] font-bold">Selected Items</p>
                </div>
              </div>
              <button onClick={() => setIsCartOpen(false)} aria-label="Close" className="touch-target rounded-full border border-brand-border/60 hover:bg-brand-secondary/5 transition-all duration-300">
                <X size={20} className="text-brand-muted hover:text-brand-secondary" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 md:px-7 py-6 space-y-5 hide-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 rounded-full border border-dashed border-brand-border/70 flex items-center justify-center mb-8 bg-brand-secondary/5">
                    <ShoppingBag size={36} className="text-brand-muted/20" />
                  </div>
                  <h3 className="text-xl font-display font-black uppercase mb-3 tracking-tight text-brand-muted">Cart is Empty</h3>
                  <p className="text-xs text-brand-muted/60 mb-8 uppercase tracking-[0.12em]">Awaiting selection.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="px-10 py-4 bg-brand-secondary text-brand-primary font-display font-black uppercase tracking-[0.16em] text-[10px] hover:bg-brand-accent-glow hover:text-black transition-all rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={`${item.id}-${item.size}-${item.color}`}
                    className="flex gap-4 p-3.5 rounded-[1.6rem] bg-brand-secondary/[0.03] border border-brand-border/60 shadow-[0_8px_22px_rgba(0,0,0,0.15)] group hover:shadow-[0_14px_28px_rgba(0,0,0,0.2)] transition-all duration-300"
                  >
                    <div className="w-24 md:w-28 aspect-[4/5] bg-brand-matte rounded-[1.2rem] overflow-hidden flex-shrink-0 border border-brand-border/50">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                    </div>
                    <div className="flex-1 flex flex-col min-w-0 py-1">
                      <div className="flex justify-between items-start gap-2 mb-3">
                        <div>
                          <h4 className="font-display font-black uppercase text-sm md:text-base leading-tight tracking-[-0.01em] mb-2 text-brand-secondary truncate">{item.name}</h4>
                          <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] font-bold text-brand-muted">
                            <span className="px-2.5 py-1 rounded-full bg-brand-secondary/5 border border-brand-border/50">Size {item.size}</span>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-secondary/5 border border-brand-border/50">
                              <span className="w-2 h-2 rounded-full border border-brand-border/70" style={{ backgroundColor: item.color }} />
                              Tone
                            </span>
                          </div>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id, item.size, item.color)}
                          aria-label={`Remove ${item.name} from cart`}
                          className="touch-target rounded-full text-brand-muted/35 hover:text-red-500 hover:bg-brand-secondary/5 transition-all"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center bg-brand-primary/60 rounded-2xl p-1 border border-brand-border/60 shadow-inner">
                          <button 
                            onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                            aria-label={`Decrease quantity for ${item.name}`}
                            className="touch-target w-9 h-9 rounded-xl flex items-center justify-center text-brand-muted hover:text-brand-secondary hover:bg-brand-secondary/5 transition-colors"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="w-9 text-center text-sm font-mono font-bold tracking-[0.1em] text-brand-secondary">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                            aria-label={`Increase quantity for ${item.name}`}
                            className="touch-target w-9 h-9 rounded-xl flex items-center justify-center text-brand-muted hover:text-brand-accent-glow hover:bg-brand-secondary/5 transition-colors"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                        <span className="font-display font-black text-brand-secondary text-lg tracking-[-0.01em]">
                          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="px-5 md:px-7 py-6 border-t border-brand-border/60 bg-brand-secondary/[0.02] backdrop-blur-xl">
                <div className="rounded-[1.7rem] border border-brand-border/60 bg-brand-primary/60 px-5 py-5 shadow-[0_10px_28px_rgba(0,0,0,0.18)] mb-5">
                  <div className="flex items-end justify-between gap-4 mb-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.24em] font-black text-brand-muted block mb-1">Estimated Total</span>
                      <span className="text-[10px] text-brand-muted/70 uppercase tracking-[0.12em] leading-none">Shipping calculated at checkout</span>
                    </div>
                    <span className="text-3xl md:text-4xl font-display font-black text-brand-accent-glow tracking-[-0.02em]">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalPrice)}
                    </span>
                  </div>
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-border to-transparent" />
                  <p className="mt-3 text-[10px] uppercase tracking-[0.16em] text-brand-muted/80">Secure checkout. Easy returns.</p>
                </div>

                <Link 
                  to="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full min-h-[56px] bg-brand-secondary text-brand-primary font-display font-black uppercase tracking-[0.12em] text-[11px] flex items-center justify-center gap-3 group transition-all duration-500 hover:bg-brand-accent-glow hover:text-black rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.24)]"
                >
                  Checkout
                  <div className="w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center group-hover:translate-x-1 transition-transform duration-500">
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
