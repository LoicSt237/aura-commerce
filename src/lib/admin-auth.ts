import { useSyncExternalStore } from "react";

type AdminAuthState = { vendorUnlocked: boolean; adminUnlocked: boolean };

const STORAGE_KEY = "aura-admin-auth-v1";
const PASSWORD = "LumiereStore0ne";

let state: AdminAuthState = { vendorUnlocked: false, adminUnlocked: false };
const listeners = new Set<() => void>();

if (typeof window !== "undefined") {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) state = JSON.parse(raw);
  } catch {}
}

function set(next: AdminAuthState) {
  state = next;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }
  listeners.forEach((l) => l());
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

const getSnapshot = () => state;
const getServerSnapshot = () => ({ vendorUnlocked: false, adminUnlocked: false }) as AdminAuthState;

export function useAdminAuth() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export const adminAuth = {
  unlockVendor(password: string) {
    if (password === PASSWORD) {
      set({ ...state, vendorUnlocked: true });
      return true;
    }
    return false;
  },
  unlockAdmin(password: string) {
    if (password === PASSWORD) {
      set({ ...state, adminUnlocked: true });
      return true;
    }
    return false;
  },
  lockVendor() {
    set({ ...state, vendorUnlocked: false });
  },
  lockAdmin() {
    set({ ...state, adminUnlocked: false });
  },
};
