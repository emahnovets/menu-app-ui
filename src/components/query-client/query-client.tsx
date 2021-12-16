import React from 'react';
import {
  QueryClient as ReactQueryClient,
  QueryClientProvider,
} from 'react-query';

const queryClient = new ReactQueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
    },
    queries: {
      retry: false,
    },
  },
});

export const QueryClient = ({ children }: React.PropsWithChildren<{}>) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
