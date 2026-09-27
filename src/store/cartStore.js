import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  items: [],
  isOpen: false,
  toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),
  closeCart: () => set({ isOpen: false }),
  addItem: (product) =>
    set((s) => {
      const existing = s.items.find((i) => i.id === product.id);
      if (existing) {
        return {
          items: s.items.map((i) =>
            i.id === product.id ? { ...i, qty: i.qty + 1 } : i
          ),
          isOpen: true
        };
      }
      return { items: [...s.items, { ...product, qty: 1 }], isOpen: true };
    }),
  removeItem: (id) =>
    set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
  updateQty: (id, qty) =>
    set((s) => ({
      items: s.items
        .map((i) => (i.id === id ? { ...i, qty } : i))
        .filter((i) => i.qty > 0)
    })),
  clearCart: () => set({ items: [] }),
  total: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
  count: () => get().items.reduce((sum, i) => sum + i.qty, 0)
}));
