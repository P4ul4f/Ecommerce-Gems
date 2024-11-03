// src/types/product.ts
export interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  rating: number;
  numReview: number;
  price: number;
  countInStock: number;
  // Agrega otros campos si es necesario
}
