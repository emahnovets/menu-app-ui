export interface MenuItem {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  isActive: boolean;
  price: number;
  currency: string;
}
