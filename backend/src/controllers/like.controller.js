import Post from "../models/post.model.js";

// Like Post
const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    if (post.likes.includes(req.user.id)) {
      return res
        .status(400)
        .json({ success: false, message: "Post already liked" });
    }

    post.likes.push(req.user.id);
    await post.save();

    res.status(200).json({ success: true, message: "Post liked", data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Unlike Post
const unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    if (!post.likes.includes(req.user.id)) {
      return res
        .status(400)
        .json({ success: false, message: "You have not liked this post" });
    }

    post.likes.pull(req.user.id);
    await post.save();

    res
      .status(200)
      .json({ success: true, message: "Post unliked", data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { likePost, unlikePost };
