import { FetchNotesResponse, NewNote, Note, NoteTag } from "@/types/note";
import { api } from "./api";
import {
  CheckSessionResponse,
  RequestUserData,
  UpdateUserProfile,
  User,
} from "@/types/user";

//----------------------------------------------

export const fetchNotes = async (
  search: string,
  page: number,
  perPage: number,
  tag?: NoteTag
): Promise<FetchNotesResponse> => {
  const { data } = await api.get<FetchNotesResponse>("/notes", {
    params: {
      ...(search !== "" && { search: search }),
      ...(tag && { tag }),
      page,
      perPage,
    },
  });
  return data;
};

export const createNote = async (newNote: NewNote): Promise<NewNote> => {
  const { data } = await api.post<NewNote>("/notes", newNote);
  return data;
};

// export const editNote = async (note: {
//   noteId: string;
//   title: string;
//   content: string;
//   tag: NoteTag[];
// }): Promise<Note> => {
//   const { data } = await api.patch<Note>(`/notes/${note.noteId}`, note);
//   return data;
// };

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${noteId}`);
  return data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${noteId}`);
  return data;
};

//--------------------

export const getUserProfile = async (): Promise<User> => {
  const { data } = await api.get<User>("/users/me");
  return data;
};

export const updateUserProfile = async (
  updatedData: UpdateUserProfile
): Promise<User> => {
  const { data } = await api.patch<User>("/users/me", updatedData);
  return data;
};

//--------------------

export const login = async (payload: RequestUserData): Promise<User> => {
  const { data } = await api.post<User>("/auth/login", payload);
  return data;
};

export const register = async (payload: RequestUserData): Promise<User> => {
  const { data } = await api.post<User>("/auth/register", payload);
  return data;
};

export const logout = async (): Promise<void> => {
  const { data } = await api.post("/auth/logout");
  return data;
};

export const checkSession = async (): Promise<boolean> => {
  const { data } = await api.get<CheckSessionResponse>("/auth/session");
  return data.success;
};
