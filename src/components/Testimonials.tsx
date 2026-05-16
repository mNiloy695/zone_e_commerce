import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const REVIEWS = [
  {
    name: "Alex Thorne",
    handle: "@alex_streetstyle",
    content: "The quality is unmatched. I've tried many luxury streetwear brands, but Veloura's oversized fit is perfection.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "Sarah Kim",
    handle: "@sk_aesthetic",
    content: "Instantly my favorite t-shirt. The fabric weight feels so premium and the minimal design is just what I needed.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "Marcus Vane",
    handle: "@mv_concept",
    content: "The futuristic graphics are insane. Even better in person. Definitely worth the price for a limited drop.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1542156822-6924d1a71ace?q=80&w=200&auto=format&fit=crop"
  }
];

export const Testimonials = () => {
  return (
    <section className="py-20 px-4 md:px-12 bg-brand-primary relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-accent-glow/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="text-center mb-12 md:mb-16">
        <span className="text-brand-accent-glow text-[10px] uppercase tracking-[0.3em] font-bold block mb-4">
          Community Vibes
        </span>
        <h2 className="text-3xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none text-brand-secondary">
          What the <span className="text-glow italic text-brand-accent-glow">Zone</span> Says
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
        {REVIEWS.map((review, index) => (
          <motion.div
            key={review.handle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="glass p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] relative group border border-brand-border hover:border-brand-accent-glow/30 transition-all"
          >
            <Quote className="absolute top-6 right-6 md:top-8 md:right-8 text-brand-muted/10 w-12 h-12 md:w-16 md:h-16 group-hover:text-brand-accent-glow/10 transition-colors" />
            
            <div className="flex items-center gap-1 mb-6">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} size={12} className="fill-brand-accent-glow text-brand-accent-glow" />
              ))}
            </div>

            <p className="text-base md:text-lg font-medium leading-relaxed mb-8 text-brand-secondary italic">
              "{review.content}"
            </p>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-brand-accent-glow/30">
                <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-display font-bold uppercase text-sm text-brand-secondary">{review.name}</h4>
                <p className="text-[10px] uppercase tracking-widest text-brand-accent-glow font-bold">
                  {review.handle}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Marquee or extra flair can go here */}
      <div className="mt-20 overflow-hidden py-10 border-y border-brand-border">
        <div className="flex animate-marquee whitespace-nowrap gap-20">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-20 items-center">
              <span className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter text-brand-secondary/5 italic">Premium Fabric</span>
              <span className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter text-brand-secondary/5">Oversized Fit</span>
              <span className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter text-brand-secondary/5 italic">Limited Drop</span>
              <span className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter text-brand-secondary/5">Gen-Z Aesthetic</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
