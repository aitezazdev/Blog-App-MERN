import React, { useState, useRef, useEffect } from "react";
import { FaRegCommentDots, FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEditPost = () => {
    setShowMenu(false);
    navigate(`/edit-post/${post._id}`);
  };

  const handleDeletePost = async () => {
    try {
      setIsDeleting(true);
      
      if (onPostDeleted) {
        onPostDeleted(post._id);
      }
      
      setShowMenu(false);
      toast.success("Post deleted successfully");

      if (onPostDeleted) {
        onPostDeleted(post._id);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete post");
      console.error("Error deleting post:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white w-2/3 mx-auto my-5 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-2xl font-semibold text-gray-800 hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h2>

          {isAuthor && (
            <div className="relative" ref={menuRef}>
              <button
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full cursor-pointer"
                onClick={() => setShowMenu(!showMenu)}
                disabled={isDeleting}>
                <FaEllipsisV />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                  <div className="py-1">
                    <button
                      onClick={handleEditPost}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                      <FaEdit /> Edit Post
                    </button>
                    <button
                      onClick={handleDeletePost}
                      disabled={isDeleting}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2">
                      <FaTrash /> {isDeleting ? "Deleting..." : "Delete Post"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

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
            <Link
              to={`/post/${post._id}`}
              className="flex items-center gap-1 cursor-pointer hover:text-blue-500 transition">
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
