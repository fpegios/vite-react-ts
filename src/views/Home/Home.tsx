import React, { useState } from 'react';
import PostCard from '../../components/PostCard';
import { usePosts, useAddPost } from '../../hooks/usePosts';
import { PAGE_LIMIT } from './data';

const Home: React.FC = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = usePosts(PAGE_LIMIT);
  const addPostMutation = useAddPost();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleAddPost = async () => {
    if (!title || !body) return;
    await addPostMutation.mutateAsync({ title, body });
    setTitle('');
    setBody('');
    setIsModalOpen(false);
  };
  
  if (status === 'pending') return <p className="text-center text-gray-600 py-8">Loading posts...</p>;
  if (status === 'error') return <p className="text-center text-red-500 py-8">Error fetching posts.</p>;
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Posts</h1>
      
      <button 
        onClick={() => setIsModalOpen(true)} 
        className="mb-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center cursor-pointer"
      >
        <span className="mr-1 text-lg">+</span> Add Post
      </button>
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Post</h2>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <textarea
              placeholder="Body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full mb-4 p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            />
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddPost} 
                disabled={addPostMutation.isPending}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-400 cursor-pointer"
              >
                {addPostMutation.isPending ? 'Adding...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data?.pages.flat().map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      
      {hasNextPage && (
        <div className="mt-8 text-center">
          <button 
            onClick={() => fetchNextPage()} 
            disabled={isFetchingNextPage} 
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200 disabled:bg-gray-100 disabled:text-gray-500 cursor-pointer"
          >
            {isFetchingNextPage ? 'Loading more...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;