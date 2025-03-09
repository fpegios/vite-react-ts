import React, { useState } from 'react';
import PostCard from '../../components/PostCard';
import { usePosts, useAddPost } from '../../hooks/usePosts';
import styles from './Home.module.css';
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

  if (status === 'pending') return <p>Loading posts...</p>;
  if (status === 'error') return <p>Error fetching posts.</p>;

  return (
    <div>
      <h1>Posts</h1>
      
      {/* Add Post Button */}
      <button onClick={() => setIsModalOpen(true)} className={styles.addPostBtn}>
        + Add Post
      </button>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Add New Post</h2>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            <button onClick={handleAddPost} disabled={addPostMutation.isPending}>
              {addPostMutation.isPending ? 'Adding...' : 'Submit'}
            </button>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className={styles.postContainer}>
        {data?.pages.flat().map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage} className={styles.loadMoreBtn}>
          {isFetchingNextPage ? 'Loading more...' : 'Load More'}
        </button>
      )}
    </div>
  );
};

export default Home;
