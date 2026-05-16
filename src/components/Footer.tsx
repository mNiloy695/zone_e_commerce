import React from 'react';
import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-brand-primary pt-20 px-4 md:px-12 border-t border-brand-secondary/5 pb-24 md:pb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-20 md:mb-24 px-2 md:px-0">
        {/* Brand Side */}
        <div className="lg:col-span-2">
          <Link to="/" className="text-4xl font-display font-black tracking-tighter uppercase mb-12 block flex items-center gap-4 group">
            <div className="relative flex flex-col items-center">
              <div className="w-10 h-10 border border-brand-accent-glow/40 rounded-full flex items-center justify-center relative group-hover:bg-brand-accent-glow/10 transition-all duration-500">
                 <div className="relative flex items-center justify-center font-serif">
                   <span className="text-lg font-bold bg-gradient-to-br from-brand-accent-glow to-white bg-clip-text text-transparent transform -translate-x-1 translate-y-0.5 leading-none">V</span>
                   <span className="text-lg font-bold bg-gradient-to-br from-brand-accent-glow to-white bg-clip-text text-transparent absolute transform translate-x-1 -translate-y-0.5 leading-none">Z</span>
                 </div>
              </div>
            </div>
            <span className="flex flex-col leading-none text-brand-secondary">
              Veloura
              <span className="text-[10px] tracking-[0.4em] text-brand-accent-glow font-black uppercase">Studio</span>
            </span>
          </Link>
          <p className="max-w-md text-brand-secondary/40 text-sm leading-relaxed mb-8 font-light uppercase tracking-wider">
            Luxury craftsmanship meets global street culture. <br />
            Season 2024 / Premium Collection.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-accent-glow mb-8">Studio</h4>
          <ul className="space-y-4">
            {[
              { name: 'Collections', path: '/collections' },
              { name: 'Shop All', path: '/collections' },
              { name: 'Track My Order', path: '/tracking' },
              { name: 'Size Guide', path: '/collections' },
              { name: 'Our Story', path: '/studio' }
            ].map((item) => (
              <li key={item.name}>
                <Link to={item.path} className="text-xs font-bold uppercase tracking-widest hover:text-brand-accent-glow flex items-center gap-2 group transition-all">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-accent-glow mb-8">Join the Drop</h4>
          <div className="relative group">
            <input 
              type="email" 
              placeholder="YOUR EMAIL"
              autoComplete="email"
              className="w-full bg-brand-secondary/5 border border-brand-border rounded-xl px-4 py-4 text-base font-bold tracking-widest focus:outline-none focus:border-brand-accent-glow transition-all text-brand-secondary"
            />
            <button aria-label="Subscribe" className="absolute right-2 top-2 touch-target w-10 h-10 bg-brand-secondary text-brand-primary rounded-lg flex items-center justify-center hover:bg-brand-accent-glow hover:text-brand-primary transition-all">
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Design specific Bottom Bar */}
      <div className="py-12 border-t border-brand-border flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-wrap justify-center gap-8 text-[10px] uppercase tracking-[0.2em] text-brand-muted font-bold">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-brand-accent-glow rounded-full"></span>
            Premium Fabrics
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-brand-accent-glow rounded-full"></span>
            Worldwide Shipping
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-brand-accent-glow rounded-full"></span>
            Limited Drops
          </div>
        </div>

        <div className="flex gap-8 opacity-60">
          {['Instagram', 'TikTok', 'Discord'].map((platform) => (
            <span key={platform} className="text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:text-brand-secondary transition-colors text-brand-secondary">
              {platform}
            </span>
          ))}
        </div>
      </div>

      <div className="pb-12 flex flex-col md:flex-row justify-between items-center opacity-20 gap-4">
        <div className="flex gap-8">
           <p className="text-[9px] uppercase tracking-[0.2em] font-medium">NYC: 40.7128° N, 74.0060° W</p>
           <p className="text-[9px] uppercase tracking-[0.2em] font-medium">LDN: 51.5074° N, 0.1278° W</p>
           <p className="text-[9px] uppercase tracking-[0.2em] font-medium">TYO: 35.6762° N, 139.6503° E</p>
        </div>
        <p className="text-[9px] uppercase tracking-[0.2em] font-medium">© 2026 Veloura Studio // Season 2024</p>
      </div>
    </footer>
  );
};
