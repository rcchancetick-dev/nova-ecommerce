import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CheckCircle2, CreditCard, Lock } from "lucide-react";
import { useCartStore } from "../store/cartStore.js";
import { Link } from "react-router-dom";

export default function Checkout() {
  const { items, total, clearCart } = useCartStore();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => clearCart(), 1200);
  };

  if (submitted) {
    return (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <CheckCircle2 className="h-20 w-20 text-emerald-400" />
        </motion.div>
        <h1 className="mt-6 font-display text-3xl font-bold">Commande confirmée !</h1>
        <p className="mt-2 text-white/60">Merci pour votre achat. Un email de confirmation arrive bientôt.</p>
        <Link to="/shop">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="mt-8 rounded-full bg-gradient-to-r from-aurora-violet to-aurora-fuchsia px-8 py-3 font-semibold"
          >
            Continuer mes achats
          </motion.button>
        </Link>
      </motion.main>
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
      <h1 className="mb-10 font-display text-4xl font-extrabold">Finaliser la commande</h1>

      {items.length === 0 ? (
        <div className="rounded-3xl glass p-12 text-center text-white/60">
          Votre panier est vide.{" "}
          <Link to="/shop" className="text-aurora-fuchsia underline">
            Découvrir la boutique
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-5 rounded-3xl glass p-8"
          >
            <h2 className="font-display text-xl font-semibold">Informations de livraison</h2>
            <input required placeholder="Nom complet" className="w-full rounded-xl bg-white/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-aurora-fuchsia" />
            <input required type="email" placeholder="Email" className="w-full rounded-xl bg-white/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-aurora-fuchsia" />
            <input required placeholder="Adresse" className="w-full rounded-xl bg-white/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-aurora-fuchsia" />
            <div className="grid grid-cols-2 gap-4">
              <input required placeholder="Ville" className="rounded-xl bg-white/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-aurora-fuchsia" />
              <input required placeholder="Code postal" className="rounded-xl bg-white/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-aurora-fuchsia" />
            </div>

            <h2 className="pt-4 font-display text-xl font-semibold">Paiement</h2>
            <div className="relative">
              <CreditCard className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input required placeholder="Numéro de carte" className="w-full rounded-xl bg-white/10 py-3 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-aurora-fuchsia" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input required placeholder="MM/AA" className="rounded-xl bg-white/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-aurora-fuchsia" />
              <input required placeholder="CVC" className="rounded-xl bg-white/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-aurora-fuchsia" />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-aurora-violet to-aurora-fuchsia py-4 font-semibold shadow-glow-lg"
            >
              <Lock className="h-4 w-4" /> Payer ${total().toFixed(0)}
            </motion.button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="h-fit space-y-4 rounded-3xl glass p-8"
          >
            <h2 className="font-display text-xl font-semibold">Résumé</h2>
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-white/70">
                    {item.name} × {item.qty}
                  </span>
                  <span className="font-medium">${(item.price * item.qty).toFixed(0)}</span>
                </motion.div>
              ))}
            </AnimatePresence>
            <div className="border-t border-white/10 pt-4">
              <div className="flex items-center justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-gradient">${total().toFixed(0)}</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.main>
  );
}
