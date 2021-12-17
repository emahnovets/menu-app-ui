import { Container } from 'components/menu-items-list/menu-items-list.styles';
import { MENU_ITEMS_QUERY } from 'consts/queries.consts';
import { fetchMenuItems } from 'queries/fetch-menu-items';
import { useQuery } from 'react-query';
import { MenuItem } from 'types/menu-item.interface';

interface MenuItemsListProps {
  menuItemComponent: React.FC<{ menuItem?: MenuItem }>;
}

export const MenuItemsList = ({
  menuItemComponent: MenuItemComponent,
}: MenuItemsListProps): JSX.Element => {
  const {
    data: paginatedData,
    isLoading,
    isError,
  } = useQuery(MENU_ITEMS_QUERY, () => fetchMenuItems({}));

  if (isLoading) {
    return (
      <Container>
        <MenuItemComponent />
      </Container>
    );
  }

  if (isError) {
    return <h1>Error</h1>;
  }

  if (!paginatedData?.data?.length) {
    return <h1>No Items</h1>;
  }

  return (
    <Container>
      {paginatedData?.data.map((menuItem) => (
        <MenuItemComponent menuItem={menuItem} />
      ))}
    </Container>
  );
};
