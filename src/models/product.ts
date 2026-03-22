export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
}

export interface Product extends CreateProductDto {
  id: string;
}
