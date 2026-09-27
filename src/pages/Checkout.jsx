import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCartStore } from "../store/cartStore.js";

export default function Checkout() {
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total());
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 mx-auto min-h-screen max-w-4xl px-6 pb-24 pt-36">
      <h1 className="font-display text-4xl font-bold">Votre panier</h1>
      {items.length ? <div className="mt-8 rounded-3xl glass p-8">
        {items.map(item => <div key={item.id} className="flex justify-between gap-4 border-b border-white/10 py-3"><span>{item.name} × {item.qty}</span><span>${(item.price * item.qty).toFixed(2)}</span></div>)}
        <p className="mt-6 text-xl font-semibold">Total indicatif : ${total.toFixed(2)}</p>
        <div role="status" className="mt-8 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 text-amber-100"><h2 className="font-semibold">Commandes temporairement indisponibles</h2><p className="mt-2 text-sm">Cette boutique est une démonstration. Aucun paiement par carte n’est proposé et aucune commande n’est enregistrée depuis cette page. Ne saisissez jamais vos informations bancaires ici.</p></div>
      </div> : <p className="mt-8 text-white/60">Votre panier est vide.</p>}
      <Link to="/shop" className="mt-8 inline-block rounded-full bg-gradient-to-r from-aurora-violet to-aurora-fuchsia px-6 py-3 font-semibold">Retour à la boutique</Link>
    </motion.main>
  );
}
