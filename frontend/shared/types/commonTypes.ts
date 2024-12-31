export interface UsersData {
  username: string;
  id: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  status: boolean;
}

export interface UserState {
  name: string;
  userId: number;
  email: string;
  role: string;
}

export interface AuthState {
  accessToken: string | null;
  user: UserState | null;
  isAuthenticated: boolean;
}
