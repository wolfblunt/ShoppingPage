import React from 'react';
import VirtualTable from '../components/VirtualTable';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const Home: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <VirtualTable />
    </QueryClientProvider>
  );
};

export default Home;
