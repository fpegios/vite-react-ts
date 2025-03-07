import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPosts } from '../services/posts';

export const usePosts = (limit: number) => {
  return useInfiniteQuery({
    queryKey: ['posts', limit], // Add `limit` to queryKey to refetch if it changes
    queryFn: ({ pageParam = 1 }) => fetchPosts({ pageParam, limit }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => (lastPage.length ? pages.length + 1 : undefined),
  });
};
