import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import { getPostComments, createComment, updateComment, deleteComment } from "../api/commentsApi";
import toast from "react-hot-toast";

const CommentsSection = ({ postId, user, initialComments = [] }) => {
  const [comments, setComments] = useState(initialComments);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (initialComments && initialComments.length > 0) {
      setComments(initialComments);
    } else {
      fetchComments();
    }
  }, [postId, initialComments]);

  const fetchComments = async () => {
    try {
      const response = await getPostComments(postId);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !commentText.trim()) return;

    try {
      setIsSubmitting(true);
      await createComment(postId, commentText);
      toast.success("Comment posted");
      await fetchComments();
      setCommentText("");
    } catch (error) {
      console.error("Failed to post comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditComment = async (commentId, content) => {
    if (!user) return;
    
    try {
      await updateComment(commentId, content);
      toast.success("Comment updated");
      await fetchComments();
    } catch (error) {
      console.error("Failed to update comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!user) return;
    
    try {
      await deleteComment(commentId);
      toast.success("Comment deleted");
      await fetchComments();
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  return (
    <div className="bg-[#1a1a1a] rounded-xl shadow-lg border border-gray-800 overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-100 mb-6">
          Comments ({comments.length || 0})
        </h2>

        {user ? (
          <form className="mb-8" onSubmit={handleSubmit}>
            <textarea spellCheck="false"
              className="w-full px-4 py-3 bg-[#252525] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition text-gray-200"
              rows="3"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              disabled={isSubmitting}
            ></textarea>
            <button 
              className="mt-3 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 cursor-pointer text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting || !commentText.trim()}
            >
              {isSubmitting ? "Posting..." : "Post Comment"}
            </button>
          </form>
        ) : (
          <div className="mb-8 p-4 bg-[#252525] rounded-lg text-center">
            <p className="text-gray-400">Please sign in to post a comment.</p>
          </div>
        )}

        <div className="space-y-6">
          {comments && comments.length > 0 ? (
            comments.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                user={user}
                onEdit={handleEditComment}
                onDelete={handleDeleteComment}
              />
            ))
          ) : (
            <div className="py-6 text-center text-gray-400">
              No comments yet. Be the first to comment!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
