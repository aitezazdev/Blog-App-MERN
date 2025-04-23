import React, { useState, useRef, useEffect } from "react";
import { FaRegCommentDots, FaEllipsisV, FaEdit, FaTrash, FaTag } from "react-icons/fa";
import SavePostButton from "./SavePostButton";
import SaveLikeButton from "./SaveLikeButton";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const PostCard = ({
  post,
  isSaved,
  savePost,
  unsavePost,
  isLiked,
  likePost,
  unlikePost,
  user,
  onPostDeleted,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const isAuthor = user && post.author && user._id === post.author._id;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEditPost = () => {
    setShowMenu(false);
    navigate(`/edit-post/${post._id}`);
  };

  const handleDeletePost = async () => {
    try {
      setIsDeleting(true);
      if (onPostDeleted) onPostDeleted(post._id);
      setShowMenu(false);
      toast.success("Post deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete post");
      console.error("Error deleting post:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const getTruncatedContent = (content, wordLimit = 12) => {
    const words = content.trim().split(" ");
    return words.length <= wordLimit
      ? content
      : words.slice(0, wordLimit).join(" ") + "…";
  };

  return (
    <div className="bg-[#202020] rounded-2xl shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 border border-[#1e1e1e] overflow-hidden flex flex-col justify-between h-[300px]">
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <Link
            to={`/post/${post._id}`}
            className="text-2xl font-semibold text-white hover:text-emerald-400 transition-colors line-clamp-2"
          >
            {post.title}
          </Link>

          {isAuthor && (
            <div className="relative" ref={menuRef}>
              <button
                className="text-gray-400 hover:text-gray-200 p-1 rounded-full cursor-pointer"
                onClick={() => setShowMenu(!showMenu)}
                disabled={isDeleting}
              >
                <FaEllipsisV />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-[#1f1f1f] text-white rounded-md shadow-lg z-10 border border-[#2a2a2a]">
                  <div className="py-1">
                    <button
                      onClick={handleEditPost}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-[#2a2a2a] flex items-center gap-2"
                    >
                      <FaEdit /> Edit Post
                    </button>
                    <button
                      onClick={handleDeletePost}
                      disabled={isDeleting}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-[#2a2a2a] flex items-center gap-2"
                    >
                      <FaTrash /> {isDeleting ? "Deleting..." : "Delete Post"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <Link
          to={`/post/${post._id}`}
          className="text-gray-300 mb-2 hover:text-gray-100 transition line-clamp-4 flex-grow"
        >
          {getTruncatedContent(post.content)}
        </Link>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map((tag, index) => (
              <span 
                key={index}
                className="text-xs bg-[#2a2a2a] text-emerald-400 px-2 py-1 rounded-md hover:bg-emerald-900/30 transition-colors flex items-center gap-1"
              >
                #
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="text-xs text-gray-500 mb-2 mt-auto">
          Posted by{" "}
          <span className="font-medium text-white">
            {post.author?.name || "Unknown"}
          </span>{" "}
          on {formattedDate}
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-700">
          <div className="flex items-center gap-6 text-gray-400">
            <div className="flex items-center gap-1 cursor-pointer hover:text-red-500 transition">
              <SaveLikeButton
                post={post}
                isLiked={isLiked}
                likePost={likePost}
                unlikePost={unlikePost}
              />
            </div>
            <Link
              to={`/post/${post._id}`}
              className="flex items-center gap-1 cursor-pointer hover:text-emerald-400 transition"
            >
              <FaRegCommentDots />
              <span className="text-sm">{post.comments?.length || 0}</span>
            </Link>
          </div>
          <div className="cursor-pointer text-gray-400 hover:text-emerald-500 transition">
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