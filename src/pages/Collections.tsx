import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../components/CartDrawer';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS, CATEGORIES } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { SlidersHorizontal } from 'lucide-react';
import { cn } from '../lib/utils';

export const Collections = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-low' | 'price-high'>('featured');

  const filteredProducts = selectedCategory
    ? PRODUCTS.filter(p => p.category === selectedCategory)
    : PRODUCTS;

  // Sorting logic (simulated)
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0; // Default featured
  });

  return (
    <main className="bg-brand-primary min-h-screen pb-16 md:pb-0">
      <Navbar />
      <CartDrawer />
      <div className="noise" />

      {/* Header Section */}
      <header className="pt-32 md:pt-40 pb-12 px-6 md:px-12 max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-brand-accent-glow text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] block mb-6 opacity-60">
            Premium Drops
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black uppercase tracking-[-0.015em] leading-[0.9] mb-8 text-brand-secondary break-words">
            Veloura <span className="text-vibe-gradient italic block lg:inline mt-1 lg:mt-0 lg:pr-3 lg:ml-2">Collections</span>
          </h1>
          <p className="text-brand-muted text-xs md:text-sm max-w-xl leading-relaxed font-medium">
            {sortedProducts.length} pieces. Heavyweight cotton, limited runs. COD all over Bangladesh.
          </p>
        </motion.div>
      </header>

      {/* Control Bar */}
      <section className="sticky top-16 md:top-20 z-40 px-6 md:px-12 py-6 bg-brand-primary/80 backdrop-blur-xl border-y border-brand-border/50">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar w-full md:w-auto p-0.5">
            <button
              onClick={() => setSelectedCategory(null)}
              className={cn(
                "px-6 py-2.5 rounded-full text-[9px] md:text-[10px] uppercase font-black tracking-[0.15em] transition-all duration-500 whitespace-nowrap",
                selectedCategory === null
                  ? "bg-brand-secondary text-brand-primary shadow-2xl"
                  : "bg-brand-secondary/5 text-brand-muted hover:text-brand-secondary border border-brand-border/50"
              )}
            >
              All
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-[9px] md:text-[10px] uppercase font-black tracking-[0.15em] transition-all duration-500 whitespace-nowrap",
                  selectedCategory === cat.id
                    ? "bg-brand-accent-glow text-black shadow-lg shadow-brand-accent-glow/20"
                    : "bg-brand-secondary/5 text-brand-muted hover:text-brand-secondary border border-brand-border/50"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] font-black text-brand-muted bg-brand-secondary/5 border border-brand-border/50 px-5 py-2.5 rounded-full group cursor-pointer hover:border-brand-accent-glow/50 transition-all">
              <SlidersHorizontal size={12} className="text-brand-secondary group-hover:text-brand-accent-glow transition-colors" />
              <select
                className="bg-transparent text-brand-secondary outline-none cursor-pointer font-black border-none focus:ring-0 p-0 text-base"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="featured" className="bg-brand-primary">Newest</option>
                <option value="price-low" className="bg-brand-primary">Price low</option>
                <option value="price-high" className="bg-brand-primary">Price high</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid — pt increased to clear sticky control bar height */}
      <section className="pt-16 md:pt-20 pb-32 px-4 md:px-12 max-w-[1600px] mx-auto">
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 overflow-visible py-1"
        >
          <AnimatePresence mode="popLayout">
            {sortedProducts.map((product, i) => <ProductCard key={product.id} product={product} index={i} />)}
          </AnimatePresence>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
};