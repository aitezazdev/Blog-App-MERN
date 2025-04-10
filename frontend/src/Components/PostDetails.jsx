import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getPostById,
  savePost,
  unsavePost,
  likePost,
  unlikePost,
  getPostComments,
} from "../api";
import { FaHeart, FaRegHeart, FaRegBookmark, FaBookmark, FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";
import { fetchSavedPosts } from "../store/Slices/savedPosts";
import CommentsSection from "./CommentsSection";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

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

  const handleSavePost = async () => {
    if (!user) return;
    await savePost(id);
    dispatch(fetchSavedPosts());
  };

  const handleUnsavePost = async () => {
    if (!user) return;
    await unsavePost(id);
    dispatch(fetchSavedPosts());
  };

  const handleLikePost = async () => {
    if (!user) return;
    try {
      await likePost(id);
      await fetchPost();
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleUnlikePost = async () => {
    if (!user) return;
    try {
      await unlikePost(id);
      await fetchPost();
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  const toggleSave = () => {
    if (isPostSaved()) {
      handleUnsavePost();
    } else {
      handleSavePost();
    }
  };

  const toggleLike = () => {
    if (isPostLiked()) {
      handleUnlikePost();
    } else {
      handleLikePost();
    }
  };

  const handleEditPost = () => {
    setShowMenu(false);
    console.log("Edit post", id);
  };

  const handleDeletePost = () => {
    setShowMenu(false);
    console.log("Delete post", id);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading post details...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Post not found</div>
      </div>
    );
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h1 className="text-3xl font-semibold text-gray-800">
              {post.title}
            </h1>
            
            {isAuthor && (
              <div className="relative" ref={menuRef}>
                <button 
                  className="text-gray-500 hover:text-gray-700 p-1 rounded-full"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  <FaEllipsisV />
                </button>
                
                {showMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                    <div className="py-1">
                      <button
                        onClick={handleEditPost}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <FaEdit /> Edit Post
                      </button>
                      <button
                        onClick={handleDeletePost}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <FaTrash /> Delete Post
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2 mb-5">
            <span className="text-sm text-gray-500">
              Posted by{" "}
              <span className="font-medium">
                {post.author?.name || "Unknown"}
              </span>{" "}
              on {formattedDate}
            </span>
          </div>

          <div className="text-gray-700 mb-6 leading-relaxed">
            <p>{post.content}</p>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={toggleLike}>
                {isPostLiked() ? (
                  <div className="flex items-center text-red-500">
                    <FaHeart className="mr-1" />
                    <span className="text-sm">
                      {post.likes?.length || 0} likes
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center text-gray-500 hover:text-red-500 transition">
                    <FaRegHeart className="mr-1" />
                    <span className="text-sm">
                      {post.likes?.length || 0} likes
                    </span>
                  </div>
                )}
              </div>

              <div
                className="cursor-pointer text-gray-500 hover:text-blue-600 transition"
                onClick={toggleSave}>
                {isPostSaved() ? (
                  <FaBookmark size={18} />
                ) : (
                  <FaRegBookmark size={18} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <CommentsSection
        postId={id}
        user={user}
        initialComments={comments}
      />
    </div>
  );
};

export default PostDetails;