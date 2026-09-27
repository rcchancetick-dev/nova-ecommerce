import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, Sparkles } from "lucide-react";
import { useCartStore } from "../store/cartStore.js";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/shop", label: "Boutique" },
  { to: "/checkout", label: "Panier" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleCart = useCartStore((s) => s.toggleCart);
  const count = useCartStore((s) => s.count());
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? "glass shadow-glow py-3" : "py-6"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-extrabold tracking-tight">
          <motion.span
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="h-6 w-6 text-aurora-fuchsia" />
          </motion.span>
          <span className="shimmer-text animate-shimmer">NOVA</span>
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <Link key={link.to} to={link.to} className="relative text-sm font-medium text-white/80 hover:text-white">
              {link.label}
              {location.pathname === link.to && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 h-[2px] w-full bg-gradient-to-r from-aurora-violet to-aurora-fuchsia"
                />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={toggleCart}
            className="relative flex h-11 w-11 items-center justify-center rounded-full glass"
            aria-label="Ouvrir le panier"
          >
            <ShoppingBag className="h-5 w-5" />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-aurora-fuchsia text-[10px] font-bold"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {links.map((link) => (
                <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)} className="text-lg font-medium">
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
