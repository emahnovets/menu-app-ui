import { QueryClient } from 'components/query-client';
import { BrowserRouter } from 'react-router-dom';
import { Router } from 'components/router';
import { UserContextProvider } from 'components/user-context';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_API_URL}/graphql`,
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
