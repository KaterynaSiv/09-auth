export interface User {
  email: string;
  password: string;
  avatar: string;
}

export interface UserProfile {
  username: string;
  email: string;
  avatar: string;
}

export interface RegisterLoginUserData {
  username: string;
  email: string;
}

export type RequestUserData = {
  email: string;
  password: string;
};

export interface CheckSessionResponse {
  success: boolean;
}
