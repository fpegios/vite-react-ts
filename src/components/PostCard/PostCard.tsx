import { Post } from "../../services/posts";
import styles from './PostCard.module.css';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className={styles.postCard}>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </div>
  );
};

export default PostCard;
