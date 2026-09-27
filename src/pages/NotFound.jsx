import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <motion.h1
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 150 }}
        className="font-display text-8xl font-extrabold shimmer-text animate-shimmer"
      >
        404
      </motion.h1>
      <p className="mt-4 text-white/60">Cette page s'est perdue dans l'espace.</p>
      <Link to="/">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="mt-8 rounded-full bg-gradient-to-r from-aurora-violet to-aurora-fuchsia px-8 py-3 font-semibold"
        >
          Retour à l'accueil
        </motion.button>
      </Link>
    </motion.main>
  );
}
