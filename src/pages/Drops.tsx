import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../components/CartDrawer';
import { motion } from 'motion/react';
import { Clock, Bell, Share2 } from 'lucide-react';

export const Drops = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    // Random target date for demo: 3 days from now
    const target = new Date();
    target.setDate(target.getDate() + 3);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = target.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="bg-brand-primary min-h-screen pb-16 md:pb-0">
      <Navbar />
      <CartDrawer />
      <div className="noise" />

      <section className="pt-48 pb-24 px-6 md:px-12 text-center relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent-glow/5 blur-[120px] rounded-full -z-10" />

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-brand-accent-glow/30 text-brand-accent-glow text-[10px] uppercase font-black tracking-[0.4em] mb-12">
              <span className="w-2 h-2 bg-brand-accent-glow rounded-full" />
              Upcoming: Edition 05
            </span>
            <h1 className="text-7xl md:text-[10rem] font-display font-black uppercase tracking-tighter leading-[0.8] mb-16">
              CYBER <br /> <span className="text-hollow italic">VANGUARD</span>
            </h1>
            
            {/* Timer */}
            <div className="grid grid-cols-4 gap-4 md:gap-8 max-w-2xl mx-auto mb-20">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="flex flex-col gap-2">
                  <div className="bg-brand-secondary/5 border border-brand-secondary/10 rounded-2xl md:rounded-[2rem] p-6 md:p-10 text-4xl md:text-6xl font-black tabular-nums transition-all hover:bg-brand-secondary/10">
                    {value.toString().padStart(2, '0')}
                  </div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-brand-secondary/40">{unit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <button className="w-full md:w-auto px-12 py-5 bg-brand-secondary text-brand-primary rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-brand-accent-glow hover:text-black transition-all shadow-xl shadow-white/5">
                Notify Me via SMS
              </button>
              <button className="w-full md:w-auto px-12 py-5 bg-brand-secondary/5 border border-brand-secondary/10 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-brand-secondary/10 transition-all flex items-center justify-center gap-3">
                <Bell size={16} /> Add to Calendar
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sneak Peek */}
      <section className="py-24 px-6 md:px-12 bg-brand-secondary/[0.02] border-t border-brand-secondary/5">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex justify-between items-center mb-16">
             <h2 className="text-[11px] uppercase tracking-[0.5em] font-black text-brand-secondary/60">The Vanguard Collection Preview</h2>
             <div className="flex items-center gap-2 text-brand-accent-glow text-[10px] font-bold uppercase tracking-widest">
               <Clock size={14} /> 05/20/26 • 12:00 PM EST
             </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-[16/9] bg-brand-matte rounded-[3rem] overflow-hidden group border border-brand-secondary/5">
              <img 
                src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop" 
                className="w-full h-full object-cover grayscale" 
                alt="Sneak peek item"
                loading="lazy"
                referrerPolicy="no-referrer"
                decoding="async"
              />
            </div>
            <div className="flex flex-col justify-center text-left max-w-xl">
               <h3 className="text-4xl font-display font-black uppercase italic mb-6 text-brand-secondary">Ultra-Heavy <span className="text-brand-accent-glow">Puffer</span></h3>
               <p className="text-brand-secondary/40 leading-relaxed mb-8 font-light">
                 Constructed from water-resistant tech fabric with a 900-fill power down. 
                 Featuring integrated glowing fiber-optic seams and a detachable modular hood.
               </p>
               <div className="flex gap-4">
                  <button aria-label="Share sneak peek" className="touch-target w-12 h-12 rounded-full border border-brand-secondary/10 flex items-center justify-center text-brand-secondary/40 hover:text-brand-secondary transition-colors">
                    <Share2 size={18} />
                  </button>
               </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};
