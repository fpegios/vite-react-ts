import React from 'react';
import PostCard from '../../components/PostCard';
import { usePosts } from '../../hooks/usePosts';
import styles from './Home.module.css';
import { PAGE_LIMIT } from './data';

const Home: React.FC = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = usePosts(PAGE_LIMIT);

  if (status === 'pending') return <p>Loading posts...</p>;
  if (status === 'error') return <p>Error fetching posts.</p>;

  return (
    <div>
      <h1>Posts</h1>

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
