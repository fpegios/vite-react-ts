import { useNavigate } from "react-router-dom";
import { Post } from "../../services/posts";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/post/${post.id}`);
  };
  
  return (
    <div 
      className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={handleClick} 
      role="button" 
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">{post.title}</h3>
      <p className="text-gray-600 line-clamp-3">{post.body}</p>
    </div>
  );
};

export default PostCard;