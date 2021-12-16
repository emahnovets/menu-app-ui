import { QueryClient } from 'components/query-client';
import { BrowserRouter } from 'react-router-dom';
import { Router } from 'components/router';
import { UserContextProvider } from 'components/user-context';

export const App = () => {
  return (
    <QueryClient>
      <UserContextProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </UserContextProvider>
    </QueryClient>
  );
};
