import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,       // 5 min — use cache before re-fetching
      gcTime: 10 * 60 * 1000,         // 10 min — keep in memory after unmount
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
