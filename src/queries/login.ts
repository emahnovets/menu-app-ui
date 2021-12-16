import { AccessTokenResponse } from 'types/access-token-response.interface';
import { LoginDto } from 'types/login-dto.interface';
import { getHeaders } from 'utils/get-headers.util';

export async function login(payload: LoginDto): Promise<AccessTokenResponse> {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/v1/auth/login`,
    {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: getHeaders(),
    },
  );

  if (!response.ok) {
    throw Error(response.statusText);
  }

  return await response.json();
}
