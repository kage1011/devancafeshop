import axios from 'axios';
import { API_URL } from './config';

export interface CategoryRequest {
}

export interface CategoryResponse {
  id: number;
  name: string;
}


export interface CategoryResponseAll {
  success: boolean;
  message: string;
  data: CategoryResponse;
}

export const getCategory = async (): Promise<CategoryResponseAll> => {
  const response = await axios.post<CategoryResponseAll>(
    `${API_URL}/categories`
  );
  return response.data;
};