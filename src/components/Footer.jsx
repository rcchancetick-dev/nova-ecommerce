import { motion } from "framer-motion";
import { Instagram, Twitter, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-32 border-t border-white/10 px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm text-white/50"
        >
          © {new Date().getFullYear()} NOVA. Tous droits réservés.
        </motion.p>
        <div className="flex gap-5">
          {[Instagram, Twitter, Github].map((Icon, i) => (
            <motion.a
              key={i}
              href="#"
              whileHover={{ scale: 1.2, rotate: 8 }}
              className="text-white/60 hover:text-aurora-fuchsia"
            >
              <Icon className="h-5 w-5" />
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
