import React, { useEffect, useRef } from 'react';
import { Hero } from '../components/Hero';
import { Navbar } from '../components/Navbar';
import { CategoryGrid } from '../components/CategoryGrid';
import { ProductCard } from '../components/ProductCard';
import { Testimonials } from '../components/Testimonials';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../components/CartDrawer';
import { PRODUCTS } from '../constants';
import { motion } from 'motion/react';
import { ArrowRight, Box, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const WhyChooseUs = () => {
  const features = [
    { 
      title: "Premium Cotton", 
      desc: "400GSM heavyweight fabric for the perfect luxury drape.", 
      icon: Box,
      color: "brand-accent-glow"
    },
    { 
      title: "Oversized Fit", 
      desc: "Meticulously designed for movement and modern silhouette.", 
      icon: Zap,
      color: "brand-accent-electric"
    },
    { 
      title: "Limited Drops", 
      desc: "Exclusive designs that never restock. Quality over quantity.", 
      icon: ShieldCheck,
      color: "brand-accent-glow"
    }
  ];

  return (
    <section className="py-20 px-4 md:px-12 bg-brand-primary border-y border-brand-border">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {features.map((feature, i) => (
          <motion.div 
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="group glass p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-brand-border hover:border-brand-accent-glow/30 transition-all duration-500"
          >
            <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-brand-charcoal flex items-center justify-center mb-8 md:mb-10 group-hover:shadow-[0_0_20px_rgba(197,160,89,0.3)] transition-all duration-500`}>
              <feature.icon className="text-brand-secondary w-6 h-6 md:w-8 md:h-8 group-hover:text-brand-accent-glow transition-colors" />
            </div>
            <h3 className="text-xl md:text-2xl font-display font-black uppercase mb-3 md:mb-4 tracking-tighter text-brand-secondary">{feature.title}</h3>
            <p className="text-brand-muted text-sm leading-relaxed font-medium">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export const Home = () => {
  const trendingProducts = PRODUCTS.slice(0, 4);
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current && glowRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        glowRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="relative overflow-hidden bg-brand-primary pb-16 md:pb-0">
      <div ref={cursorRef} className="custom-cursor hidden lg:block" />
      <div ref={glowRef} className="custom-cursor-glow hidden lg:block" />
      <div className="noise" />
      
      <Navbar />
      <CartDrawer />
      
      <Hero />
      
      {/* Featured Products */}
      <section className="py-20 px-4 md:px-12 max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
          <div className="max-w-2xl px-2">
            <span className="text-brand-accent-glow text-[10px] uppercase tracking-[0.4em] font-black block mb-4">
              Season 04 / Editorial
            </span>
            <h2 className="text-4xl md:text-9xl font-display font-black uppercase tracking-tighter leading-[0.85] md:leading-[0.75] text-brand-secondary">
              Modern <br />
              <span className="italic font-light flex items-center gap-4">
                Essentials
                <span className="h-[2px] w-8 md:w-24 bg-brand-accent-glow inline-block shadow-[0_0_10px_rgba(197,160,89,0.5)]" />
              </span>
            </h2>
          </div>
          <Link to="/collections" className="group flex items-center gap-4 md:gap-6 text-[10px] uppercase tracking-[0.3em] font-black px-2 text-brand-secondary">
            View All Series
            <span className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-brand-border flex items-center justify-center group-hover:bg-brand-accent-glow group-hover:border-brand-accent-glow group-hover:text-black transition-all duration-500 transform group-hover:scale-110">
              <ArrowRight size={18} />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8 overflow-visible py-1">
          {trendingProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      <CategoryGrid />
      
      <WhyChooseUs />
      
      <Testimonials />

      {/* Newsletter Big Section */}
      <section className="py-32 md:py-48 px-4 md:px-12 bg-brand-primary overflow-hidden relative border-t border-brand-border">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="absolute top-0 left-1/4 w-[1px] h-full bg-brand-secondary/10" />
           <div className="absolute top-0 left-2/4 w-[1px] h-full bg-brand-secondary/10" />
           <div className="absolute top-0 left-3/4 w-[1px] h-full bg-brand-secondary/10" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-brand-accent-glow text-[10px] uppercase tracking-[0.5em] font-bold block mb-8">
              Join the V-Zone
            </span>
            <h2 className="text-4xl md:text-[10vw] font-display font-black uppercase tracking-tighter mb-8 md:mb-12 leading-[0.9] md:leading-[0.8] text-brand-secondary">
              Your New <br />
              <span className="text-hollow">Fav</span> Fit
            </h2>
            <p className="text-brand-muted mb-12 md:text-lg tracking-[0.05em] max-w-2xl mx-auto font-medium uppercase leading-relaxed px-4 text-xs">
              Get early access to our latest drops and <br className="hidden md:block" /> 
              exclusive community events.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto bg-brand-secondary/5 border border-brand-border p-2 rounded-2xl md:rounded-3xl backdrop-blur-3xl">
              <input 
                type="email" 
                placeholder="ENTRY@EMAIL.COM" 
                autoComplete="email"
                className="flex-1 bg-transparent border-none px-4 md:px-6 py-4 md:py-5 text-base font-black tracking-widest focus:outline-none placeholder:text-brand-muted w-full text-brand-secondary"
              />
              <button className="w-full sm:w-auto px-10 py-4 md:py-5 bg-brand-accent-glow text-black font-display font-black uppercase tracking-wider text-[10px] hover:bg-brand-secondary hover:text-brand-primary transition-all duration-500 rounded-xl md:rounded-2xl shadow-[0_10px_30px_rgba(197,160,89,0.2)]">
                Join Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};
