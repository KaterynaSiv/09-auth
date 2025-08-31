"use client";

import Image from "next/image";
import css from "./EditPage.module.css";
import { useRouter } from "next/navigation";
import { useAuthZustandStore } from "@/lib/store/authStore";
import { updateUserProfile } from "@/lib/api/clientApi";
import { useEffect, useState } from "react";
import { User } from "@/types/user";

export default function EditProfile() {
  const router = useRouter();
  const user = useAuthZustandStore((state) => state.user);
  const setUser = useAuthZustandStore((state) => state.setUser);

  const [username, setUsername] = useState(user?.username || "");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.username) {
      setUsername(user.username);
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    try {
      const updatedProfile: User = await updateUserProfile({ username });
      setUser(updatedProfile);
      router.push("/profile");
    } catch (error) {
      console.error("Failed to update user", error);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleCancel = () => router.push("/profile");

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={
            user.avatar ||
            "https://ac.goit.global/fullstack/react/default-avatar.jpg"
          }
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form onSubmit={handleSave} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <p>Email: {user.email}</p>

          {error && <p className={css.error}>{error}</p>}

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
