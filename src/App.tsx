import { QueryClient } from 'components/query-client';
import { BrowserRouter } from 'react-router-dom';
import { Router } from 'components/router';
import { UserContextProvider } from 'components/user-context';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ACCESS_TOKEN_KEY } from 'consts/localStorage.consts';
import { stringify } from 'qs';

const customFetch = (uri: string, options: RequestInit) => {
  const { operationName, variables } = JSON.parse(options.body as string);
  return fetch(
    `${uri}${stringify(
      {
        operationName,
        ...variables,
      },
      { skipNulls: true, addQueryPrefix: true },
    )}`,
    options,
  );
};

const httpLink = createHttpLink({
  uri: `${process.env.REACT_APP_API_URL}/graphql`,
  fetch: customFetch,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <QueryClient>
        <UserContextProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </UserContextProvider>
      </QueryClient>
    </ApolloProvider>
  );
};
