import { FetchNotesResponse, NewNote, Note, NoteTag } from "@/types/note";
import { api } from "./api";
import { cookies } from "next/headers";
import { CheckSessionResponse, UpdateUserProfile, User } from "@/types/user";

//----------------------------------------------

export const fetchNotesServer = async (
  search: string,
  page: number,
  perPage: number,
  tag?: NoteTag
): Promise<FetchNotesResponse> => {
  const cookiesData = await cookies();
  const { data } = await api.get<FetchNotesResponse>("/notes", {
    params: {
      ...(search !== "" && { search: search }),
      ...(tag && { tag }),
      page,
      perPage,
    },
    headers: {
      Cookie: cookiesData.toString(),
    },
  });
  return data;
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

//--------------------

export const getUserProfileServer = async (): Promise<User> => {
  const cookiesData = await cookies();
  const { data } = await api.get<User>("/users/me", {
    headers: {
      Cookie: cookiesData.toString(),
    },
  });
  return data;
};

export const updateUserProfileServer = async (
  updatedData: UpdateUserProfile
): Promise<User> => {
  const cookiesData = await cookies();
  const { data } = await api.patch<User>("/users/me", updatedData, {
    headers: {
      Cookie: cookiesData.toString(),
    },
  });
  return data;
};

//--------------------

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
