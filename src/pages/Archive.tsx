import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../components/CartDrawer';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export const Archive = () => {
  const archiveItems = [
    { title: "Project: 01-Void", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop", size: "tall" },
    { title: "Texture Study", image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200&auto=format&fit=crop", size: "square" },
    { title: "Silicon Valley Noir", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop", size: "wide" },
    { title: "The Studio Vibe", image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1200&auto=format&fit=crop", size: "square" },
    { title: "Experimental Dye", image: "https://images.unsplash.com/photo-1544441893-675973e31d85?q=80&w=1200&auto=format&fit=crop", size: "tall" },
    { title: "Concrete Jungle", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop", size: "wide" },
  ];

  return (
    <main className="bg-brand-primary min-h-screen">
      <Navbar />
      <CartDrawer />
      <div className="noise" />

      <section className="pt-40 pb-24 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24">
            <div className="max-w-2xl">
              <span className="text-brand-accent-glow text-[11px] uppercase tracking-[0.5em] font-black mb-6 flex items-center gap-4">
                <span className="w-12 h-[1px] bg-brand-accent-glow"></span>
                Past Visions
              </span>
              <h1 className="text-6xl md:text-9xl font-display font-black uppercase tracking-tighter leading-none mb-8">
                THE <span className="text-hollow italic">ARCHIVE</span>
              </h1>
            </div>
            <p className="text-white/40 text-sm uppercase tracking-widest font-bold max-w-[300px] text-right">
              A historical record of our most experimental silhouettes and digital explorations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {archiveItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "relative bg-brand-matte rounded-[2.5rem] overflow-hidden group cursor-crosshair",
                  item.size === 'wide' ? "md:col-span-2" : "",
                  item.size === 'tall' ? "row-span-2" : ""
                )}
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-10 flex flex-col justify-end">
                  <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-brand-accent-glow mb-2">Collection 2024</span>
                  <h3 className="text-3xl font-display font-black uppercase tracking-tight">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};
