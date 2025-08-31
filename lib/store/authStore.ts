import { User } from "@/types/user";
import { create } from "zustand";

type AuthUserZustandStore = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
};

export const useAuthZustandStore = create<AuthUserZustandStore>()((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: User) => set({ isAuthenticated: true, user }),
  clearIsAuthenticated: () => set({ isAuthenticated: false, user: null }),
}));
