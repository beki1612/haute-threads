export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'Men' | 'Women' | 'Accessories';
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}