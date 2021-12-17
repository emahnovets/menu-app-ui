import { MenuItemCard } from 'components/menu-item-card';
import { MenuItemsList } from 'components/menu-items-list/menu-items-list';
import { Outlet } from 'react-router-dom';

export const HomePage = () => (
  <>
    <MenuItemsList menuItemComponent={MenuItemCard} />
    <Outlet />
  </>
);
