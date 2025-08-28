import { Metadata } from "next";
import css from "./page.module.css";

export const metadata: Metadata = {
  title: "NoteHub app - Page Not Found",
  description:
    "The page you are looking for does not exist or was not found. Please check url and explore NoteHub app to organize your thoughts.",
  openGraph: {
    title: "NoteHub app - Page Not Found",
    description:
      "The page you are looking for does not exist or was not found. Please check url and explore NoteHub app to organize your thoughts.",
    url: "https://notehub.com/not-found",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub App Preview",
      },
    ],
    type: "website",
  },
};

export default function NotFound() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
