import { Typography } from '@mui/material';
import {
  Container,
  MessageContainer,
} from 'components/menu-items-list/menu-items-list.styles';
import { MenuItem } from 'types/menu-item.interface';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { useMenuItemsList } from 'components/menu-items-list/__generated__/menu-items-list.query';

interface MenuItemsListProps {
  query?: string;
  isAdminView?: boolean;
  menuItemComponent: React.FC<{ menuItem?: MenuItem; isAdminView?: boolean }>;
}

export const MenuItemsList = ({
  query,
  isAdminView,
  menuItemComponent: MenuItemComponent,
}: MenuItemsListProps): JSX.Element => {
  const { data, loading, error } = useMenuItemsList({ variables: { query } });
  const menuItems = data?.getMenuItems.data ?? [];

  if (loading) {
    return (
      <Container>
        <MenuItemComponent />
      </Container>
    );
  }

  if (error) {
    return (
      <MessageContainer>
        <SentimentDissatisfiedIcon fontSize="large" />
        <Typography>An unknown error ocurred</Typography>
      </MessageContainer>
    );
  }

  if (!menuItems.length) {
    return (
      <MessageContainer>
        <Typography data-cy="no-items-message">No items found</Typography>
      </MessageContainer>
    );
  }

  return (
    <Container>
      {menuItems.map((menuItem) => (
        <MenuItemComponent
          key={menuItem.id}
          menuItem={menuItem}
          isAdminView={isAdminView}
        />
      ))}
    </Container>
  );
};
