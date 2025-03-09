import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { fetchPostById } from "../../services/posts";

const Post = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { data: post, status } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPostById(postId),
  });

  if (status === "pending") return <LoadingSpinner />;
  if (status === "error") return <p className="text-center text-red-500 py-8">Error loading post.</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
      >
        <span className="mr-2 text-xl">←</span> Back
      </button>
      
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{post?.title}</h1>
      <p className="text-gray-700 leading-relaxed whitespace-pre-line">{post?.body}</p>
    </div>
  );
};

export default Post;