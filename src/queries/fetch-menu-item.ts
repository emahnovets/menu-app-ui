import { MenuItem } from 'types/menu-item.interface';
import { getHeaders } from 'utils/get-headers.util';

export async function fetchMenuItem(id: number): Promise<MenuItem> {
  const url = `${process.env.REACT_APP_API_URL}/v1/admin/menu-items/${id}`;
  const response = await fetch(url, {
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw Error(response.statusText);
  }

  return await response.json();
}
