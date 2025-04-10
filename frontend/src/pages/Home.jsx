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
    <div>
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
  );
};

export default Home;
