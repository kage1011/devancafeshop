export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  categoryId: number;
  name: string;
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