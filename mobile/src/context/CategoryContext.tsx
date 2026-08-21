import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Category } from '../types/order.types';
import { getCategory } from '../api/category.api';
interface CategoryContextType {
  category: Category | null;
  isLoading: boolean;
  loadCategory: () => Promise<void>;
//   saveCategory: (id: string, name: string) => Promise<void>;
//   updateCategory: (id: string, name: string) => Promise<void>;
//   deleteCategory: (id: string) => Promise<void>;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadCategory = async () => {
    try {
      setIsLoading(true);
      const response = await getCategory();
      setCategory(response.data);
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
