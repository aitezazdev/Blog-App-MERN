import Post from "../models/post.model.js";
import User from "../models/user.model.js";

// view profile
const viewProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User profile",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};

// update profile
const updateProfile = async (req, res) => {
  try {
    const { name, bio } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.name = name || user.name;
    user.bio = bio || user.bio;

    await user.save();

    res.status(200).json({
      success: true,
      message: "User profile updated",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};

// delete account
const deleteAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await Post.deleteMany({ author: user._id });

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: "User account and posts deleted",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};

export { viewProfile, updateProfile, deleteAccount };
