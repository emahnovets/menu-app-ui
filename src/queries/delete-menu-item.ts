import { getHeaders } from 'utils/get-headers.util';

export async function deleteMenuItem(id: number): Promise<void> {
  const url = `${process.env.REACT_APP_API_URL}/v1/admin/menu-items/${id}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw Error(response.statusText);
  }
}
