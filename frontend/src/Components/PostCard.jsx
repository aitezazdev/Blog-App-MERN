import React from "react";
import { FaRegCommentDots } from "react-icons/fa";
import SavePostButton from "./SavePostButton";
import SaveLikeButton from "./SaveLikeButton";
import { Link } from "react-router-dom";

const PostCard = ({
  post,
  isSaved,
  savePost,
  unsavePost,
  isLiked,
  likePost,
  unlikePost,
}) => {
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="bg-white w-2/3 mx-auto my-5 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
          {post.title}
        </h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {post.content}
        </p>
        <div className="text-xs text-gray-500 mb-5">
          Posted by{" "}
          <span className="font-medium">{post.author?.name || "Unknown"}</span>{" "}
          on {formattedDate}
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="flex items-center gap-6 text-gray-500">
            <div className="flex items-center gap-1 cursor-pointer hover:text-red-500 transition">
              <SaveLikeButton
                post={post}
                isLiked={isLiked}
                likePost={likePost}
                unlikePost={unlikePost}
              />
            </div>
            <Link to={`/post/${post._id}`} className="flex items-center gap-1 cursor-pointer hover:text-blue-500 transition">
              <FaRegCommentDots />
              <span className="text-sm">{post.comments?.length || 0}</span>
            </Link>
          </div>
          <div className="cursor-pointer text-gray-500 hover:text-blue-600 transition">
            <SavePostButton
              post={post}
              isSaved={isSaved}
              savePost={savePost}
              unsavePost={unsavePost}
            />
          </div>
        </div>  
      </div>
    </div>
  );
};

export default PostCard;
