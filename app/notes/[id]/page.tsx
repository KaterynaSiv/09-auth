import { fetchNoteById } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";

type NoteProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: NoteProps): Promise<Metadata> {
  const { id } = await params;

  const note = await fetchNoteById(id);

  return {
    title: `Note: ${note.title.slice(0, 15)} ...`,
    description: `${note.content.slice(0, 30)} ...`,
    openGraph: {
      title: `Note: ${note.title.slice(0, 15)} ...`,
      description: `${note.content.slice(0, 30)} ...`,
      url: `https://notehub.com/notes/${note.id}`,
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

export default async function NoteDetails({ params }: NoteProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
