import { MenuItem } from 'types/menu-item.interface';
import { getHeaders } from 'utils/get-headers.util';

export async function patchMenuItem({
  id,
  ...values
}: Pick<MenuItem, 'id'> & Partial<MenuItem>): Promise<MenuItem> {
  const url = `${process.env.REACT_APP_API_URL}/v1/admin/menu-items/${id}`;
  const response = await fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(values),
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw Error(response.statusText);
  }

  return await response.json();
}
