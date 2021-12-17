import { MenuItemCard } from 'components/menu-item-card';
import { MenuItemsList } from 'components/menu-items-list/menu-items-list';

export const HomePage = () => (
  <MenuItemsList menuItemComponent={MenuItemCard} />
);
