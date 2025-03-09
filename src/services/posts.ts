export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface PostsData {
  pages: Post[][];
  pageParams: unknown[];
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

export const addPost = async (post: { title: string; body: string }) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) throw new Error('Failed to add post');
  return response.json();
};
