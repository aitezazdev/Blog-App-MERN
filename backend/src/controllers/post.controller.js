import fs from "fs";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import Comment from "../models/comment.model.js";
import cloudinary from "../config/cloudinary.js";

// create post
const createPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "title is required",
      });
    }

    if (!content) {
      return res.status(400).json({
        success: false,
        message: "content is required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "image file is required",
      });
    }

    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "posts",
    });

    if(!uploadResult.secure_url) {
      return res.status(500).json({
        success: false,
        message: "Error uploading image",
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
      image: {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      },
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

    if (post.image?.public_id) {
      await cloudinary.uploader.destroy(post.image.public_id);
    }

    await Comment.deleteMany({ post: post._id });

    await post.deleteOne();

    const user = await User.findById(req.user.id);
    user.createdPosts.pull(post._id);
    
    await User.updateMany(
      { savedPosts: post._id },
      { $pull: { savedPosts: post._id } }
    );
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

    if (req.file) {
      if (post.image?.public_id) {
        await cloudinary.uploader.destroy(post.image.public_id);
      }

      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "posts",
      });

      post.image = {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      };

      fs.unlinkSync(req.file.path);
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
    res.status(500).json({ success: false, message: error.message });
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
    if (posts.length === 0 || !posts) {
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
