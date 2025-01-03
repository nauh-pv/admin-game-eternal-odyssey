export interface UsersData {
  username: string;
  id: string;
  email: string;
  role: string;
  createdAt: string;
  status: string;
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

export interface UserDataUpdate {
  username?: string;
  email?: string;
  role?: string;
  status?: string;
  password?: string;
}

export interface WorldData {
  worldID: string;
  name: string;
  status: number;
  startAt: string;
  endAt: string;
  code: string;
}

export interface QuestData {
  worldID: string;
  name: string;
  status: number;
  startAt: string;
  endAt: string;
  code: string;
}
