import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addPost, fetchPosts, Post } from '../services/posts';

// Define the specific query key factory to keep it consistent
const POSTS_QUERY_KEY = {
  all: ['posts'] as const,
  list: (limit: number) => [...POSTS_QUERY_KEY.all, { limit }] as const,
  detail: (id: number | string) => [...POSTS_QUERY_KEY.all, { id }] as const,
};

/**
 * Hook to fetch paginated posts
 * @param limit Number of posts per page
 */
export const usePosts = (limit: number) => {
  return useInfiniteQuery({
    queryKey: POSTS_QUERY_KEY.list(limit),
    queryFn: ({ pageParam = 1 }) => fetchPosts({ pageParam, limit }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => 
      lastPage.length === limit ? allPages.length + 1 : undefined,
  });
};

/**
 * Hook to add a new post and update the cache
 */
export const useAddPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addPost,
    onMutate: async (newPostData) => {
      // Generate a temporary ID for optimistic update
      // In production, you might use a library like uuid
      const tempId = Date.now();
      
      // Optimistic post with temporary ID 
      const optimisticPost: Post = {
        id: tempId,
        title: newPostData.title,
        body: newPostData.body,
      };
      
      // Cancel any outgoing refetches to avoid overwriting our optimistic update
      await queryClient.cancelQueries({ queryKey: POSTS_QUERY_KEY.all });
      
      // Get all posts query keys that need to be updated
      const queryCache = queryClient.getQueryCache();
      const postsQueries = queryCache.findAll({ 
        queryKey: POSTS_QUERY_KEY.all,
        exact: false, 
      });
      
      // Store previous values to enable rollback on error
      const previousQueries = postsQueries.map(query => ({
        queryKey: query.queryKey,
        data: queryClient.getQueryData(query.queryKey),
      }));
      
      // Update all related queries with optimistic data
      postsQueries.forEach(query => {
        queryClient.setQueryData(query.queryKey, (oldData: any) => {
          if (!oldData) return oldData;
          
          return {
            pages: [
              [optimisticPost, ...oldData.pages[0]],
              ...oldData.pages.slice(1),
            ],
            pageParams: oldData.pageParams,
          };
        });
      });
      
      // Return context with the information needed to rollback
      return { previousQueries, optimisticPost };
    },
    
    // When the mutation succeeds, update with the real post from the server
    onSuccess: (newServerPost, variables, context) => {
      if (!context) return;
      
      const { previousQueries, optimisticPost } = context;
      
      // Update all queries with the real post ID from the server
      previousQueries.forEach(({ queryKey }) => {
        queryClient.setQueryData(queryKey, (oldData: any) => {
          if (!oldData) return oldData;
          
          return {
            pages: oldData.pages.map((page: Post[], pageIndex: number) => {
              if (pageIndex === 0) {
                // Replace the optimistic post with the real one
                return page.map(post => 
                  post.id === optimisticPost.id ? newServerPost : post
                );
              }
              return page;
            }),
            pageParams: oldData.pageParams,
          };
        });
      });
    },
    
    // If the mutation fails, roll back to the previous state
    onError: (error, variables, context) => {
      if (!context) return;
      
      const { previousQueries } = context;
      
      // Restore all previous query data
      previousQueries.forEach(({ queryKey, data }) => {
        queryClient.setQueryData(queryKey, data);
      });
    },
    
    // Always refetch to ensure consistency after some time
    onSettled: () => {
      // Delayed refetch to ensure server consistency after optimistic updates
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY.all });
      }, 5000);
    },
  });
};