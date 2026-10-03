export interface Product {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  material: string;
  price: number;
  category: 'Rings' | 'Necklaces' | 'Talismans';
  metal: 'Oxidized Silver' | 'Blackened Bronze' | 'Graphite Silver';
  weight: string;
  purity: string;
  description: string;
  story: string;
  details: string[];
  image: string;
  gallery: string[];
  sizes: number[];
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  size: number;
  quantity: number;
}
