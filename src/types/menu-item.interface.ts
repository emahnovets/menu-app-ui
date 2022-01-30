export interface MenuItem {
  id: number;
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  isActive: boolean;
  price: number;
  currency: string;
}
