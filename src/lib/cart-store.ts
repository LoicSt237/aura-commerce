import { useSyncExternalStore } from "react";
import type { Product } from "./products";

export type CartItem = { product: Product; qty: number };

type State = { items: CartItem[]; wishlist: string[] };

const STORAGE_KEY = "lovable-cart-v1";

let state: State = { items: [], wishlist: [] };
const listeners = new Set<() => void>();

if (typeof window !== "undefined") {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) state = JSON.parse(raw);
  } catch {}
}

function set(next: State) {
  state = next;
  if (typeof window !== "undefined") {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }
  listeners.forEach((l) => l());
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
const getSnapshot = () => state;
const getServerSnapshot = () => ({ items: [], wishlist: [] }) as State;

export function useCart() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export const cart = {
  add(product: Product, qty = 1) {
    const existing = state.items.find((i) => i.product.id === product.id);
    const items = existing
      ? state.items.map((i) => i.product.id === product.id ? { ...i, qty: i.qty + qty } : i)
      : [...state.items, { product, qty }];
    set({ ...state, items });
  },
  remove(id: string) {
    set({ ...state, items: state.items.filter((i) => i.product.id !== id) });
  },
  setQty(id: string, qty: number) {
    if (qty <= 0) return cart.remove(id);
    set({ ...state, items: state.items.map((i) => i.product.id === id ? { ...i, qty } : i) });
  },
  clear() { set({ ...state, items: [] }); },
  toggleWishlist(id: string) {
    const exists = state.wishlist.includes(id);
    set({ ...state, wishlist: exists ? state.wishlist.filter((i) => i !== id) : [...state.wishlist, id] });
  },
};

export const cartTotals = (items: CartItem[]) => {
  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 9.9;
  const tax = subtotal * 0.2;
  return { subtotal, shipping, tax, total: subtotal + shipping + tax, count: items.reduce((s, i) => s + i.qty, 0) };
};

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);
