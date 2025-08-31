"use client";

import { checkSession, getUserProfile } from "@/lib/api/clientApi";
import { useAuthZustandStore } from "@/lib/store/authStore";
import { useEffect } from "react";

type ProviderProps = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: ProviderProps) {
  const setUser = useAuthZustandStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthZustandStore(
    (state) => state.clearIsAuthenticated
  );

  useEffect(() => {
    const fetchSession = async () => {
      const response = await checkSession();
      if (response) {
        const user = await getUserProfile();
        setUser(user);
      } else {
        clearIsAuthenticated();
      }
    };
    fetchSession();
  }, [clearIsAuthenticated, setUser]);

  return children;
}
