import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { Collections } from './pages/Collections';
import { Archive } from './pages/Archive';
import { Tracking } from './pages/Tracking';
import { Checkout } from './pages/Checkout';
import { Drops } from './pages/Drops';
import { Studio } from './pages/Studio';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { useEffect } from 'react';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  
  return null;
}

export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <CartProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/drops" element={<Drops />} />
            <Route path="/studio" element={<Studio />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/shop" element={<Collections />} />
          </Routes>
        </CartProvider>
      </ThemeProvider>
    </Router>
  );
}

