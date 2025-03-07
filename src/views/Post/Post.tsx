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
  if (status === "error") return <p>Error loading post.</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)} style={{ cursor: "pointer"}}>
        🔙 Back
      </button>

      <h1>{post?.title}</h1>
      <p>{post?.body}</p>
    </div>
  );
};

export default Post;
