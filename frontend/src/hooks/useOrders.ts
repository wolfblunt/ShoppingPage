import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchOrders = async ({
  pageParam = 0,
  queryKey,
}: {
  pageParam: number;
  queryKey: any[];
}) => {
  const [, { limit, sort, sortDirection }] = queryKey;
  const response = await axios.get(
    `http://localhost:3002/api/orders?cursor=${pageParam}&limit=${limit}&sort=${sort}&sortDirection=${sortDirection}`
  );
  return response.data;
};

export const useOrders = ({
  limit,
  sort,
  sortDirection,
}: {
  limit: number;
  sort: string;
  sortDirection: 'asc' | 'desc';
}) =>
  useInfiniteQuery({
    queryKey: ['orders', { limit, sort, sortDirection }],
    queryFn: fetchOrders,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,
  });
