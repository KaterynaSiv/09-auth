export interface User {
  username: string;
  email: string;
  avatar: string;
}

export type RequestUserData = {
  email: string;
  password: string;
};

export interface CheckSessionResponse {
  success: boolean;
}

export type UpdateUserProfile = {
  username: string;
};
