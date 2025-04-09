import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostCard from "../Components/PostCard";
import { fetchSavedPosts } from "../store/Slices/savedPosts";
import { savePost, unsavePost } from "../api/postsApi";

const SavedPosts = () => {
  const dispatch = useDispatch();
  const { savedPosts, loading, error } = useSelector((state) => state.savedPosts);

  useEffect(() => {
    dispatch(fetchSavedPosts());
  }, [dispatch]);

  const handleSavePost = async (postId) => {
    await savePost(postId);
    dispatch(fetchSavedPosts());
  };

  const handleUnsavePost = async (postId) => {
    await unsavePost(postId);
    dispatch(fetchSavedPosts());
  };

  if (loading) return <p className="text-center py-10">Loading saved posts...</p>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Your Bookmarked Posts</h2>
      {savedPosts.length > 0 ? (
        savedPosts.map((post) => (
          <div key={post._id}>
            <PostCard 
              post={post} 
              isSaved={true}
              savePost={() => handleSavePost(post._id)}
              unsavePost={() => handleUnsavePost(post._id)}
            />
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No saved posts yet</p>
      )}
    </div>
  );
};

export default SavedPosts;