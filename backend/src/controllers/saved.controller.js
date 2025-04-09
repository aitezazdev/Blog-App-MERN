import User from "../models/user.model.js";
import Post from "../models/post.model.js";

// Save/bookmark a post
const savePost = async (req, res) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      return res.status(400).json({
        success: false,
        message: "Post id is required",
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.savedPosts.includes(postId)) {
      user.savedPosts.addToSet(postId);
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: "Post saved",
      savedPost: postId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Unsave post
const unsavePost = async (req, res) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      return res.status(400).json({
        success: false,
        message: "Post id is required",
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.savedPosts.pull(postId);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Post unsaved",
      unsavedPost: postId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// all saved posts
const getSavedPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("savedPosts");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Saved posts fetched",
      data: user.savedPosts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { savePost, unsavePost, getSavedPosts };
