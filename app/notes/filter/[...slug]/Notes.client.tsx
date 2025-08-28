"use client";

import css from "./NotesPage.module.css";

import { fetchNotes, FetchNotesResponse } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { useState, useEffect } from "react";

import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";

import { MoonLoader } from "react-spinners";
import { Toaster, toast } from "react-hot-toast";
import { NoteTag } from "@/types/note";
import Link from "next/link";

interface NotesClientProps {
  initialData: FetchNotesResponse;
  tag?: NoteTag | undefined;
}

export default function NotesClient({ initialData, tag }: NotesClientProps) {
  const [searchText, setSearchText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [debouncedSearchText] = useDebounce(searchText, 300);

  const handleSearchText = (newNote: string) => {
    setCurrentPage(1);
    setSearchText(newNote);
  };

  // const handleSearchText = useDebouncedCallback((newNote: string) => {
  //   setCurrentPage(1);
  //   setSearchText(newNote);
  // }, 300);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", debouncedSearchText, currentPage, tag],
    queryFn: () => fetchNotes(debouncedSearchText, currentPage, 12, tag),
    placeholderData: keepPreviousData,
    initialData,
  });

  useEffect(() => {
    if (isError) {
      toast.error("Failed. Please try again.");
    }
  }, [isError]);

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchText} onSearch={handleSearchText} />

        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {isLoading ? (
        <div className={css.loaderWrapper}>
          <MoonLoader color="#007bff" />
        </div>
      ) : notes.length > 0 ? (
        <NoteList notes={notes} />
      ) : (
        <p>No notes found</p>
      )}

      <Toaster />
    </div>
  );
}
