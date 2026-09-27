import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard.jsx";
import { products, categories } from "../data/products.js";

export default function Shop() {
  const [active, setActive] = useState("Tous");

  const filtered = useMemo(
    () => (active === "Tous" ? products : products.filter((p) => p.category === active)),
    [active]
  );

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <p className="text-sm uppercase tracking-widest text-aurora-fuchsia">Catalogue complet</p>
        <h1 className="font-display text-4xl font-extrabold sm:text-5xl">
          La <span className="shimmer-text animate-shimmer">boutique</span>
        </h1>
      </motion.div>

      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setActive(cat)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              active === cat ? "text-white" : "text-white/50 hover:text-white"
            }`}
          >
            {active === cat && (
              <motion.span
                layoutId="pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-aurora-violet to-aurora-fuchsia"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </motion.button>
        ))}
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {filtered.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </motion.div>
    </motion.main>
  );
}
