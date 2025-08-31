"use client";

import { useRouter } from "next/navigation";
import css from "./SignInPage.module.css";
import { useAuthZustandStore } from "@/lib/store/authStore";
import { RequestUserData } from "@/types/user";
import { login } from "@/lib/api/clientApi";

export default function SignIn() {
  const router = useRouter();
  const setUser = useAuthZustandStore((state) => state.setUser);

  const handleLogin = async (formData: FormData) => {
    const data = Object.fromEntries(formData) as RequestUserData;
    const user = await login(data);
    if (user) {
      setUser(user);
      router.push("/profile");
    }
  };

  return (
    <main className={css.mainContent}>
      <form action={handleLogin} className={css.form}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {/* <p className={css.error}>{error}</p> */}
      </form>
    </main>
  );
}
