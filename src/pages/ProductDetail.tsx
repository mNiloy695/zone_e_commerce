import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../components/CartDrawer';
import { PRODUCTS } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ChevronRight, ChevronLeft, Star, Shield, Truck, RefreshCw, Minus, Plus, LayoutGrid, Maximize2, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { cn } from '../lib/utils';

export const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = PRODUCTS.find((p) => p.id === id);

  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || 'Black');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [showStickyAtc, setShowStickyAtc] = useState(false);
  const primaryAtcRef = useRef<HTMLButtonElement | null>(null);

  if (!product) {
    return <div>Product not found</div>;
  }

  const images = product.images || [product.image];

  useEffect(() => {
    if (window.innerWidth >= 768 || !primaryAtcRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyAtc(!entry.isIntersecting);
      },
      { threshold: 0.2 },
    );

    observer.observe(primaryAtcRef.current);

    return () => observer.disconnect();
  }, [product.id]);

  const nextImage = () => setActiveImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setActiveImage((prev) => (prev - 1 + images.length) % images.length);

  // Related products
  const related = PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <main className="bg-brand-primary min-h-screen pb-16 md:pb-0">
      <Navbar />
      <CartDrawer />
      <div className="noise" />

      <div className="pt-24 pb-20 px-4 md:px-12 max-w-[1600px] mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold text-brand-muted mb-10 md:mb-12">
          <Link to="/" className="hover:text-brand-secondary transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/collections" className="hover:text-brand-secondary transition-colors">Shop</Link>
          <ChevronRight size={12} />
          <span className="text-brand-secondary">{product.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Main Gallery Column */}
          <div className="lg:w-1/2 space-y-8 lg:space-y-10">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-brand-accent-glow rounded-full"></span>
                <h2 className="text-[11px] uppercase tracking-[0.3em] font-black text-brand-muted">Product Gallery</h2>
              </div>
              <div className="flex bg-brand-secondary/5 p-1 rounded-xl border border-brand-border">
                <button
                  onClick={() => setViewMode('carousel')}
                  aria-label="Carousel view"
                  className={cn(
                    "touch-target p-2 rounded-lg transition-all",
                    viewMode === 'carousel' ? "bg-brand-secondary text-brand-primary shadow-lg" : "text-brand-muted hover:text-brand-secondary"
                  )}
                >
                  <Maximize2 size={16} />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                  className={cn(
                    "touch-target p-2 rounded-lg transition-all",
                    viewMode === 'grid' ? "bg-brand-secondary text-brand-primary shadow-lg" : "text-brand-muted hover:text-brand-secondary"
                  )}
                >
                  <LayoutGrid size={16} />
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {viewMode === 'carousel' ? (
                <motion.div
                  key="carousel-view"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="relative group"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeImage}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="aspect-[4/5] max-h-[600px] lg:max-h-[70vh] bg-brand-matte rounded-3xl overflow-hidden relative shadow-2xl border border-white/5"
                    >
                      <img
                        src={images[activeImage]}
                        alt={`${product.name} - Angle ${activeImage + 1}`}
                        className="w-full h-full object-cover pointer-events-none"
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                      />

                      {/* Image Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                      {/* Carousel Controls */}
                      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <button
                          onClick={(e) => { e.stopPropagation(); prevImage(); }}
                          aria-label="Previous image"
                          className="touch-target w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-brand-accent-glow hover:scale-110 transition-all pointer-events-auto"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); nextImage(); }}
                          aria-label="Next image"
                          className="touch-target w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-brand-accent-glow hover:scale-110 transition-all pointer-events-auto"
                        >
                          <ChevronRight size={24} />
                        </button>
                      </div>

                      {/* Indicators Dots */}
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
                        {images.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveImage(i)}
                            aria-label={`View image ${i + 1}`}
                            className="flex items-center justify-center p-2"
                          >
                            <span
                              className={cn(
                                "block h-1 rounded-full transition-all duration-300",
                                activeImage === i ? "w-8 bg-brand-accent-glow shadow-[0_0_10px_rgba(197,160,89,0.5)]" : "w-2 bg-white/20 hover:bg-white/40"
                              )}
                            />
                          </button>
                        ))}
                      </div>

                      {/* Active Label */}
                      <div className="absolute top-10 left-10 flex items-center gap-3 glass px-4 py-2 rounded-xl">
                        <span className="w-1.5 h-1.5 bg-brand-accent-glow rounded-full" />
                        <span className="text-[10px] uppercase font-bold tracking-widest">Detail View {activeImage + 1} / {images.length}</span>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Thumbnails Navigation */}
                  <div className="carousel mt-6 md:mt-8 pb-2 -mx-4">
                    {images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        aria-label={`Select image ${i + 1}`}
                        className={cn(
                          "carousel-item w-20 md:w-24 aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden border-2 transition-all duration-300 relative group",
                          activeImage === i
                            ? "border-brand-accent-glow scale-105 shadow-lg shadow-brand-accent-glow/20"
                            : "border-transparent opacity-40 hover:opacity-100"
                        )}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                        {activeImage === i && (
                          <div className="absolute inset-0 bg-brand-accent-glow/10" />
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="grid-view"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-2 gap-4"
                >
                  {images.map((img, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 0.98 }}
                      className="aspect-[3/4] bg-brand-matte rounded-3xl overflow-hidden border border-white/5 cursor-pointer relative group"
                      onClick={() => {
                        setActiveImage(i);
                        setViewMode('carousel');
                      }}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Maximize2 size={32} className="text-white opacity-40" />
                      </div>
                      <div className="absolute top-4 left-4 glass px-2 py-1 rounded-lg text-[8px] uppercase font-bold tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                        Angle {i + 1}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* This div is moved on mobile but visible on desktop here */}
            <div className="hidden lg:block">
              <VisualDetails product={product} />
            </div>
          </div>

          {/* Info Column */}
          <div className="lg:w-1/2 lg:pl-4">
            <div className="lg:sticky lg:top-32">
              <span className="text-brand-accent-glow text-[10px] uppercase tracking-[0.3em] font-bold block mb-3">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tighter leading-[1.1] mb-4 text-brand-secondary">
                {product.name}
              </h1>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 pb-6 border-b border-brand-border">
                <span className="text-2xl md:text-4xl font-display font-black text-brand-secondary">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}
                </span>
                <div className="flex items-center gap-2 sm:ml-4 sm:pl-4 sm:border-l border-brand-border">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className={cn("fill-current", i < Math.floor(product.rating) ? "text-brand-accent-glow" : "text-brand-muted/20")} />
                    ))}
                  </div>
                  <a href="#reviews" className="text-xs font-bold text-brand-muted uppercase hover:text-brand-accent-glow hover:underline transition-all">
                    {product.reviews} Reviews
                  </a>
                </div>
              </div>

              <div className="text-brand-secondary/80 leading-relaxed mb-8 font-medium text-sm">
                <p className="mb-4">{product.description}</p>
                <ul className="space-y-2 mt-4 text-xs md:text-sm">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-accent-glow rounded-full" /> 400 GSM Premium Organic Cotton</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-accent-glow rounded-full" /> Oversized Drop-Shoulder Fit</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-accent-glow rounded-full" /> High-Density Puff Print</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-accent-glow rounded-full" /> Pre-shrunk for zero-fade longevity</li>
                </ul>
              </div>

              {/* Color Selector */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-brand-secondary">
                    Color: <span className="text-brand-accent-glow ml-2 font-black">{selectedColor}</span>
                  </h4>
                  <span className="text-[10px] text-brand-muted uppercase">{product.colors.length} Available</span>
                </div>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Select color ${color}`}
                      className={cn(
                        "touch-target w-12 h-12 rounded-full border-[3px] transition-all p-0.5 relative group",
                        selectedColor === color
                          ? "border-brand-accent-glow scale-110 shadow-[0_0_15px_rgba(197,160,89,0.3)]"
                          : "border-transparent hover:border-brand-border hover:scale-105"
                      )}
                    >
                      <div className="w-full h-full rounded-full border border-black/20 dark:border-white/30 shadow-[inset_0_2px_6px_rgba(0,0,0,0.5)]" style={{ backgroundColor: color }} />
                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] text-white uppercase tracking-wider opacity-0 group-hover:opacity-100 whitespace-nowrap bg-black/80 px-2 py-1 rounded backdrop-blur-md pointer-events-none transition-opacity z-10">
                        {color}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-8 mt-4">
                <div className="flex justify-between items-center mb-4 text-brand-secondary">
                  <h4 className="text-[10px] uppercase tracking-widest font-black">
                    Select Size
                    {selectedSize && <span className="text-brand-accent-glow ml-2">— {selectedSize}</span>}
                  </h4>
                  <button className="text-[10px] uppercase tracking-widest font-black underline decoration-brand-border hover:text-brand-accent-glow hover:decoration-brand-accent-glow transition-all">Size Guide</button>
                </div>
                <div className="grid grid-cols-5 gap-2 md:gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "relative py-3 md:py-4 rounded-xl border font-mono text-sm transition-all duration-300 group overflow-hidden",
                        selectedSize === size
                          ? "bg-brand-accent-glow text-black border-brand-accent-glow font-black shadow-[0_0_20px_rgba(197,160,89,0.3)]"
                          : "bg-brand-secondary/5 border-brand-border text-brand-secondary hover:border-brand-accent-glow/50 hover:bg-brand-accent-glow/10"
                      )}
                    >
                      <span className="relative z-10">{size}</span>
                      {selectedSize === size && (
                        <motion.div layoutId="activeSize" className="absolute inset-0 bg-brand-accent-glow z-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart Section */}
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex gap-3 h-14 md:h-16">
                  {/* Quantity */}
                  <div className="flex items-center justify-between bg-brand-charcoal border border-brand-border rounded-xl px-4 w-32 shrink-0 transition-colors">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} aria-label="Decrease quantity" className="touch-target hover:text-brand-accent-glow transition-colors text-brand-secondary p-2"><Minus size={16} /></button>
                    <span className="w-8 text-center font-display font-black text-base text-brand-secondary">{quantity}</span>
                    <button onClick={() => setQuantity(q => q + 1)} aria-label="Increase quantity" className="touch-target hover:text-brand-accent-glow transition-colors text-brand-secondary p-2"><Plus size={16} /></button>
                  </div>

                  {/* CTA */}
                  <button
                    ref={primaryAtcRef}
                    onClick={() => addToCart({ ...product, quantity, size: selectedSize, color: selectedColor } as any)}
                    className="flex-1 bg-brand-accent-glow text-black font-display font-black uppercase tracking-[0.1em] text-[11px] md:text-xs rounded-xl hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 group shadow-xl"
                  >
                    <ShoppingBag size={18} />
                    Add to Cart
                    <span className="opacity-60 hidden md:inline ml-2 font-mono text-[10px] tracking-normal border-l border-black/20 pl-4">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price * quantity)}</span>
                  </button>
                </div>

                {/* Contact / Order Buttons */}
                <div className="grid grid-cols-3 gap-3">
                  {/* WhatsApp Order */}
                  <a
                    href={"https://wa.me/8801806779323?text=Hi%2C%20I%20want%20to%20order%3A%20" + encodeURIComponent(product.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Order via WhatsApp"
                    className="flex flex-col lg:flex-row items-center justify-center gap-2.5 py-4 px-2 rounded-xl border border-[#25D366]/30 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-300 group"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span className="text-[10px] font-black uppercase tracking-widest text-center lg:text-left leading-[1.1]">WhatsApp<span className="hidden lg:inline"><br />Order</span></span>
                  </a>

                  {/* Facebook Order */}
                  <a
                    href="https://www.facebook.com/velourazone"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Order via Facebook"
                    className="flex flex-col lg:flex-row items-center justify-center gap-2.5 py-4 px-2 rounded-xl border border-[#1877F2]/30 bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all duration-300 group"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span className="text-[10px] font-black uppercase tracking-widest text-center lg:text-left leading-[1.1]">Facebook<span className="hidden lg:inline"><br />Order</span></span>
                  </a>

                  {/* Phone Call */}
                  <a
                    href="tel:+8801806779323"
                    aria-label="Call to order"
                    className="flex flex-col lg:flex-row items-center justify-center gap-2.5 py-4 px-2 rounded-xl border border-brand-accent-glow/30 bg-brand-accent-glow/10 text-brand-accent-glow hover:bg-brand-accent-glow hover:text-black transition-all duration-300 group"
                  >
                    <Phone size={20} className="shrink-0" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-center lg:text-left leading-[1.1]">Call Us<span className="hidden lg:inline"><br />To Order</span></span>
                  </a>
                </div>
              </div>

              {/* Trust Signals (Benefits) */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-brand-border/50 mb-12 lg:mb-0 bg-brand-charcoal/20 px-4 rounded-2xl">
                <div className="flex flex-col items-center text-center gap-1.5">
                  <Truck size={18} className="text-brand-accent-glow mb-1" />
                  <span className="text-[9px] uppercase font-bold tracking-wider text-brand-secondary">Fast Delivery</span>
                  <span className="text-[8px] uppercase font-semibold text-brand-muted">2-3 Bus. Days</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5 border-l border-brand-border">
                  <RefreshCw size={18} className="text-brand-accent-glow mb-1" />
                  <span className="text-[9px] uppercase font-bold tracking-wider text-brand-secondary">Easy Returns</span>
                  <span className="text-[8px] uppercase font-semibold text-brand-muted">14 Days Policy</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5 md:border-l border-brand-border">
                  <Shield size={18} className="text-brand-accent-glow mb-1" />
                  <span className="text-[9px] uppercase font-bold tracking-wider text-brand-secondary">Secure Pay</span>
                  <span className="text-[8px] uppercase font-semibold text-brand-muted">SSL Encrypted</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5 border-l border-brand-border">
                  <div className="flex items-center gap-1 mb-1 h-[18px]">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  </div>
                  <span className="text-[9px] uppercase font-bold tracking-wider text-green-500">In Stock</span>
                  <span className="text-[8px] uppercase font-semibold text-brand-muted">Ready to Ship</span>
                </div>
              </div>

              {/* On mobile, VisualDetails follows Info */}
              <div className="lg:hidden mt-16 pb-12">
                <VisualDetails product={product} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showStickyAtc && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.18 }}
            className="fixed bottom-[72px] left-0 right-0 z-50 md:hidden bg-brand-primary/95 border-t border-brand-border backdrop-blur-xl p-3"
          >
            <div className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-black uppercase tracking-wider truncate">{product.name}</p>
                <p className="text-sm font-semibold text-brand-accent-glow">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}
                </p>
              </div>
              <button
                onClick={() => addToCart({ ...product, quantity, size: selectedSize, color: selectedColor } as any)}
                className="min-h-[44px] px-5 rounded-xl bg-brand-accent-glow text-black text-[11px] font-black uppercase tracking-widest"
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
};

const VisualDetails = ({ product }: { product: any }) => {
  return (
    <div className="mt-12 lg:mt-24">
      <div className="flex items-center gap-4 mb-12">
        <div className="h-px flex-1 bg-white/10" />
        <h2 className="text-[11px] uppercase tracking-[0.4em] font-black text-white/40">Visual Details</h2>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {(product.images || []).slice(1, 3).map((img: string, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="aspect-square bg-brand-matte rounded-[2rem] overflow-hidden group border border-white/5"
          >
            <img
              src={img}
              alt="Detail shot"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        ))}
      </div>

      <div className="mt-8 aspect-[16/9] bg-brand-matte rounded-[2.5rem] overflow-hidden group border border-white/5 relative">
        <img
          src={product.images ? product.images[product.images.length - 1] : product.image}
          alt="Full lifestyle shot"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-white/10 text-4xl md:text-9xl font-black uppercase tracking-tighter">VELOURA</span>
        </div>
      </div>
    </div>
  );
};