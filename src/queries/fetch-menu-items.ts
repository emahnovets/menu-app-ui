import { stringify } from 'qs';
import { FetchMenuItemsQuery } from '../types/fetch-menu-items.query.interface';
import { MenuItem } from '../types/menu-item.interface';
import { Paginated } from '../types/paginated-response.interface';

export async function fetchMenuItems(
  params: FetchMenuItemsQuery,
): Promise<Paginated<MenuItem>> {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/v1/menu-items?${stringify(params)}`,
  );
  const data = await response.json();

  return data;
}
