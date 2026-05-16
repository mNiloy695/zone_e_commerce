import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, Star, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { QuickViewModal } from './QuickViewModal';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    rating: number;
  };
  index: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const { addToCart } = useCart();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  return (
    <>
      <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group relative"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#111] rounded-[2rem] border border-brand-border/30 shadow-2xl group-hover:border-brand-accent-glow/20 transition-all duration-500">
        <Link to={`/product/${product.id}`} className="block h-full cursor-pointer relative">
          <img
            src={product.image.replace('w=1200', 'w=600')}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-700"
            referrerPolicy="no-referrer"
            loading={index < 4 ? 'eager' : 'lazy'}
            fetchPriority={index < 2 ? 'high' : 'auto'}
            decoding="async"
          />
          {/* Subtle glow behind the product */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-accent-glow/20 blur-[100px] rounded-full" />
          
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 z-10" />
        </Link>

        {/* Quick Actions (Hover Only) */}
        <div className="absolute inset-x-0 bottom-24 md:bottom-28 px-4 hidden md:flex flex-col gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 z-20">
          <div className="flex gap-3">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsQuickViewOpen(true)}
              aria-label={`Quick view ${product.name}`}
              className="flex-1 bg-white text-black py-4 rounded-xl font-black uppercase tracking-widest text-[9px] shadow-xl hover:bg-brand-accent-glow transition-colors flex items-center justify-center gap-2"
            >
              <Eye size={14} />
              Quick View
            </motion.button>
            <motion.button 
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              onClick={() =>
                addToCart({
                  ...product,
                  size: 'M',
                  color: '#050505',
                  quantity: 1,
                } as any)
              }
              aria-label={`Add ${product.name} to cart`}
              className="min-h-[44px] min-w-[44px] w-14 bg-brand-accent-glow text-black items-center justify-center flex rounded-xl shadow-[0_10px_20px_rgba(197,160,89,0.3)] hover:bg-white transition-colors"
            >
              <Plus size={20} />
            </motion.button>
          </div>
          <Link 
            to={`/product/${product.id}`}
            className="w-full border border-white/20 backdrop-blur-md text-white py-4 rounded-xl font-black uppercase tracking-widest text-[9px] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"
          >
            View Details
          </Link>
        </div>

        {/* Labels / Badges */}
        <div className="absolute top-6 left-6">
          <div className="bg-white text-black px-4 py-1.5 rounded-lg text-[9px] font-black tracking-widest uppercase shadow-2xl">
            {product.rating >= 4.9 ? 'Bestseller' : (index % 2 === 0 ? 'New' : 'Drop 04')}
          </div>
        </div>

        {/* Bottom Info Section (Always Visible) */}
        <div className="absolute bottom-0 left-0 right-0 pt-20 pb-6 px-5 md:px-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
          <div className="flex justify-between items-end gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm md:text-xl font-display font-black uppercase tracking-tight text-white mb-2 truncate group-hover:text-brand-accent-glow transition-colors">
                {product.name}
              </h3>
              <div className="flex items-center gap-2 text-[10px] text-white/60 font-bold">
                 <div className="flex items-center text-brand-accent-glow">
                    <Star size={10} fill="currentColor" />
                    <span className="ml-1 text-white">{product.rating}</span>
                 </div>
                 <span>({Math.floor(Math.random() * 200 + 50)})</span>
              </div>
            </div>
            <div className="flex flex-col items-end justify-end pb-1">
              <span className="text-base md:text-xl font-semibold md:font-black text-brand-accent-glow">
                 ৳{(product.price * 110).toFixed(0)}
              </span>
            </div>
          </div>
          
          {/* Color Swatches */}
          <div className="flex justify-end gap-1.5 mt-4">
            <div className="w-2.5 h-2.5 rounded-full bg-black border border-white/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-white border border-white/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-brand-accent-glow border border-white/20 opacity-40" />
          </div>
        </div>
      </div>
      </motion.div>

      <QuickViewModal 
        product={product} 
        isOpen={isQuickViewOpen} 
        onClose={() => setIsQuickViewOpen(false)} 
      />
    </>
  );
};
