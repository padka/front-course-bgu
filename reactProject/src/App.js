import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext/AuthContext';
import { CartProvider } from './components/CartContext/CartContext';
import { FurnitureProvider } from './components/NavEl/context/FurnitureContext';
import UserProfile from './components/UserProfile/UserProfile';
import FloatingIcons from "./components/NavEl/FloatingIcons";
import AdminPanel from './components/UserProfile/AdminPanel';

const Header = lazy(() => import('./components/Header/Header'));
const SliderComponent = lazy(() => import('./components/SliderComponent/SliderComponent'));
const IntroSection = lazy(() => import('./components/IntroSection/IntroSection'));
const Catalog = lazy(() => import('./components/Catalog/Catalog'));
const Footer = lazy(() => import('./components/Footer/Footer'));
const Cart = lazy(() => import('./components/Cart/Cart'));
const Adventage = lazy(() => import('./components/Adventage/Adventage'));
const NotFoundPage = lazy(() => import('./components/NotFoundPage/NotFoundpage')); // Исправлен путь, если была ошибка
const FurnitureConstructor = lazy(() => import('./components/NavEl/components/FurnitureConstructor'));

const LoadingIndicator = () => (
  <div className="loading-indicator">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Загрузка...</span> {/* Обновлено для лучшей доступности */}
    </div>
  </div>
);

const IndexPage = () => (
  <>
    <Suspense fallback={<LoadingIndicator />}> {/* Добавлен Suspense для асинхронной загрузки компонентов */}
      <SliderComponent />
      <Catalog />
      <Adventage />
    </Suspense>
  </>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <FurnitureProvider> {/* Оборачиваем приложение в FurnitureProvider */}
            <Suspense fallback={<LoadingIndicator />}> {/* Обернул в Suspense, чтобы ленивая загрузка работала для всех компонентов */}
              <div className="App">
                <Header />
                <div className="content-wrapper">
                  <main>
                    <Routes>
                      <Route path="/about" element={<IntroSection />} />
                      <Route path="/catalog" element={<Catalog />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/profile" element={<UserProfile />} />
                      <Route path="/admin" element={<AdminPanel />} />
                      <Route path="/constructor" element={<FurnitureConstructor />} />
                      <Route path="/" element={<IndexPage />} />
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                  </main>
                  <FloatingIcons />
                </div>
                <Footer />
              </div>
            </Suspense>
          </FurnitureProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
