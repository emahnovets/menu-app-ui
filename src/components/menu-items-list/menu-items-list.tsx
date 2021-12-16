import { MENU_ITEMS_QUERY } from 'consts/queries.consts';
import { fetchMenuItems } from 'queries/fetch-menu-items';
import { useQuery } from 'react-query';

export const MenuItemsList = () => {
  const {
    data: paginatedData,
    isLoading,
    isError,
  } = useQuery(MENU_ITEMS_QUERY, () => fetchMenuItems({}));

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (isError) {
    return <h1>Error</h1>;
  }

  if (!paginatedData?.data?.length) {
    return <h1>No Items</h1>;
  }

  return (
    <li>
      {paginatedData?.data.map((menuItem) => (
        <li key={menuItem.id}>{menuItem.name}</li>
      ))}
    </li>
  );
};
