import { UserDto } from 'types/user-dto.interface';
import { getHeaders } from 'utils/get-headers.util';

export async function fetchCurrentUser(): Promise<UserDto> {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/v1/users/current`,
    {
      headers: getHeaders(),
    },
  );

  if (!response.ok) {
    throw Error(response.statusText);
  }

  return await response.json();
}
