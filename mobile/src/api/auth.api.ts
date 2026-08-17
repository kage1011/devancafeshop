import axios from 'axios';
import { API_URL } from './config';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginUser {
  id: number;
  username: string;
  fullName: string;
  role: 'ADMIN' | 'STAFF' | 'CUSTOMER';
}

export interface LoginResponse {
  accessToken: string;
  user: LoginUser;
}

export const login = async (
  data: LoginRequest
): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
    `${API_URL}/auth/login`,
    data
  );

  return response.data;
};