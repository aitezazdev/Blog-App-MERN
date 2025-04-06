import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { addComment, deleteComment, editComment, getCommentsForPost } from "../controllers/comment.controller.js";

const commentRouter = express.Router();

commentRouter.post("/add-comment/:postId", authMiddleware, addComment);
commentRouter.put("/edit-comment/:commentId", authMiddleware, editComment);
commentRouter.delete("/delete-comment/:commentId", authMiddleware, deleteComment);
commentRouter.get("/get-comments/:postId", getCommentsForPost);

export default commentRouter;