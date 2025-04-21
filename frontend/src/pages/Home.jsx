import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPosts,
  savePost,
  unsavePost,
  likePost,
  unlikePost,
  deletePost,
} from "../api/postsApi";
import PostCard from "../Components/PostCard";
import { fetchSavedPosts } from "../store/Slices/savedPosts";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import HomeIntro from "../Components/HomeIntro";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const { savedPosts } = useSelector((state) => state.savedPosts);
  const { user } = useSelector((state) => state.auth);

  const fetchPosts = async () => {
    const response = await getPosts();
    setPosts(response.data);
  };

  useEffect(() => {
    fetchPosts();
}, []);

useEffect(() => {
  if (user && !(posts.length === 0)) {
    dispatch(fetchSavedPosts());
  }
}, [user, posts, dispatch]);

  const isPostSaved = (postId) => {
    return user && savedPosts.some((post) => post._id === postId);
  };

  const isPostLiked = (post) => {
    return user && post.likes && post.likes.includes(user._id);
  };

  const handleSavePost = async (postId) => {
    if (!user) return;
    await savePost(postId);
    dispatch(fetchSavedPosts());
  };

  const handleUnsavePost = async (postId) => {
    if (!user) return;
    await unsavePost(postId);
    dispatch(fetchSavedPosts());
  };

  const handleLikePost = async (postId) => {
    if (!user) return;
    await likePost(postId);
    fetchPosts();
  };

  const handleUnlikePost = async (postId) => {
    if (!user) return;
    await unlikePost(postId);
    fetchPosts();
  };

  const handlePostDeleted = (deletedPostId) => {
    if (!user) return;
    deletePost(deletedPostId);
    setPosts((prevPosts) => prevPosts.filter(post => post._id !== deletedPostId));
  };
  

  if (posts.length === 0) {
    return <p className="text-center py-10 text-2xl font-semibold">No posts found</p>;
  }

  return (
    <div className="bg-[#0f0f0f] min-h-screen pb-20">
      <HomeIntro />
  
      <div className="w-[90%] max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            user={user}
            isSaved={isPostSaved(post._id)}
            savePost={() => handleSavePost(post._id)}
            unsavePost={() => handleUnsavePost(post._id)}
            isLiked={isPostLiked(post)}
            likePost={() => handleLikePost(post._id)}
            unlikePost={() => handleUnlikePost(post._id)}
            onPostDeleted={handlePostDeleted}
          />
        ))}
      </div>
  
      {user && (
        <Link
          to="/create-post"
          className="fixed bottom-20 right-20 w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg hover:bg-blue-700 transition-all hover:scale-110 z-20"
          title="Create Post"
        >
          <Plus size={24} />
        </Link>
      )}
    </div>
  );
  
};

export default Home;
