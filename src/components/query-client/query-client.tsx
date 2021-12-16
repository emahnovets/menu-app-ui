import React from 'react';
import {
  QueryClient as ReactQueryClient,
  QueryClientProvider,
} from 'react-query';

const queryClient = new ReactQueryClient();

export const QueryClient = ({ children }: React.PropsWithChildren<{}>) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
