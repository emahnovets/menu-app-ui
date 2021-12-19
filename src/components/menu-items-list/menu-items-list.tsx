import { Typography } from '@mui/material';
import {
  Container,
  MessageContainer,
} from 'components/menu-items-list/menu-items-list.styles';
import { MENU_ITEMS_QUERY } from 'consts/queries.consts';
import { fetchMenuItems } from 'queries/fetch-menu-items';
import { useQuery } from 'react-query';
import { MenuItem } from 'types/menu-item.interface';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

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
  const {
    data: paginatedData,
    isLoading,
    isError,
  } = useQuery([MENU_ITEMS_QUERY, query, isAdminView], () =>
    fetchMenuItems(query ? { query } : {}, isAdminView),
  );

  if (isLoading) {
    return (
      <Container>
        <MenuItemComponent />
      </Container>
    );
  }

  if (isError) {
    return (
      <MessageContainer>
        <SentimentDissatisfiedIcon fontSize="large" />
        <Typography>An unknown error ocurred</Typography>
      </MessageContainer>
    );
  }

  if (!paginatedData?.data?.length) {
    return (
      <MessageContainer>
        <Typography>No items found</Typography>
      </MessageContainer>
    );
  }

  return (
    <Container>
      {paginatedData?.data.map((menuItem) => (
        <MenuItemComponent menuItem={menuItem} isAdminView={isAdminView} />
      ))}
    </Container>
  );
};
