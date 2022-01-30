export interface MenuItem {
  id: number;
  name: string;
  description?: string | null;
  imageUrl?: string;
  isActive: boolean;
  price: number;
  currency: string;
}
