import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../components/CartDrawer';
import { PRODUCTS } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ChevronRight, ChevronLeft, Star, Shield, Truck, RefreshCw, Minus, Plus, LayoutGrid, Maximize2 } from 'lucide-react';
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  if (!product) {
    return <div>Product not found</div>;
  }

  const images = product.images || [product.image];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const nextImage = () => setActiveImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setActiveImage((prev) => (prev - 1 + images.length) % images.length);

  // Related products
  const related = PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <main className="bg-brand-primary min-h-screen pb-32 md:pb-0">
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

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20">
          {/* Main Gallery Column */}
          <div className="lg:col-span-7 space-y-8 lg:space-y-12">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <div className="flex items-center gap-2">
                 <span className="w-2 h-2 bg-brand-accent-glow rounded-full"></span>
                 <h2 className="text-[11px] uppercase tracking-[0.3em] font-black text-brand-muted">Product Gallery</h2>
              </div>
              <div className="flex bg-brand-secondary/5 p-1 rounded-xl border border-brand-border">
                <button 
                  onClick={() => setViewMode('carousel')}
                  className={cn(
                    "p-2 rounded-lg transition-all",
                    viewMode === 'carousel' ? "bg-brand-secondary text-brand-primary shadow-lg" : "text-brand-muted hover:text-brand-secondary"
                  )}
                >
                  <Maximize2 size={16} />
                </button>
                <button 
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    "p-2 rounded-lg transition-all",
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
                    className="aspect-[4/5] bg-brand-matte rounded-3xl overflow-hidden relative shadow-2xl border border-white/5 cursor-zoom-in"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <motion.img 
                      src={images[activeImage]} 
                      alt={`${product.name} - Angle ${activeImage + 1}`} 
                      className="w-full h-full object-cover pointer-events-none"
                      loading="eager"
                      referrerPolicy="no-referrer"
                      style={{ 
                        transformOrigin: `${mousePos.x}% ${mousePos.y}%`
                      }}
                      animate={{ 
                        scale: isHovering ? 2 : 1
                      }}
                      transition={{ 
                        type: "spring",
                        stiffness: 150,
                        damping: 25,
                        mass: 0.5
                      }}
                    />
                    
                    {/* Image Overlays */}
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none transition-opacity duration-300",
                      isHovering ? "opacity-0" : "opacity-100"
                    )} />
                      
                      {/* Carousel Controls */}
                      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <button 
                          onClick={(e) => { e.stopPropagation(); prevImage(); }}
                          className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-brand-accent-glow hover:scale-110 transition-all pointer-events-auto"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); nextImage(); }}
                          className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-brand-accent-glow hover:scale-110 transition-all pointer-events-auto"
                        >
                          <ChevronRight size={24} />
                        </button>
                      </div>

                      {/* Indicators Dots */}
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                        {images.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveImage(i)}
                            className={cn(
                              "h-1 rounded-full transition-all duration-300",
                              activeImage === i ? "w-8 bg-brand-accent-glow shadow-[0_0_10px_rgba(197,160,89,0.5)]" : "w-2 bg-white/20 hover:bg-white/40"
                            )}
                          />
                        ))}
                      </div>
                      
                      {/* Active Label */}
                      <div className="absolute top-10 left-10 flex items-center gap-3 glass px-4 py-2 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-500 origin-left">
                        <span className="w-1.5 h-1.5 bg-brand-accent-glow rounded-full animate-pulse" />
                        <span className="text-[10px] uppercase font-bold tracking-widest">Detail View {activeImage + 1} / {images.length}</span>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Thumbnails Navigation */}
                  <div className="mt-6 md:mt-8 flex gap-3 md:gap-4 overflow-x-auto hide-scrollbar pb-2">
                    {images.map((img, i) => (
                      <button 
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={cn(
                          "flex-shrink-0 w-20 md:w-24 aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden border-2 transition-all duration-300 relative group",
                          activeImage === i 
                            ? "border-brand-accent-glow scale-105 shadow-lg shadow-brand-accent-glow/20" 
                            : "border-transparent opacity-40 hover:opacity-100"
                        )}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover transition-transform group-hover:scale-110" loading="lazy" />
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
                      <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
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
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <span className="text-brand-accent-glow text-[10px] uppercase tracking-[0.3em] font-bold block mb-4">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none mb-6 text-brand-secondary">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 md:gap-6 mb-8 pb-8 border-b border-brand-border">
                <span className="text-3xl md:text-6xl font-display font-black text-brand-secondary">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}
                </span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className={cn("fill-current", i < Math.floor(product.rating) ? "text-brand-accent-glow" : "text-brand-muted/20")} />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-brand-muted uppercase">({product.reviews})</span>
                </div>
              </div>

              <p className="text-brand-secondary leading-relaxed mb-10 font-medium text-sm md:text-base">
                {product.description}
              </p>

              {/* Color Selector */}
              <div className="mb-8">
                <h4 className="text-[10px] uppercase tracking-widest font-bold mb-4 text-brand-secondary">Select Color: <span className="text-brand-muted">{selectedColor}</span></h4>
                <div className="flex gap-4">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "w-8 h-8 rounded-full border-2 transition-all p-0.5",
                        selectedColor === color ? "border-brand-accent-glow scale-110" : "border-brand-border"
                      )}
                    >
                      <div className="w-full h-full rounded-full" style={{ backgroundColor: color }} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4 text-brand-secondary">
                  <h4 className="text-[10px] uppercase tracking-widest font-black">Select Size</h4>
                  <button className="text-[10px] uppercase tracking-widest font-black underline hover:text-brand-accent-glow">Size Guide</button>
                </div>
                <div className="grid grid-cols-5 gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "py-4 rounded-xl border font-mono text-sm transition-all duration-300",
                        selectedSize === size 
                          ? "bg-brand-accent-glow text-black border-brand-accent-glow shadow-[0_0_20px_rgba(197,160,89,0.3)] font-black" 
                          : "bg-brand-secondary/5 border-brand-border text-brand-secondary hover:border-brand-secondary/30"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex flex-col xl:flex-row gap-4 mb-10 md:mb-12">
                <div className="flex items-center justify-between bg-brand-charcoal border border-brand-border rounded-2xl px-6 py-4 gap-8 w-full xl:w-auto shrink-0 transition-colors">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="hover:text-brand-accent-glow transition-colors text-brand-secondary"><Minus size={18} /></button>
                  <span className="w-4 text-center font-display font-black text-lg text-brand-secondary">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="hover:text-brand-accent-glow transition-colors text-brand-secondary"><Plus size={18} /></button>
                </div>
                <button
                  onClick={() => addToCart({ ...product, quantity, size: selectedSize, color: selectedColor } as any)}
                  className="flex-1 py-5 md:py-6 bg-brand-accent-glow text-black font-display font-black uppercase tracking-[0.1em] text-[10px] md:text-[11px] rounded-2xl hover:bg-brand-secondary hover:text-brand-primary transition-all duration-500 flex items-center justify-center gap-4 group shadow-xl"
                >
                  <ShoppingBag size={18} className="group-hover:scale-110 transition-transform" />
                  Add to Cart
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="flex"
                  >
                    <ChevronRight size={18} />
                  </motion.div>
                </button>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 glass rounded-3xl mb-12 lg:mb-0">
                <div className="flex flex-col items-center text-center gap-2">
                  <Truck size={18} className="text-brand-accent-glow" />
                  <span className="text-[9px] uppercase font-bold tracking-widest">Global Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2 md:border-x border-white/10">
                  <RefreshCw size={18} className="text-brand-accent-electric" />
                  <span className="text-[9px] uppercase font-bold tracking-widest">Easy Returns</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <Shield size={18} className="text-brand-accent-glow" />
                  <span className="text-[9px] uppercase font-bold tracking-widest">Secure Pay</span>
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
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 aspect-[16/9] bg-brand-matte rounded-[2.5rem] overflow-hidden group border border-white/5 relative">
         <img 
            src={product.images ? product.images[product.images.length - 1] : product.image} 
            alt="Full lifestyle shot" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            referrerPolicy="no-referrer"
            loading="lazy"
         />
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-white/10 text-4xl md:text-9xl font-black uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity duration-500">VELOURA</span>
         </div>
      </div>
    </div>
  );
};

const ArrowRight = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);
