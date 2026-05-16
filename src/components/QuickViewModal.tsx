import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Star, Share2, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface QuickViewModalProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-5xl bg-brand-primary border border-brand-border rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row pointer-events-auto"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 z-[110] w-12 h-12 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-brand-accent-glow hover:text-black transition-all duration-300"
            >
              <X size={20} />
            </button>

            {/* Left: Image Gallery (Simplified) */}
            <div className="lg:w-1/2 aspect-square lg:aspect-auto bg-brand-charcoal relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            </div>

            {/* Right: Info */}
            <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center">
              <div className="mb-8">
                <div className="flex items-center gap-2 text-brand-accent-glow text-[10px] font-black uppercase tracking-[0.4em] mb-4">
                  <Star size={10} fill="currentColor" />
                  <span>Elite Collection</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter mb-4 text-brand-secondary">
                  {product.name}
                </h2>
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-black text-brand-accent-glow">
                    ৳{(product.price * 110).toFixed(0)}
                  </span>
                  <span className="text-lg text-brand-secondary/40 line-through font-bold">
                    ৳{(product.price * 1.2 * 110).toFixed(0)}
                  </span>
                </div>
              </div>

              <p className="text-brand-secondary/60 text-sm leading-relaxed mb-10 font-medium uppercase tracking-widest">
                Experience unparalleled craftsmanship with Veloura's signature pieces. Engineered for style, built for the generation of now.
              </p>

              <div className="space-y-6 mb-12">
                <div className="flex items-center gap-4 text-brand-secondary/80">
                  <Truck size={18} className="text-brand-accent-glow" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Express Delivery: 48-72 Hours</span>
                </div>
                <div className="flex items-center gap-4 text-brand-secondary/80">
                  <ShieldCheck size={18} className="text-brand-accent-glow" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Secure Cash on Delivery across BD</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => {
                    addToCart(product);
                    onClose();
                  }}
                  className="flex-1 bg-brand-secondary text-brand-primary h-16 rounded-2xl font-black uppercase tracking-[0.3em] text-xs hover:bg-brand-accent-glow hover:text-black transition-all duration-500 shadow-2xl flex items-center justify-center gap-4 group"
                >
                  <ShoppingBag size={18} className="group-hover:scale-110 transition-transform" />
                  Add to Cart
                </button>
                <button className="w-16 h-16 border border-brand-border rounded-2xl flex items-center justify-center text-brand-secondary hover:bg-brand-charcoal transition-all">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
