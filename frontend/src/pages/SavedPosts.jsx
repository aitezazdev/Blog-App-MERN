import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostCard from "../Components/PostCard";
import { fetchSavedPosts } from "../store/Slices/savedPosts";
import { togglePostSave } from "../api/postsApi";
import toast from "react-hot-toast";

const SavedPosts = () => {
  const dispatch = useDispatch();
  const { savedPosts, loading, error } = useSelector((state) => state.savedPosts);

  useEffect(() => {
    dispatch(fetchSavedPosts());
  }, [dispatch]);

  const toggleSavePost = async (postId) => {
    await togglePostSave(postId);
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
    <div className="min-h-screen w-full text-white py-10">
      <div className=" mx-auto">
        <h2 className="text-3xl font-bold mx-8 mb-10 border-b border-neutral-800 pb-3">
          Your Bookmarked Posts
        </h2>

        {savedPosts.length > 0 ? (
          <div className="w-full px-4 sm:px-6 md:px-10 max-w-[1600px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 mt-10">
            {savedPosts.map((post) => (
                <PostCard
                  post={post}
                  isSaved={true}
                  toggleSavePost={() => toggleSavePost(post._id)}
                />
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
