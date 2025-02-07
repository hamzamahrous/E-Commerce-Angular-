export interface cart {
  userId: number;
  date: Date;
  products: { productId: number; quantity: number }[];
}
