import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Search, Menu, X, User, Home, Package, Truck, Phone, Info, Sun, Moon, Crown, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../lib/utils';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Shop', path: '/collections' },
    { name: 'Lookbook', path: '/drops' },
    { name: 'About', path: '/studio' },
    { name: 'Contact', path: '/archive' },
  ];

  const bottomNavItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Shop', path: '/collections', icon: Package },
    { name: 'Cart', onClick: () => setIsCartOpen(true), icon: ShoppingBag, badge: totalItems },
    { name: 'Track', path: '/tracking', icon: Truck },
    { name: 'More', onClick: () => setIsMobileMenuOpen(true), icon: Menu },
  ];

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 md:px-12 flex items-center justify-between border-b',
          isScrolled 
            ? 'h-16 md:h-20 glass-dark shadow-2xl border-brand-border' 
            : 'h-16 md:h-24 bg-brand-primary/80 backdrop-blur-md border-transparent'
        )}
      >
        <Link
          to="/"
          className="flex items-center gap-4 group"
        >
          <div className="relative flex flex-col items-center">
            <Crown size={12} className="text-brand-accent-glow absolute -top-4 z-20" />
            <div className="w-11 h-11 border border-brand-accent-glow/40 rounded-full flex items-center justify-center relative group-hover:bg-brand-accent-glow/5 transition-all duration-700">
               <div className="relative flex items-center justify-center font-serif">
                 <span className="text-xl font-bold bg-gradient-to-br from-brand-accent-glow to-white bg-clip-text text-transparent transform -translate-x-1.5 translate-y-1 leading-none">V</span>
                 <span className="text-xl font-bold bg-gradient-to-br from-brand-accent-glow to-white bg-clip-text text-transparent absolute transform translate-x-1.5 -translate-y-1 leading-none">Z</span>
               </div>
            </div>
            <div className="absolute inset-0 w-11 h-11 border border-brand-accent-glow rounded-full animate-ping opacity-10" />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-brand-secondary text-xl md:text-2xl tracking-[0.1em] font-serif font-black uppercase leading-none">Veloura</span>
            <div className="flex items-center gap-2 w-full mt-1.5 px-1">
              <div className="h-[0.5px] flex-1 bg-brand-accent-glow/40" />
              <div className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-brand-accent-glow/40" />
                <span className="text-[7px] md:text-[8px] font-black tracking-[0.4em] text-brand-accent-glow uppercase">Zone</span>
                <span className="w-1 h-1 rounded-full bg-brand-accent-glow/40" />
              </div>
              <div className="h-[0.5px] flex-1 bg-brand-accent-glow/40" />
            </div>
          </div>
        </Link>
        
        <div className="hidden lg:flex items-center gap-16 text-[10px] uppercase tracking-[0.2em] font-black">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="relative group py-2"
            >
              <span className="group-hover:text-brand-accent-glow transition-all duration-500 text-brand-secondary">{link.name}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-accent-glow shadow-[0_0_15px_rgba(197,160,89,0.5)] transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <button className="hidden lg:flex w-9 h-9 rounded-full border border-brand-border items-center justify-center hover:bg-brand-secondary hover:text-brand-primary transition-all text-brand-secondary">
            <Search size={14} />
          </button>

          <button 
            onClick={toggleTheme}
            className="hidden lg:flex w-9 h-9 rounded-full border border-brand-border items-center justify-center hover:bg-brand-secondary hover:text-brand-primary transition-all text-brand-secondary"
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          <button className="hidden lg:flex w-9 h-9 rounded-full border border-brand-border items-center justify-center hover:bg-brand-secondary hover:text-brand-primary transition-all text-brand-secondary">
            <Heart size={14} />
          </button>
          
          <button
            onClick={() => setIsCartOpen(true)}
            className="hidden lg:flex items-center gap-2 px-5 py-2 rounded-full border border-brand-border text-[10px] uppercase tracking-widest font-black hover:bg-brand-secondary hover:text-brand-primary transition-all text-brand-secondary relative group"
          >
            <div className="flex items-center gap-2">
               <ShoppingBag size={14} />
               <span>Cart</span>
            </div>
            <span className="bg-brand-accent-glow text-black w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black shadow-lg shadow-brand-accent-glow/20">
               {totalItems}
            </span>
          </button>

          <Link to="/tracking" className="hidden lg:flex w-9 h-9 rounded-full border border-brand-border items-center justify-center hover:bg-brand-secondary hover:text-brand-primary transition-all text-brand-secondary">
            <Truck size={14} />
          </Link>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] z-50">
        <div className="bg-brand-primary/95 border border-brand-border h-20 rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.4)] flex items-center justify-around px-4 backdrop-blur-xl">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            if (item.path) {
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "flex flex-col items-center gap-1.5 transition-all duration-500 relative py-2 px-3 min-w-[64px]",
                    isActive ? "text-brand-accent-glow scale-110" : "text-brand-secondary"
                  )}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute inset-0 bg-brand-accent-glow/10 rounded-2xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Icon size={18} className={cn("relative z-10", isActive && "drop-shadow-[0_0_12px_rgba(197,160,89,0.5)]")} />
                  <span className={cn(
                    "text-[9px] font-black uppercase tracking-widest relative z-10",
                    isActive ? "text-brand-accent-glow opacity-100" : "text-brand-muted opacity-100"
                  )}>{item.name}</span>
                </Link>
              );
            }
            
            return (
              <button
                key={item.name}
                onClick={item.onClick}
                className="flex flex-col items-center gap-1.5 text-brand-secondary transition-all relative py-2 px-3 min-w-[64px]"
              >
                <div className="relative">
                  <Icon size={18} />
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-2 -right-2 bg-brand-accent-glow text-black text-[7px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-lg border border-brand-primary">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-brand-muted opacity-100">{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Menu (Overlay/Drawer for "More" options) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-0 z-[60] bg-brand-primary/95 flex flex-col"
          >
            <div className="flex justify-between items-center p-8 border-b border-brand-border">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3"
              >
                <div className="relative flex flex-col items-center">
                  <Crown size={10} className="text-brand-accent-glow absolute -top-3" />
                  <div className="w-9 h-9 border border-brand-accent-glow/40 rounded-full flex items-center justify-center relative">
                     <span className="text-xl font-serif font-bold bg-gradient-to-br from-brand-accent-glow to-white bg-clip-text text-transparent transform -translate-x-1 translate-y-0.5 leading-none">V</span>
                     <span className="text-xl font-serif font-bold bg-gradient-to-br from-brand-accent-glow to-white bg-clip-text text-transparent absolute transform translate-x-1 -translate-y-0.5 leading-none">Z</span>
                  </div>
                </div>
                <div className="flex flex-col items-center leading-none">
                  <span className="text-brand-secondary text-xl font-serif font-black uppercase tracking-[0.1em]">Veloura</span>
                  <div className="flex items-center gap-2 w-full mt-1.5 px-1">
                    <div className="h-[0.5px] flex-1 bg-brand-accent-glow/40" />
                    <div className="flex items-center gap-1">
                      <span className="w-0.5 h-0.5 rounded-full bg-brand-accent-glow/40" />
                      <span className="text-[6px] font-black tracking-[0.4em] text-brand-accent-glow uppercase">Zone</span>
                      <span className="w-0.5 h-0.5 rounded-full bg-brand-accent-glow/40" />
                    </div>
                    <div className="h-[0.5px] flex-1 bg-brand-accent-glow/40" />
                  </div>
                </div>
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-3 bg-brand-secondary/5 rounded-full hover:bg-brand-secondary/10 transition-colors text-brand-secondary">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto pt-10 px-8">
              <div className="mb-6 flex justify-between items-center bg-brand-secondary/5 p-4 rounded-2xl border border-brand-border">
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-muted">Appearance</span>
                <button 
                  onClick={toggleTheme}
                  className="px-4 py-2 bg-brand-secondary text-brand-primary rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 flex items-center gap-3"
                >
                  {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                  {theme === 'dark' ? 'Light mode' : 'Dark mode'}
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 mb-12">
                {[
                  { name: 'Track Your Order', icon: Truck, path: '/tracking' },
                  { name: 'Contact Support', icon: Phone, path: '/archive' },
                  { name: 'Our Story', icon: Info, path: '/studio' },
                  { name: 'Size Guide', icon: Search, path: '/collections' },
                ].map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-6 p-6 bg-brand-secondary/5 rounded-2xl group active:scale-[0.98] transition-all border border-brand-border"
                    >
                      <div className="w-12 h-12 rounded-xl bg-brand-secondary/5 flex items-center justify-center group-hover:bg-brand-accent-glow group-hover:text-black transition-colors">
                        <item.icon size={22} className="text-brand-secondary" />
                      </div>
                      <span className="text-xl font-display font-black uppercase tracking-tighter text-brand-secondary">{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mb-12">
                <h4 className="text-[10px] uppercase tracking-[0.5em] font-black text-brand-muted mb-6">Collections</h4>
                <div className="grid grid-cols-2 gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-4 bg-brand-secondary/5 rounded-xl text-[10px] uppercase font-black tracking-widest text-center hover:bg-brand-accent-glow hover:text-black transition-colors text-brand-secondary border border-brand-border"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-brand-border">
              <p className="text-[10px] text-brand-muted uppercase tracking-[0.2em] font-medium text-center">
                © 2026 Veloura Studio // Season 2024
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
