import Post from "../models/post.model.js";
import User from "../models/user.model.js";

// search posts
const searchPosts = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ success: false, message: "Query is required." });
    }

    const regex = new RegExp(query, "i");

    // return user IDs --> for posts to search later as posts has user IDs
    const users = await User.find({ name: regex }).select("_id");

    const posts = await Post.find({
      $or: [
        { title: regex },
        { tags: regex },
        { author: { $in: users } }
      ]
    });

    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error. Again." });
  }
};

// filter posts
const filterPosts = async (req, res) => {
  try {
    const { filter } = req.query;

    if (!filter || !["recent", "liked"].includes(filter)) {
      return res.status(400).json({
        success: false,
        message: "Invalid filter. Use 'recent' or 'liked'.",
      });
    }

    if (filter === "liked") {
      const posts = await Post.aggregate([
        {
          $addFields: {
            likesCount: { $size: "$likes" }
          }
        },
        {
          $sort: { likesCount: -1 }
        }
      ]);

      return res.status(200).json({ success: true, data: posts });
    }

    const posts = await Post.find().sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Filter exploded. Classic backend moment." });
  }
};


export { searchPosts, filterPosts };
