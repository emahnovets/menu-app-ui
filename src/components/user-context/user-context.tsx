import { UserContext } from 'components/user-context/user.context';
import { useCurrentUser } from 'components/user-context/__generated__/current-user.query';
import { PropsWithChildren } from 'react';

export const UserContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const { data, error } = useCurrentUser({ errorPolicy: 'ignore' });

  const value = error ? null : data?.currentUser;

  return (
    <UserContext.Provider value={value ?? null}>
      {children}
    </UserContext.Provider>
  );
};
