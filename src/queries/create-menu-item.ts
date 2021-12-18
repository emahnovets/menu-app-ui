import { MenuItem } from 'types/menu-item.interface';
import { getHeaders } from 'utils/get-headers.util';

export async function createMenuItem(
  values: Partial<MenuItem>,
): Promise<MenuItem> {
  const url = `${process.env.REACT_APP_API_URL}/v1/admin/menu-items`;
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw Error(response.statusText);
  }

  return await response.json();
}
