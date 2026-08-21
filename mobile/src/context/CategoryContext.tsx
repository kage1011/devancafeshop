import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Category } from '../types/order.types';
import {
  getCategory,
  Category as CategoryResponse,
  createCategory,
} from '../api/category.api';
interface CategoryContextType {
  category: CategoryResponse[];
  isLoading: boolean;
  loadCategory: () => Promise<void>;
  createCategory: (
    name: string,
    description: string,
    image: string,
    status: boolean,
  ) => Promise<void>;
  //   updateCategory: (id: string, name: string) => Promise<void>;
  //   deleteCategory: (id: string) => Promise<void>;
}

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined,
);

export const CategoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [category, setCategory] = useState<CategoryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadCategory = async () => {
    try {
      setIsLoading(true);
      const response = await getCategory();
      setCategory(response.categories);
      setIsLoading(false);
    } catch (error) {
      console.log('Login error:', error);

      throw error;
    }
  };

  const handleCreateCategory = async (
    name: string,
    description: string,
    image: string,
    status: boolean,
  ) => {
    try {
      setIsLoading(true);
      const response = await createCategory({
        name,
        description,
        image,
        status,
      });
      if (response.category && response.category._id) {
        loadCategory(); // Reload categories after creating a new one
      }
      setIsLoading(false);
    } catch (error) {
      console.log('Login error:', error);
      throw error;
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        category,
        isLoading,
        loadCategory,
        createCategory: handleCreateCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategory must be used inside CategoryProvider');
  }
  return context;
};
