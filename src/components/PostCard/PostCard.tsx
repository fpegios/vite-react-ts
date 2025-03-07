import { useNavigate } from "react-router-dom";
import { Post } from "../../services/posts";
import styles from './PostCard.module.css';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${post.id}`);
  };

  return (
    <div className={styles.postCard} onClick={handleClick} role="button" tabIndex={0}>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </div>
  );
};

export default PostCard;
