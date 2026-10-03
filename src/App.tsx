import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { SmoothScroll } from './components/layout/SmoothScroll';
import { Preloader } from './components/layout/Preloader';
import { CustomCursor } from './components/layout/CustomCursor';
import { FilmGrain } from './components/layout/FilmGrain';
import { ProgressBar } from './components/layout/ProgressBar';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { BagDrawer } from './components/cart/BagDrawer';
import { PageTransition } from './components/layout/PageTransition';

// Pages
import { HomePage } from './pages/HomePage';
import { CollectionPage } from './pages/CollectionPage';
import { CraftPage } from './pages/CraftPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { JournalPage } from './pages/JournalPage';
import { BagPage } from './pages/BagPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <Router>
      <CartProvider>
        <SmoothScroll>
          {/* Minimal Preloader */}
          <Preloader />

          {/* Desktop Custom Cursor */}
          <CustomCursor />

          {/* 35mm Analog Film Grain Texture */}
          <FilmGrain />

          {/* Page Scroll Progress Indicator */}
          <ProgressBar />

          {/* Minimal Global Header */}
          <Header />

          {/* Interactive Shopping Bag Drawer */}
          <BagDrawer />

          {/* Main Content with Route Transitions */}
          <main className="min-h-screen">
            <PageTransition>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/collection" element={<CollectionPage />} />
                <Route path="/craft" element={<CraftPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/journal" element={<JournalPage />} />
                <Route path="/bag" element={<BagPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </PageTransition>
          </main>

          {/* Minimal Editorial Footer */}
          <Footer />
        </SmoothScroll>
      </CartProvider>
    </Router>
  );
};

export default App;
