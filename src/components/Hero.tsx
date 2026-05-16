import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden flex items-center pt-24 pb-40 md:pt-32 md:pb-24">
      {/* Background with parallax effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-brand-primary/40 z-10" />
        <img
          src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=2000&auto=format&fit=crop"
          alt="Streetwear Hero"
          className="w-full h-full object-cover scale-105 animate-slow-zoom"
          referrerPolicy="no-referrer"
        />
        {/* Animated Particles / Glows */}
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-accent-glow/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-brand-accent-glow/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-20 w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-8"
        >
          <div className="mb-6 inline-flex items-center gap-3 px-4 py-1.5 bg-brand-secondary/5 border border-brand-border rounded-full w-fit">
            <span className="flex h-2 w-2 rounded-full bg-brand-accent-glow animate-pulse shadow-[0_0_10px_rgba(197,160,89,0.8)]"></span>
            <span className="text-[10px] uppercase tracking-[0.1em] font-bold text-brand-secondary">New Season / 2024 Collection</span>
          </div>
          
          <h1 className="text-[clamp(36px,10vw,220px)] font-black uppercase tracking-tighter leading-[0.85] md:leading-[0.8] mb-8 text-brand-secondary">
            Modern <br />
            <span className="text-hollow italic font-light">Elegance</span> <br />
            <span className="text-brand-accent-glow">Studio</span>
          </h1>
          
          <div className="flex flex-col md:flex-row md:items-end gap-10 lg:gap-16">
            <p className="max-w-sm text-brand-muted text-[10px] md:text-sm leading-relaxed font-medium uppercase tracking-[0.2em] px-2 md:px-0">
              Premium everyday wear for the digital generation. <br />
              New Collection — Available Now.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full sm:w-auto">
              <Link
                to="/collections"
                className="w-full sm:w-auto px-10 md:px-16 py-5 md:py-6 bg-brand-accent-glow text-black font-black uppercase tracking-widest text-[10px] hover:bg-brand-secondary hover:text-brand-primary transition-all transform active:scale-95 text-center rounded-xl shadow-[0_10px_40px_rgba(197,160,89,0.2)]"
              >
                Shop Collection
              </Link>
              
              <Link
                to="/studio"
                className="w-full sm:w-auto px-8 md:px-12 py-5 md:py-6 border border-brand-border glass font-black uppercase tracking-widest text-[10px] text-brand-secondary hover:bg-brand-secondary hover:text-brand-primary transition-all text-center rounded-xl"
              >
                Our Story
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Decorative Floating Element for Desktop */}
        <div className="hidden lg:block lg:col-span-4 relative">
          <div className="absolute -z-10 -top-20 -right-20 w-80 h-80 border border-brand-accent-glow/20 rounded-full" />
          <div className="h-24 w-px bg-gradient-to-b from-transparent via-white/50 to-transparent absolute -left-12 top-0" />
        </div>
      </div>

      {/* Side Scroll Indicator */}
      <div className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 flex flex-col gap-12 opacity-20 hidden md:flex">
        <div className="w-[1px] h-20 bg-white" />
        <span className="vertical-rl text-[10px] uppercase tracking-[1em] text-white">Scroll</span>
      </div>
    </section>
  );
};
