import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivacyPolicy from './pages/PrivacyPage';
import TermsOfService from './pages/TermsOfService';
import OrderDetails from './pages/OrderDetails';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import AuthAction from './pages/AuthAction';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import CartPage from './pages/CartPage';
import OrderConfirmation from './pages/orderConfirmation';
import NotFound from './pages/NotFound';
import TestimonialsPage from './pages/TestimonialsPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppContent = () => {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 mt-16">
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/auth-action" element={<AuthAction />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/account/orders/:orderId" element={<OrderDetails />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="/" element={<Home />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/account/:tab?" element={<Account />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </Router>
    </CartProvider>
  );
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
