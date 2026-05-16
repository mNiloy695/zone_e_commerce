import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Crown, Heart, Home, Menu, Moon, Package, Search, ShoppingBag, Sun, User, X, Truck } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../lib/utils';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, isCartOpen, setIsCartOpen } = useCart();
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

  const mobileTabs = [
    { name: 'Home', path: '/', icon: Home, ariaLabel: 'Go to home' },
    { name: 'Shop', path: '/collections', icon: Package, ariaLabel: 'Browse shop' },
    { name: 'Cart', onClick: () => setIsCartOpen(true), icon: ShoppingBag, badge: totalItems, ariaLabel: 'View cart' },
    { name: 'Track', path: '/tracking', icon: Truck, ariaLabel: 'Track Order' },
  ];

  const isPathActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 w-full z-50 transition-all duration-500 px-4 md:px-12 flex items-center justify-between border-b',
          isScrolled
            ? 'h-16 md:h-20 glass-dark shadow-2xl border-brand-border'
            : 'h-16 md:h-24 bg-brand-primary/80 backdrop-blur-md border-transparent',
        )}
      >
        <Link to="/" className="flex items-center gap-2 md:gap-4 group min-w-0 max-w-[calc(100%-56px)]" aria-label="Go to home">
          <div className="relative flex flex-col items-center">
            <Crown size={12} className="hidden md:block text-brand-accent-glow absolute -top-4 z-20" />
            <div className="w-10 h-10 md:w-11 md:h-11 border border-brand-accent-glow/40 rounded-full flex items-center justify-center relative group-hover:bg-brand-accent-glow/5 transition-all duration-700">
              <div className="relative flex items-center justify-center font-serif">
                <span className="text-lg md:text-xl font-bold bg-gradient-to-br from-brand-accent-glow to-white bg-clip-text text-transparent transform -translate-x-1.5 translate-y-1 leading-none">V</span>
                <span className="text-lg md:text-xl font-bold bg-gradient-to-br from-brand-accent-glow to-white bg-clip-text text-transparent absolute transform translate-x-1.5 -translate-y-1 leading-none">Z</span>
              </div>
            </div>
            <div className="absolute inset-0 w-10 h-10 md:w-11 md:h-11 border border-brand-accent-glow opacity-10 rounded-full" />
          </div>
          <div className="flex flex-col min-w-0 items-start md:items-center">
            <span className="text-brand-secondary text-lg md:text-2xl tracking-[0.08em] md:tracking-[0.1em] font-serif font-black uppercase leading-none truncate">Veloura</span>
            <div className="hidden md:flex items-center gap-2 w-full mt-1.5 px-1">
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

        <div className="hidden md:flex items-center gap-10 lg:gap-16 text-[10px] uppercase tracking-[0.2em] font-black">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className="relative group py-2">
              <span className="group-hover:text-brand-accent-glow transition-all duration-500 text-brand-secondary">{link.name}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-accent-glow shadow-[0_0_15px_rgba(197,160,89,0.5)] transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3 lg:gap-5">
          <Link
            to="/tracking"
            aria-label="Track Order"
            className="min-h-[44px] px-5 py-2 rounded-full border border-brand-border text-[11px] uppercase tracking-widest font-black hover:bg-brand-secondary hover:text-brand-primary transition-all text-brand-secondary relative group flex items-center gap-2.5"
          >
            <Truck size={18} aria-hidden="true" />
            <span>Track</span>
          </Link>

          <button
            type="button"
            aria-label="Search"
            className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full border border-brand-border hover:bg-brand-secondary hover:text-brand-primary transition-all text-brand-secondary"
          >
            <Search size={18} aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full border border-brand-border hover:bg-brand-secondary hover:text-brand-primary transition-all text-brand-secondary"
          >
            {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>

          <button
            type="button"
            aria-label="Add to wishlist"
            className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full border border-brand-border hover:bg-brand-secondary hover:text-brand-primary transition-all text-brand-secondary"
          >
            <Heart size={18} aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            aria-label="View cart"
            className="min-h-[44px] px-5 py-2 rounded-full border border-brand-border text-[11px] uppercase tracking-widest font-black hover:bg-brand-secondary hover:text-brand-primary transition-all text-brand-secondary relative group flex items-center gap-2.5"
          >
            <ShoppingBag size={18} aria-hidden="true" />
            <span>Cart</span>
            <span className="bg-brand-accent-glow text-black w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black shadow-lg shadow-brand-accent-glow/20">
              {totalItems}
            </span>
          </button>
        </div>

        <button
          type="button"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="touch-target md:hidden rounded-full border border-brand-border text-brand-secondary hover:bg-brand-secondary hover:text-brand-primary transition-all"
        >
          {isMobileMenuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
        </button>
      </nav>

      <div className="md:hidden fixed bottom-0 left-0 w-full z-50 border-t border-brand-border/70 bg-brand-primary/96 backdrop-blur-2xl shadow-[0_-10px_30px_rgba(0,0,0,0.22)] pb-[max(env(safe-area-inset-bottom),0.5rem)]">
        <div className="grid grid-cols-4 gap-1 px-2.5 pt-2.5">
          {mobileTabs.map((item) => {
            const Icon = item.icon;
            const isActive = item.path ? isPathActive(item.path) : isCartOpen;

            if (item.path) {
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  aria-label={item.ariaLabel}
                  className={cn(
                    'min-h-[56px] flex flex-col items-center justify-center gap-1 rounded-2xl text-[10px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 relative',
                    isActive
                      ? 'text-brand-accent-glow bg-brand-accent-glow/[0.14] shadow-[inset_0_0_0_1px_rgba(197,160,89,0.2),0_10px_20px_rgba(0,0,0,0.18)]'
                      : 'text-brand-muted hover:text-brand-secondary',
                  )}
                >
                  <Icon size={17} aria-hidden="true" />
                  <span>{item.name}</span>
                </Link>
              );
            }

            return (
              <button
                key={item.name}
                type="button"
                onClick={item.onClick}
                aria-label={item.ariaLabel}
                className={cn(
                  'min-h-[56px] flex flex-col items-center justify-center gap-1 rounded-2xl text-[10px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 relative',
                  isActive
                    ? 'text-brand-accent-glow bg-brand-accent-glow/[0.14] shadow-[inset_0_0_0_1px_rgba(197,160,89,0.2),0_10px_20px_rgba(0,0,0,0.18)]'
                    : 'text-brand-muted hover:text-brand-secondary',
                )}
              >
                <div className="relative">
                  <Icon size={17} aria-hidden="true" />
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-2 -right-2 bg-brand-accent-glow text-black text-[8px] font-black min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center shadow-[0_6px_14px_rgba(197,160,89,0.3)] border border-brand-primary">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[60] md:hidden bg-brand-primary/95 backdrop-blur-2xl pt-24 pb-24 px-6 overflow-y-auto"
          >
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full border border-brand-border text-brand-secondary hover:bg-brand-secondary hover:text-brand-primary transition-all"
              aria-label="Close menu"
            >
              <X size={24} aria-hidden="true" />
            </button>
            <div className="space-y-4">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="min-h-[52px] flex items-center px-5 rounded-2xl border border-brand-border bg-brand-secondary/5 text-brand-secondary text-sm font-black uppercase tracking-[0.2em]"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="mt-8">
              <button
                type="button"
                onClick={toggleTheme}
                className="w-full min-h-[52px] rounded-2xl border border-brand-border bg-brand-secondary/5 text-brand-secondary text-sm font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
