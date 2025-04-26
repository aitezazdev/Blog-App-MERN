import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const SaveLikeButton = ({ post, isLiked, toggleLikePost }) => {
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0);

  useEffect(() => {
    setLiked(isLiked);
    setLikeCount(post.likes?.length || 0);
  }, [isLiked, post.likes]);

  const handleToggle = async () => {
    toggleLikePost();
  };

  return (
    <div className="flex items-center gap-1" onClick={handleToggle}>
      {liked ? (
        <FaHeart className="text-red-500" />
      ) : (
        <FaRegHeart />
      )}
      <span className="text-sm">{likeCount}</span>
    </div>
  );
};

export default SaveLikeButton;