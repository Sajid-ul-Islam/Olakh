export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  /** Full set of the product's images from the store, in display order. */
  images: string[];
  description: string;
  category: 'bras' | 'bodysuits' | 'bottoms' | 'corsets';
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
}
