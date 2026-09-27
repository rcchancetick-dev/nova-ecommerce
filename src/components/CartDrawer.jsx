import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCartStore } from "../store/cartStore.js";
import { Link } from "react-router-dom";

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQty, total } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col glass p-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">Votre panier</h2>
              <button onClick={closeCart} className="rounded-full p-2 hover:bg-white/10">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-8 flex-1 space-y-4 overflow-y-auto pr-2">
              {items.length === 0 && (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-white/50">
                  <ShoppingBag className="h-10 w-10" />
                  <p>Votre panier est vide</p>
                </div>
              )}
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    className="flex gap-4 rounded-2xl glass p-3"
                  >
                    <img src={item.image} alt={item.name} className="h-20 w-20 rounded-xl object-cover" />
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <p className="font-medium">{item.name}</p>
                        <button onClick={() => removeItem(item.id)} className="text-white/40 hover:text-red-400">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-full bg-white/10 px-2 py-1">
                          <button onClick={() => updateQty(item.id, item.qty - 1)}>
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-4 text-center text-sm">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, item.qty + 1)}>
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="font-semibold text-aurora-fuchsia">${(item.price * item.qty).toFixed(0)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {items.length > 0 && (
              <div className="mt-6 space-y-4 border-t border-white/10 pt-6">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-gradient">${total().toFixed(0)}</span>
                </div>
                <Link to="/checkout" onClick={closeCart}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full rounded-full bg-gradient-to-r from-aurora-violet to-aurora-fuchsia py-4 font-semibold shadow-glow"
                  >
                    Passer commande
                  </motion.button>
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
