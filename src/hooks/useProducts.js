import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient.js";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: true });

      if (!isMounted) return;

      if (error) {
        setError(error.message);
      } else {
        const mapped = data.map((p) => ({
          id: p.id,
          name: p.name,
          price: Number(p.price),
          category: p.category,
          color: p.color,
          rating: Number(p.rating),
          image: p.image_url,
          badge: p.badge
        }));
        setProducts(mapped);
      }
      setLoading(false);
    }

    fetchProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  return { products, loading, error };
}
