import { FetchNotesResponse, NewNote, Note, NoteTag } from "@/types/note";
import { api } from "./api";
import { cookies } from "next/headers";
import { CheckSessionResponse, UserProfile } from "@/types/user";

//----------------------------------------------

export const fetchNotesServer = async (
  search: string = "",
  page: number = 1,
  perPage: number = 12,
  tag?: NoteTag
): Promise<FetchNotesResponse> => {
  const cookiesData = await cookies();
  const { data: raw } = await api.get<FetchNotesResponse>("/notes", {
    params: {
      ...(search !== "" && { search }),
      page,
      perPage,
      ...(tag && { tag }),
    },
    headers: {
      Cookie: cookiesData.toString(),
    },
  });
  return { notes: raw.notes, totalPages: raw.totalPages };
};

export const createNoteServer = async (newNote: NewNote): Promise<NewNote> => {
  const cookiesData = await cookies();
  const { data } = await api.post<NewNote>("/notes", newNote, {
    headers: {
      Cookie: cookiesData.toString(),
    },
  });
  return data;
};

// export const editNoteServer = async (note: {
//   noteId: string;
//   title: string;
//   content: string;
//   tag: NoteTag[];
// }): Promise<Note> => {
//   const cookiesData = await cookies();
//   const { data } = await api.patch<Note>(`/notes/${note.noteId}`, note, {
//     headers: {
//       Cookie: cookiesData.toString(),
//     },
//   });

//   return data;
// };

export const fetchNoteByIdServer = async (noteId: string): Promise<Note> => {
  const cookiesData = await cookies();
  const { data } = await api.get<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: cookiesData.toString(),
    },
  });
  return data;
};

export const deleteNoteServer = async (noteId: string): Promise<Note> => {
  const cookiesData = await cookies();
  const { data } = await api.delete<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: cookiesData.toString(),
    },
  });
  return data;
};

export const getUserProfileServer = async (): Promise<UserProfile> => {
  const cookiesData = await cookies();
  const { data } = await api.get<UserProfile>("/users/me", {
    headers: {
      Cookie: cookiesData.toString(),
    },
  });
  return data;
};

export const updateUserProfileServer = async (
  updatedData: UserProfile
): Promise<UserProfile> => {
  const cookiesData = await cookies();
  const { data } = await api.patch<UserProfile>("/users/me", updatedData, {
    headers: {
      Cookie: cookiesData.toString(),
    },
  });
  return data;
};

export const logoutServer = async (): Promise<void> => {
  const cookiesData = await cookies();
  await api.post("/auth/logout", null, {
    headers: {
      Cookie: cookiesData.toString(),
    },
  });
};

export const checkSessionServer = async () => {
  const cookiesData = await cookies();
  const response = await api.get<CheckSessionResponse>("/auth/session", {
    headers: {
      Cookie: cookiesData.toString(),
    },
  });
  return response;
};
