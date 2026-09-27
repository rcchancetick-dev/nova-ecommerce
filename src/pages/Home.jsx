import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, ShieldCheck, RefreshCw, Sparkles } from "lucide-react";
import ProductCard from "../components/ProductCard.jsx";
import { products } from "../data/products.js";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  })
};

const perks = [
  { icon: Truck, title: "Livraison express", desc: "Partout dans le monde en 48h" },
  { icon: ShieldCheck, title: "Paiement sécurisé", desc: "Cryptage de bout en bout" },
  { icon: RefreshCw, title: "Retours gratuits", desc: "30 jours pour changer d'avis" }
];

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-10"
    >
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-24 text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="mb-6 flex items-center gap-2 rounded-full glass px-4 py-2 text-sm"
        >
          <Sparkles className="h-4 w-4 text-aurora-fuchsia" />
          Collection Automne 2026
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="max-w-4xl font-display text-5xl font-extrabold leading-tight sm:text-7xl"
        >
          Le futur du style,{" "}
          <span className="shimmer-text animate-shimmer">livré chez vous</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="mt-6 max-w-xl text-lg text-white/60"
        >
          Des pièces façonnées pour ceux qui vivent à la vitesse de demain. Design audacieux, matières premium, énergie électrique.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Link to="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-aurora-violet to-aurora-fuchsia px-8 py-4 font-semibold shadow-glow-lg"
            >
              Explorer la boutique
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </Link>
          <motion.a
            href="#perks"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full glass px-8 py-4 font-semibold"
          >
            En savoir plus
          </motion.a>
        </motion.div>

        <motion.div
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -right-10 top-1/3 hidden h-72 w-72 rounded-full bg-aurora-fuchsia/20 blur-3xl md:block"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -left-10 bottom-10 hidden h-72 w-72 rounded-full bg-aurora-cyan/20 blur-3xl md:block"
        />
      </section>

      <section id="perks" className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 py-16 sm:grid-cols-3">
        {perks.map((perk, i) => (
          <motion.div
            key={perk.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i}
            className="flex flex-col items-center gap-3 rounded-3xl glass p-8 text-center"
          >
            <perk.icon className="h-8 w-8 text-aurora-violet" />
            <h3 className="font-display text-lg font-semibold">{perk.title}</h3>
            <p className="text-sm text-white/50">{perk.desc}</p>
          </motion.div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex items-end justify-between"
        >
          <div>
            <p className="text-sm uppercase tracking-widest text-aurora-fuchsia">Tendances</p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Nos meilleures ventes</h2>
          </div>
          <Link to="/shop" className="hidden items-center gap-1 text-sm text-white/60 hover:text-white sm:flex">
            Voir tout <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-5xl px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-[2.5rem] glass p-12 shadow-glow-lg"
        >
          <h2 className="font-display text-3xl font-bold sm:text-5xl">
            Rejoignez le <span className="text-gradient">mouvement NOVA</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-white/60">
            Inscrivez-vous et recevez 15% de réduction sur votre première commande.
          </p>
          <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Votre email"
              className="flex-1 rounded-full bg-white/10 px-6 py-3 text-sm outline-none placeholder:text-white/40 focus:ring-2 focus:ring-aurora-fuchsia"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="rounded-full bg-gradient-to-r from-aurora-violet to-aurora-fuchsia px-6 py-3 font-semibold"
            >
              S'inscrire
            </motion.button>
          </form>
        </motion.div>
      </section>
    </motion.main>
  );
}
