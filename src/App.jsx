import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import CursorGlow from "./components/CursorGlow.jsx";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Checkout from "./pages/Checkout.jsx";
import NotFound from "./pages/NotFound.jsx";
import Auth from "./pages/Auth.jsx";
import Admin from "./pages/Admin.jsx";

export default function App() {
  const location = useLocation();
  return (
    <div className="relative min-h-screen bg-obsidian bg-noise overflow-hidden">
      <div className="pointer-events-none fixed inset-0 bg-aurora-gradient" />
      <CursorGlow />
      <Navbar />
      <CartDrawer />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
