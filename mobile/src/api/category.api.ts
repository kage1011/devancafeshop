import axios from 'axios';
import { API_URL } from './config';

export interface Category {
  name: string;
  description: string;
  image: string;
  status: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
}



export interface CategoryRequest {}

export interface CategoryResponse {
  categories: Category[];
}

export const getCategory = async (): Promise<CategoryResponse> => {
  const response = await axios.post<CategoryResponse>(
    `${API_URL}/categories`,
  );
  return response.data;
};

// Create

export interface CreateCategoryRequest {
  name: string;
  description: string;
  image: string;
  status: boolean;
}


export interface CreateResponse {
  category : Category;
}

export const createCategory = async (data: CreateCategoryRequest): Promise<CreateResponse> => {
  const response = await axios.post<CreateResponse>(
    `${API_URL}/categories`,
    data,
  );
  return response.data;
};
