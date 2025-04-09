import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getPostById,
  savePost,
  unsavePost,
  likePost,
  unlikePost,
  getPostComments,
  createComment,
} from "../api";
import { FaHeart, FaRegHeart, FaRegBookmark, FaBookmark } from "react-icons/fa";
import { fetchSavedPosts } from "../store/Slices/savedPosts";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  let [commentText, setCommentText] = useState("");

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

  useEffect(() => {
    getPostComments(id).then((comments) => {
      setComments(comments.data);
    });

    fetchPost();

    if (user) {
      dispatch(fetchSavedPosts());
    }
  }, [id, dispatch, user]);

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
      const response = await getPostById(id);
      setPost(response.data);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleUnlikePost = async () => {
    if (!user) return;
    try {
      await unlikePost(id);
      const response = await getPostById(id);
      setPost(response.data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    if (!commentText.trim()) return;

    try {
      await createComment(id, commentText);
      const updatedComments = await getPostComments(id);
      setComments(updatedComments.data);
      setCommentText("");
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
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
          <h1 className="text-3xl font-semibold text-gray-800 mb-3">
            {post.title}
          </h1>
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

      <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Comments ({comments.length || 0})
          </h2>

          <form className="mb-8" onSubmit={handleSubmit}>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              rows="3"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}></textarea>
            <button className="mt-3 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
              Post Comment
            </button>
          </form>

          <div className="space-y-6">
            {comments && comments.length > 0 ? (
              comments.map((comment, index) => (
                <div
                  key={index}
                  className="border-b border-gray-100 pb-5 last:border-0">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium text-gray-800">
                      {comment.user?.name || "Unknown"}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              ))
            ) : (
              <div className="py-6 text-center text-gray-500">
                No comments yet. Be the first to comment!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
