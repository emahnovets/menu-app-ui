import { MenuItem } from 'types/menu-item.interface';

import { MenuItemCardView } from 'components/menu-item-card/menu-item-card-view';
import { MenuItemCardSkeleton } from 'components/menu-item-card/menu-item-card-skeleton';

interface MenuItemCardProps {
  menuItem?: MenuItem;
}

export const MenuItemCard = ({ menuItem }: MenuItemCardProps) => {
  if (!menuItem) {
    return <MenuItemCardSkeleton />;
  }

  return <MenuItemCardView menuItem={menuItem} />;
};
