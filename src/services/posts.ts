export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface PaginatedResponse {
  data: Post[];
}

export const fetchPosts = async ({ pageParam = 1, limit = 10 }): Promise<Post[]> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${pageParam}`
  );
  if (!response.ok) throw new Error('Failed to fetch posts');
  return response.json();
};


export const fetchPostById = async (postId?: string) => {
  if (!postId) throw new Error('Invalid post ID');

  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  if (!response.ok) throw new Error('Failed to fetch post');
  return response.json();
};
