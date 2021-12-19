import { stringify } from 'qs';
import { MenuItem } from 'types/menu-item.interface';
import { Paginated } from 'types/paginated-response.interface';
import { getHeaders } from 'utils/get-headers.util';
import { FetchMenuItemsQuery } from '../types/fetch-menu-items.query.interface';

export async function fetchMenuItems(
  params: FetchMenuItemsQuery,
  isAdminView?: boolean,
): Promise<Paginated<MenuItem>> {
  const path = isAdminView ? '/v1/admin/menu-items' : '/v1/menu-items';
  const url = `${process.env.REACT_APP_API_URL}${path}${stringify(params, {
    skipNulls: true,
    addQueryPrefix: true,
  })}`;
  const response = await fetch(url, {
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw Error(response.statusText);
  }

  return await response.json();
}
