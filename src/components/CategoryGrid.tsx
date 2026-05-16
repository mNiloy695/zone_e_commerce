import React from 'react';
import { motion } from 'motion/react';
import { CATEGORIES } from '../constants';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CategoryGrid = () => {
  return (
    <section className="py-20 px-4 md:px-12 bg-brand-charcoal">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
        <div>
          <span className="text-brand-accent-glow text-[10px] uppercase tracking-[0.3em] font-bold block mb-4">
            Browse By Vibe
          </span>
          <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter leading-[0.9] md:leading-none text-brand-secondary">
            Elite <br /> Collections
          </h2>
        </div>
        <p className="max-w-md text-brand-muted text-[11px] md:text-sm font-medium tracking-wide leading-relaxed">
          Whether it's minimal luxury or bold graphic hype, our curated categories 
          bring you the pinnacle of digital-age streetwear.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CATEGORIES.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative h-[450px] overflow-hidden rounded-[2.5rem] border border-brand-border"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover grayscale"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent group-hover:from-brand-accent-glow/40 transition-all duration-700" />
            
            <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 flex justify-between items-end">
              <div>
                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-black text-brand-accent-glow mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">Season 01</p>
                <h3 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tighter text-white leading-none">
                  {category.name}
                </h3>
                <Link to={`/collections?category=${category.id}`} className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.1em] font-black text-white/60 hover:text-brand-accent-glow transition-all mt-4 border-t border-white/10 pt-4 w-full">
                  View Collection <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </div>
              <div className="w-16 h-16 rounded-full glass border border-brand-border flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-all duration-700 group-hover:bg-brand-accent-glow group-hover:text-black">
                <ArrowUpRight size={28} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
