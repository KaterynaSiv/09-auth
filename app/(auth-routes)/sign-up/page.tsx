"use client";

import { RequestUserData } from "@/types/user";
import css from "./SignUpPage.module.css";
import { register } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useAuthZustandStore } from "@/lib/store/authStore";

export default function SignUp() {
  const router = useRouter();
  const setUser = useAuthZustandStore((state) => state.setUser);

  const handleRegister = async (formData: FormData) => {
    const data = Object.fromEntries(formData) as RequestUserData;
    const response = await register(data);
    if (response) {
      setUser(response);
      router.push("/profile");
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form action={handleRegister} className={css.form}>
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
            Register
          </button>
        </div>

        <p className={css.error}>Error</p>
      </form>
    </main>
  );
}
