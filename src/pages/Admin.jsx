import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient.js";

const blank = { name: "", price: "", category: "Sneakers", color: "", image_url: "", stock: "0", badge: "" };
export default function Admin() {
  const navigate = useNavigate();
  const [state, setState] = useState("loading");
  const [tab, setTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    let live = true;
    async function load() {
      const { data: auth, error: authError } = await supabase.auth.getUser();
      if (!live) return;
      if (authError || !auth.user) { navigate("/auth", { replace: true }); return; }
      const { data: admin, error: roleError } = await supabase.from("admin_users").select("user_id").eq("user_id", auth.user.id).maybeSingle();
      if (!live) return;
      if (roleError || !admin) { setState("denied"); return; }
      setState("ready");
    }
    load();
    return () => { live = false; };
  }, [navigate]);
  async function refresh() {
    const [p, o] = await Promise.all([
      supabase.from("products").select("*").order("id"),
      supabase.from("orders").select("id,customer_name,customer_email,total,status,created_at").order("created_at", { ascending: false }).limit(100)
    ]);
    if (p.error || o.error) setError(p.error?.message || o.error?.message);
    else { setProducts(p.data); setOrders(o.data); setError(""); }
  }
  useEffect(() => { if (state === "ready") refresh(); }, [state]);
  async function save(event) {
    event.preventDefault(); setBusy(true); setError("");
    const row = { name: form.name.trim(), price: Number(form.price), category: form.category, color: form.color, image_url: form.image_url, stock: Number(form.stock), badge: form.badge || null };
    if (!row.name || !Number.isFinite(row.price) || row.price <= 0 || !Number.isInteger(row.stock) || row.stock < 0) { setError("Vérifie le nom, le prix et le stock."); setBusy(false); return; }
    const result = editing ? await supabase.from("products").update(row).eq("id", editing) : await supabase.from("products").insert(row);
    setBusy(false);
    if (result.error) setError(result.error.message);
    else { setEditing(null); setForm(blank); refresh(); }
  }
  async function updateStatus(id, status) {
    const { error: err } = await supabase.from("orders").update({ status }).eq("id", id);
    if (err) setError(err.message); else refresh();
  }
  async function signOut() { await supabase.auth.signOut(); navigate("/auth", { replace: true }); }
  if (state === "loading") return <main className="relative z-10 min-h-screen px-6 pt-36 text-center">Vérification des droits…</main>;
  if (state === "denied") return <main className="relative z-10 mx-auto min-h-screen max-w-lg px-6 pt-36 text-center"><h1 className="text-3xl font-bold">Accès administrateur refusé</h1><p className="mt-4 text-white/60">Ton compte doit être confirmé puis ajouté à la liste des administrateurs.</p><button onClick={signOut} className="mt-6 text-aurora-cyan underline">Changer de compte</button></main>;
  return <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 mx-auto min-h-screen max-w-7xl px-4 pb-20 pt-32 sm:px-6">
    <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-aurora-fuchsia">NOVA / Back-office</p><h1 className="font-display text-3xl font-bold">Tableau de bord</h1></div><div className="flex gap-4 text-sm"><Link to="/" className="rounded-full glass px-4 py-2">Voir le site</Link><button onClick={signOut} className="rounded-full glass px-4 py-2">Déconnexion</button></div></div>
    <div className="mt-8 grid grid-cols-2 gap-4"><div className="rounded-2xl glass p-5">Produits <strong className="block text-3xl">{products.length}</strong></div><div className="rounded-2xl glass p-5">Commandes <strong className="block text-3xl">{orders.length}</strong></div></div>
    <div className="mt-8 flex gap-3">{["products", "orders"].map(t => <button key={t} onClick={() => setTab(t)} className={`rounded-full px-5 py-2 ${tab === t ? "bg-aurora-violet" : "glass"}`}>{t === "products" ? "Produits" : "Commandes"}</button>)}</div>
    {error && <p role="alert" className="mt-5 rounded-xl bg-red-500/20 p-4 text-red-200">{error}</p>}
    {tab === "products" ? <div className="mt-6 grid gap-6 lg:grid-cols-[360px_1fr]">
      <form onSubmit={save} className="h-fit space-y-3 rounded-2xl glass p-5"><h2 className="font-semibold">{editing ? "Modifier le produit" : "Ajouter un produit"}</h2>{["name", "price", "color", "image_url", "stock", "badge"].map(key => <label key={key} className="block text-sm">{key}<input type={key === "price" || key === "stock" ? "number" : "text"} step={key === "price" ? "0.01" : undefined} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} className="mt-1 w-full rounded-lg bg-white/10 p-2" /></label>)}<label className="block text-sm">Catégorie<select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="mt-1 w-full rounded-lg bg-obsidian p-2">{["Sneakers", "Vêtements", "Accessoires", "Sacs"].map(c => <option key={c}>{c}</option>)}</select></label><button disabled={busy} className="w-full rounded-full bg-aurora-violet p-3 disabled:opacity-50">Enregistrer</button>{editing && <button type="button" onClick={() => { setEditing(null); setForm(blank); }} className="w-full text-sm">Annuler</button>}</form>
      <div className="space-y-3">{products.map(p => <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl glass p-4"><div><p className="font-semibold">{p.name}</p><p className="text-sm text-white/60">{p.category} · ${p.price} · Stock {p.stock}</p></div><button onClick={() => { setEditing(p.id); setForm({ name: p.name, price: String(p.price), category: p.category, color: p.color || "", image_url: p.image_url || "", stock: String(p.stock ?? 0), badge: p.badge || "" }); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="rounded-full glass px-4 py-2 text-sm">Modifier</button></div>)}</div>
    </div> : <div className="mt-6 space-y-3">{orders.map(o => <div key={o.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl glass p-4"><div><p className="font-semibold">Commande #{o.id} · {o.customer_name}</p><p className="text-sm text-white/60">{o.customer_email} · ${o.total} · {new Date(o.created_at).toLocaleDateString("fr-FR")}</p></div><select value={o.status} onChange={e => updateStatus(o.id, e.target.value)} className="rounded-lg bg-obsidian p-2">{["pending", "processing", "shipped", "completed", "cancelled"].map(s => <option key={s} value={s}>{s}</option>)}</select></div>)}</div>}
  </motion.main>;
}
