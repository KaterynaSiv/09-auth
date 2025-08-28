import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { NoteTag } from "@/types/note";
import { Metadata } from "next";

type NotesPageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({
  params,
}: NotesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] === "All" ? undefined : (slug[0] as NoteTag);

  return {
    title: `Notes category: ${tag}`,
    description: `See your personal ${tag} notes`,
    openGraph: {
      title: `Notes category: ${tag}`,
      description: `See your personal ${tag} notes`,
      url: `https://notehub.com/notes/filter/${tag}`,
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
}

export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = await params;

  const tag = slug[0] === "All" ? undefined : (slug[0] as NoteTag);

  const initialData = await fetchNotes("", 1, 12, tag);

  return <NotesClient initialData={initialData} tag={tag} />;
}
