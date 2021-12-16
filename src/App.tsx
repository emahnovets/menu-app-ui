import { QueryClient } from 'components/query-client';
import { BrowserRouter } from 'react-router-dom';
import { Router } from 'components/router';

export const App = () => {
  return (
    <QueryClient>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </QueryClient>
  );
};
