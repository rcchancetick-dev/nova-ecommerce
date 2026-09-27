import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, Plus } from "lucide-react";
import { useCartStore } from "../store/cartStore.js";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  })
};

export default function ProductCard({ product, index }) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -10 }}
      className="group relative overflow-hidden rounded-3xl glass p-4"
    >
      {product.badge && (
        <span className="absolute left-6 top-6 z-10 rounded-full bg-gradient-to-r from-aurora-violet to-aurora-fuchsia px-3 py-1 text-xs font-semibold">
          {product.badge}
        </span>
      )}
      <Link to={`/product/${product.id}`}>
        <div className="relative h-64 overflow-hidden rounded-2xl">
          <motion.img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.12 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </Link>

      <div className="mt-4 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-widest text-white/40">{product.category}</p>
          <div className="flex items-center gap-1 text-xs text-amber-400">
            <Star className="h-3 w-3 fill-amber-400" /> {product.rating}
          </div>
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display text-lg font-semibold group-hover:text-gradient">{product.name}</h3>
        </Link>
        <p className="text-sm text-white/50">{product.color}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-xl font-bold">${product.price}</span>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => addItem(product)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-aurora-violet to-aurora-fuchsia shadow-glow"
            aria-label="Ajouter au panier"
          >
            <Plus className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
