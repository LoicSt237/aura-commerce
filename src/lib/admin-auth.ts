import { useSyncExternalStore } from "react";

type AdminAuthState = { vendorUnlocked: boolean; adminUnlocked: boolean };

const PASSWORD = "LumiereStore0ne";

let state: AdminAuthState = { vendorUnlocked: false, adminUnlocked: false };
const listeners = new Set<() => void>();

function set(next: AdminAuthState) {
  state = next;
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
