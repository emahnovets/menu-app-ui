import { ACCESS_TOKEN_KEY } from 'consts/localStorage.consts';
import { CURRENT_USER_QUERY } from 'consts/queries.consts';
import { login } from 'queries/login';
import { FormEvent, FormEventHandler, useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

export const useFormSubmitHandler = (): [
  handleSubmit: FormEventHandler,
  isLoading: boolean,
] => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(login, {
    onSuccess: (data) => {
      localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
      queryClient.invalidateQueries(CURRENT_USER_QUERY);

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

  return [handleSubmit, isLoading];
};
