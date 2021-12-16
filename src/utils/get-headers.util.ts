import {
  AUTHORIZATION_HEADER,
  CONTENT_TYPE_HEADER,
  JSON_CONTENT,
  TOKEN_TYPE,
} from 'consts/headers.consts';
import { ACCESS_TOKEN_KEY } from 'consts/localStorage.consts';

export const getHeaders = (): Record<string, string> => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

  return {
    [CONTENT_TYPE_HEADER]: JSON_CONTENT,
    ...(accessToken && {
      [AUTHORIZATION_HEADER]: `${TOKEN_TYPE} ${accessToken}`,
    }),
  };
};
