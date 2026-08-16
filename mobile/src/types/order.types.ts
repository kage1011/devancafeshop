export interface Category {
  id: number;
  name: string;
  nameEn: string;
}

export interface Product {
  id: number;
  categoryId: number;
  name: string;
  nameEn: string;
  description?: string;
  descriptionEn?: string;
  price: number;
  image: string;

  isSoldOut: boolean;
  isHot: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}