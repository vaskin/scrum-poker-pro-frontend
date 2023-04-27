import './assets/fonts/index.css';

import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

import { PrivateRoutes } from './routes/PrivateRoutes';
import { theme } from './theme/theme';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <PrivateRoutes />
        </QueryClientProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
