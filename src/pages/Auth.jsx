import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient.js";

export default function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => { if (data.user) navigate("/admin", { replace: true }); });
  }, [navigate]);
  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const { error } = mode === "signup"
        ? await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/auth` } })
        : await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (mode === "signup") setMessage("Vérifie ta boîte mail pour confirmer ton adresse, puis connecte-toi.");
      else navigate("/admin", { replace: true });
    } catch (error) { setMessage(error.message); }
    finally { setBusy(false); }
  }
  return (
    <main className="relative z-10 mx-auto flex min-h-screen max-w-md items-center px-6 pt-24">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="w-full rounded-3xl glass p-8">
        <Link to="/" className="text-sm text-white/60 hover:text-white">← Retour à l'accueil</Link>
        <h1 className="mt-6 font-display text-3xl font-bold">{mode === "login" ? "Connexion" : "Créer un compte"}</h1>
        <p className="mt-2 text-sm text-white/50">L'administration nécessite un compte autorisé.</p>
        <form onSubmit={submit} className="mt-8 space-y-4">
          <label className="block text-sm">E-mail<input required type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-2 w-full rounded-xl bg-white/10 p-3 outline-none focus:ring-2 focus:ring-aurora-fuchsia" /></label>
          <label className="block text-sm">Mot de passe<input required minLength={8} type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} value={password} onChange={e => setPassword(e.target.value)} className="mt-2 w-full rounded-xl bg-white/10 p-3 outline-none focus:ring-2 focus:ring-aurora-fuchsia" /></label>
          <button disabled={busy} className="w-full rounded-full bg-gradient-to-r from-aurora-violet to-aurora-fuchsia p-3 font-semibold disabled:opacity-50">{busy ? "Veuillez patienter…" : mode === "login" ? "Se connecter" : "S'inscrire"}</button>
        </form>
        {message && <p role="status" className="mt-4 text-sm text-aurora-cyan">{message}</p>}
        <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setMessage(""); }} className="mt-5 text-sm text-white/70 underline">{mode === "login" ? "Créer un compte" : "Déjà inscrit ? Se connecter"}</button>
      </motion.div>
    </main>
  );
}
