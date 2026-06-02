import { useSyncExternalStore } from "react";

type AuthState = { loggedIn: boolean; email?: string };

const STORAGE_KEY = "aura-auth-v1";
let state: AuthState = { loggedIn: false };
const listeners = new Set<() => void>();

if (typeof window !== "undefined") {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) state = JSON.parse(raw);
  } catch {}
}

function set(next: AuthState) {
  state = next;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }
  listeners.forEach((listener) => listener());
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getSnapshot = () => state;
const getServerSnapshot = () => ({ loggedIn: false }) as AuthState;

export function useAuth() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export const auth = {
  login(email: string) {
    set({ loggedIn: true, email });
  },
  logout() {
    set({ loggedIn: false });
  },
};
