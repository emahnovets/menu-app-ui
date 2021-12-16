import { UserContext } from 'components/user-context/user.context';
import { CURRENT_USER_QUERY } from 'consts/queries.consts';
import { fetchCurrentUser } from 'queries/fetch-current-user';
import { PropsWithChildren } from 'react';
import { useQuery } from 'react-query';

export const UserContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const { data, isSuccess } = useQuery(CURRENT_USER_QUERY, fetchCurrentUser);

  const value = isSuccess ? data : null;

  return (
    <UserContext.Provider value={value ?? null}>
      {children}
    </UserContext.Provider>
  );
};
