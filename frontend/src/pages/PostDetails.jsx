import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostById, togglePostSave, toggleLike, deletePost } from "../api/postsApi";
import { getPostComments } from "../api/commentsApi";
import {
  FaHeart,
  FaRegHeart,
  FaRegBookmark,
  FaBookmark,
  FaEllipsisV,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { fetchSavedPosts } from "../store/Slices/savedPosts";
import CommentsSection from "../Components/CommentsSection";
import toast from "react-hot-toast";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { savedPosts } = useSelector((state) => state.savedPosts);
  const { user } = useSelector((state) => state.auth);

  const fetchPost = async () => {
    try {
      const response = await getPostById(id);
      setPost(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching post:", error);
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await getPostComments(id);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments();

    if (user) {
      dispatch(fetchSavedPosts());
    }
  }, [id, dispatch, user]);

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

  const isAuthor = user && post?.author && user._id === post.author._id;

  const isPostSaved = () => {
    return user && savedPosts.some((savedPost) => savedPost._id === id);
  };

  const isPostLiked = () => {
    return user && post?.likes && post.likes.includes(user._id);
  };

  const toggleSave = async () => {
    if (!user) return;
    await togglePostSave(id);
    if (isPostSaved()) {
      toast.success("Post unsaved");
    } else {
      toast.success("Post saved");
    }
    dispatch(fetchSavedPosts());
  };

  const toggleLikePost = async () => {
    if (!user) return;
    await toggleLike(id);
    fetchPost();
  };

  const handleEditPost = () => {
    setShowMenu(false);
    navigate(`/edit-post/${post._id}`);
  };

  const handleDeletePost = async () => {
    setShowMenu(false);
    if (!user) return;
    await deletePost(id);
    toast.success("Post deleted");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0f0f0f] text-gray-300">
        <div className="text-xl">Loading post details...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0f0f0f] text-gray-300">
        <div className="text-xl">Post not found</div>
      </div>
    );
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 bg-[#0f0f0f] text-gray-200">
      <div className="bg-[#1a1a1a] rounded-xl shadow-lg border border-gray-800 overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-semibold text-gray-100">
              {post.title}
            </h1>

            {isAuthor && (
              <div className="relative" ref={menuRef}>
                <button
                  className="text-gray-400 hover:text-emerald-400 p-1 rounded-full"
                  onClick={() => setShowMenu(!showMenu)}>
                  <FaEllipsisV />
                </button>

                {showMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#252525] rounded-md shadow-lg z-10 border border-gray-700">
                    <div className="py-1">
                      <button
                        onClick={handleEditPost}
                        className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#333333] flex items-center gap-2">
                        <FaEdit /> Edit Post
                      </button>
                      <button
                        onClick={handleDeletePost}
                        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-[#333333] flex items-center gap-2">
                        <FaTrash /> Delete Post
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 mb-5">
            <span className="text-sm text-gray-400">
              Posted by{" "}
              <span className="font-medium text-emerald-400">
                {post.author?.name || "Unknown"}
              </span>{" "}
              on {formattedDate}
            </span>
          </div>

          <div className="text-gray-300 mb-6 leading-relaxed">
            <p>{post.content}</p>
          </div>

          <div className="pt-4 border-t border-gray-800">
            <div className="flex justify-between items-center">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={toggleLikePost}>
                {isPostLiked() ? (
                  <div className="flex items-center text-red-500">
                    <FaHeart className="mr-1" />
                    <span className="text-sm">
                      {post.likes?.length || 0}{" "}
                      {post.likes?.length === 1 ? "like" : "likes"}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center text-gray-400 hover:text-red-500 transition">
                    <FaRegHeart className="mr-1" />
                    <span className="text-sm">
                      {post.likes?.length || 0}{" "}
                      {post.likes?.length === 1 ? "like" : "likes"}
                    </span>
                  </div>
                )}
              </div>

              <div
                className="cursor-pointer text-gray-400 hover:text-emerald-400 transition"
                onClick={toggleSave}>
                {isPostSaved() ? (
                  <FaBookmark size={18} className="text-emerald-400" />
                ) : (
                  <FaRegBookmark size={18} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <CommentsSection postId={id} user={user} initialComments={comments} />
    </div>
  );
};

export default PostDetails;
