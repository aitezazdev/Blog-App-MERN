import Post from "../models/post.model.js";
import User from "../models/user.model.js";

// create post
const createPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "try logging first to create your posts",
      });
    }

    const post = await Post.create({
      title,
      content,
      tags: tags || [],
      author: user._id,
      likes: [],
    });

    user.createdPosts.addToSet(post._id);
    await user.save();

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// delete post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized to delete this post",
      });
    }

    await post.deleteOne();

    const user = await User.findById(req.user.id);
    user.createdPosts.pull(post._id);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// update post
const updatePost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized to update this post",
      });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.tags = tags || post.tags;

    await post.save();

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author");
    if (!posts) {
      return res.status(404).json({
        success: false,
        message: "Posts not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "All posts fetched",
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// posts by ID
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author");
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post fetched",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// posts by author
const getPostsByAuthor = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.id }).populate("author");
    if (posts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Posts not created yet by this user",
      });
    }

    res.status(200).json({
      success: true,
      message: "Posts fetched",
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  createPost,
  deletePost,
  updatePost,
  getAllPosts,
  getPostById,
  getPostsByAuthor,
};
