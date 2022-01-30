import { useApolloClient } from '@apollo/client';
import { CurrentUserDocument } from 'components/user-context/__generated__/current-user.query';
import { ACCESS_TOKEN_KEY } from 'consts/localStorage.consts';
import { login } from 'queries/login';
import { FormEvent, FormEventHandler, useCallback } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

export const useFormSubmitHandler = (): [
  handleSubmit: FormEventHandler,
  isLoading: boolean,
  isError: boolean,
] => {
  const navigate = useNavigate();
  const client = useApolloClient();
  const { mutate, isLoading, isError } = useMutation(login, {
    onSuccess: (data) => {
      localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
      client.resetStore();
      client.refetchQueries({ include: [CurrentUserDocument] });

      navigate('/');
    },
  });
  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const data = new FormData(event.currentTarget);

      mutate({
        email: data.get('email') as string,
        password: data.get('password') as string,
      });
    },
    [mutate],
  );

  return [handleSubmit, isLoading, isError];
};
