import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostCard from "../Components/PostCard";
import { fetchSavedPosts } from "../store/Slices/savedPosts";
import { unsavePost } from "../api/postsApi";
import toast from "react-hot-toast";

const SavedPosts = () => {
  const dispatch = useDispatch();
  const { savedPosts, loading, error } = useSelector((state) => state.savedPosts);

  useEffect(() => {
    dispatch(fetchSavedPosts());
  }, [dispatch]);

  const handleUnsavePost = async (postId) => {
    await unsavePost(postId);
    toast.success("Post unsaved");
    dispatch(fetchSavedPosts());
  };

  if (loading)
    return (
      <p className="text-center py-10 text-neutral-400">
        Loading saved posts...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-red-400 py-10">
        Something went wrong: {error}
      </p>
    );

  return (
    <div className="min-h-screen w-full text-white px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-mint-400 mb-10 border-b border-neutral-800 pb-3">
          Your Bookmarked Posts
        </h2>

        {savedPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedPosts.map((post) => (
              <div
                key={post._id}
                className="bg-neutral-900 rounded-xl border border-neutral-800 shadow hover:shadow-lg transition"
              >
                <PostCard
                  post={post}
                  isSaved={true}
                  unsavePost={() => handleUnsavePost(post._id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-neutral-500 pt-10">
            No saved posts yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default SavedPosts;
