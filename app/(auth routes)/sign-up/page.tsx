"use client";

import { RequestUserData } from "@/types/user";
import css from "./SignUpPage.module.css";
import { register } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useAuthZustandStore } from "@/lib/store/authStore";
import { useState } from "react";
import { ApiError } from "@/lib/api/api";

export default function SignUp() {
  const router = useRouter();
  const setUser = useAuthZustandStore((state) => state.setUser);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (formData: FormData) => {
    try {
      const data = Object.fromEntries(formData) as RequestUserData;
      const response = await register(data);

      if (response) {
        setUser(response);
        router.push("/profile");
      } else {
        setError("Wrong email of password");
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          "Something went wrong"
      );
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

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
