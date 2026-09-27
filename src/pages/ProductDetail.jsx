import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ArrowLeft, ShieldCheck, Truck } from "lucide-react";
import { products } from "../data/products.js";
import { useCartStore } from "../store/cartStore.js";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const addItem = useCartStore((s) => s.addItem);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Produit introuvable.</p>
      </div>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-32"
    >
      <Link to="/shop" className="mb-8 inline-flex items-center gap-2 text-sm text-white/60 hover:text-white">
        <ArrowLeft className="h-4 w-4" /> Retour à la boutique
      </Link>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-3xl glass"
        >
          <motion.img
            src={product.image}
            alt={product.name}
            className="h-[500px] w-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {product.badge && (
            <span className="inline-block rounded-full bg-gradient-to-r from-aurora-violet to-aurora-fuchsia px-3 py-1 text-xs font-semibold">
              {product.badge}
            </span>
          )}
          <h1 className="mt-4 font-display text-4xl font-extrabold">{product.name}</h1>
          <div className="mt-3 flex items-center gap-2 text-amber-400">
            <Star className="h-4 w-4 fill-amber-400" />
            <span className="text-sm">{product.rating} / 5</span>
          </div>
          <p className="mt-6 text-3xl font-bold text-gradient">${product.price}</p>
          <p className="mt-4 text-white/60">
            Coloris {product.color}. Conçu avec des matériaux premium et une attention obsessionnelle du détail pour accompagner votre quotidien avec style et performance.
          </p>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => addItem(product)}
            className="mt-8 w-full rounded-full bg-gradient-to-r from-aurora-violet to-aurora-fuchsia py-4 font-semibold shadow-glow-lg sm:w-auto sm:px-12"
          >
            Ajouter au panier
          </motion.button>

          <div className="mt-10 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 rounded-2xl glass p-4">
              <Truck className="h-5 w-5 text-aurora-cyan" />
              <span className="text-sm">Livraison 48h</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl glass p-4">
              <ShieldCheck className="h-5 w-5 text-aurora-cyan" />
              <span className="text-sm">Garantie 2 ans</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
