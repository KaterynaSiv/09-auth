import axios, { AxiosError } from "axios";

export const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

export type ApiError = AxiosError<{ error: string }>;

export const api = axios.create({
  baseURL,
  withCredentials: true,
});
