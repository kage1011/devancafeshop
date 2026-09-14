import { Category, Product } from '../types/order.types';

export const categories: Category[] = [
  {
    id: 1,
    name: 'Cà phê',
  },
  {
    id: 2,
    name: 'Trà',
  },
  {
    id: 3,
    name: 'Đá xay',
  },
  {
    id: 4,
    name: 'Bánh',
  },
  {
    id: 5,
    name: 'Nước ép',
  },
];

export const products: Product[] = [
  {
    id: 1,
    categoryId: 1,
    name: 'Cà phê sữa',
    description: 'Cà phê đậm đà kết hợp với sữa đặc',
    descriptionEn: 'Strong coffee with condensed milk',
    price: 35000,
    image:
      'https://images.unsplash.com/photo-1572442388796-11668a67e53d',
    isSoldOut: false,
    isHot: true,
  },
  {
    id: 2,
    categoryId: 1,
    name: 'Cà phê đen',
    description: 'Cà phê nguyên chất',
    descriptionEn: 'Pure Vietnamese coffee',
    price: 30000,
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
    isSoldOut: false,
    isHot: false,
  },
  {
    id: 3,
    categoryId: 1,
    name: 'Bạc xỉu',
    description: 'Nhiều sữa, ít cà phê',
    descriptionEn: 'More milk, less coffee',
    price: 40000,
    image:
      'https://images.unsplash.com/photo-1517701604599-bb29b565090c',
    isSoldOut: true,
    isHot: false,
  },
  {
    id: 4,
    categoryId: 2,
    name: 'Trà đào cam sả',
    description: 'Trà đào kết hợp cam và sả',
    descriptionEn: 'Peach tea with orange and lemongrass',
    price: 45000,
    image:
      'https://images.unsplash.com/photo-1556679343-c7306c1976bc',
    isSoldOut: false,
    isHot: true,
  },
  {
    id: 5,
    categoryId: 2,
    name: 'Trà vải',
    description: 'Trà thanh mát với vải',
    descriptionEn: 'Refreshing tea with lychee',
    price: 42000,
    image:
      'https://images.unsplash.com/photo-1544145945-f90425340c7e',
    isSoldOut: false,
    isHot: false,
  },
  {
    id: 6,
    categoryId: 3,
    name: 'Chocolate đá xay',
    price: 55000,
    image:
      'https://images.unsplash.com/photo-1572490122747-3968b75cc699',
    isSoldOut: false,
    isHot: true,
  },
];