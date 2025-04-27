import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPosts,
  togglePostSave,
  deletePost,
  toggleLike,
} from "../api/postsApi";
import PostCard from "../Components/PostCard";
import { fetchSavedPosts } from "../store/Slices/savedPosts";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import HomeIntro from "../Components/HomeIntro";
import toast from "react-hot-toast";
import { searchPosts } from "../api/searchApi";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
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
    const handleSearch = async () => {
      if (searchTerm.trim() === "") {
        if (isSearching) {
          fetchPosts();
          setIsSearching(false);
        }
        return;
      }

      setIsSearching(true);
      try {
        const response = await searchPosts(searchTerm);
        setPosts(response.data);
      } catch (error) {
        console.error("Search failed:", error);
        toast.error("Search failed. Please try again.");
      }
    };

    handleSearch();
  }, [searchTerm]);

  useEffect(() => {
    if (user && posts.length > 0) {
      dispatch(fetchSavedPosts());
    }
  }, [user, posts, dispatch]);

  const isPostSaved = (postId) => {
    return user && savedPosts.some((post) => post._id === postId);
  };

  const isPostLiked = (post) => {
    return user && post.likes && post.likes.includes(user._id);
  };

  const handleToggleSave = async (postId) => {
    if (!user) return;
    try {
      const response = await togglePostSave(postId);
      const message = response.action === "saved" ? "Post saved" : "Post unsaved";
      toast.success(message);
      dispatch(fetchSavedPosts());
    } catch (error) {
      toast.error("Failed to toggle post save state.");
    }
  };

  const handleToggleLike = async (postId) => {
    if (!user) return;
    try {
      await toggleLike(postId);

      if (searchTerm.trim() !== "") {
        const response = await searchPosts(searchTerm);
        setPosts(response.data);
      } else {
        fetchPosts();
      }
    } catch (error) {
      toast.error("Failed to toggle like state.");
    }
  };

  const handlePostDeleted = (deletedPostId) => {
    if (!user) return;
    deletePost(deletedPostId);
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post._id !== deletedPostId)
    );
  };

  if (posts === null) {
    return (
      <p className="text-center py-10 mt-20 text-white text-3xl font-semibold">
        Loading...
      </p>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="min-h-screen pb-20 relative">
        <HomeIntro searchData={setSearchTerm} />
        <p className="text-center py-10 text-white text-4xl font-semibold">
          {isSearching ? "No posts match your search" : "No posts found"}
        </p>
        {user && (
          <Link
            to="/create-post"
            className="fixed bottom-20 right-20 w-14 h-14 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-lg hover:bg-emerald-700 transition-all hover:scale-110 z-20"
            title="Create Post">
            <Plus size={24} />
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <HomeIntro searchData={setSearchTerm} />

      <div className="w-full px-4 sm:px-6 md:px-10 max-w-[1600px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 mt-10">
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            user={user}
            isSaved={isPostSaved(post._id)}
            toggleSavePost={() => handleToggleSave(post._id)}
            isLiked={isPostLiked(post)}
            toggleLikePost={() => handleToggleLike(post._id)}
            onPostDeleted={handlePostDeleted}
          />
        ))}
      </div>

      {user && (
        <Link
          to="/create-post"
          className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 w-14 h-14 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-lg hover:bg-emerald-700 transition-all hover:scale-110 z-20"
          title="Create Post">
          <Plus size={24} />
        </Link>
      )}
    </div>
  );
};

export default Home;

