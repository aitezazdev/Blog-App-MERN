import express from "express";
import { createPost, deletePost, getAllPosts, getPostById, getPostsByAuthor, updatePost } from "../controllers/post.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.js";

const postRouter = express.Router();

postRouter.post("/create-post", authMiddleware, upload.single("image"), createPost);
postRouter.delete("/delete-post/:id", authMiddleware, deletePost);
postRouter.put("/update-post/:id", authMiddleware, updatePost);
postRouter.get("/all-posts", getAllPosts);
postRouter.get("/post/:id", getPostById);
postRouter.get("/posts-by-author/:id", getPostsByAuthor);

export default postRouter;