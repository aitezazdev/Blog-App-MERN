import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { likePost, unlikePost } from "../controllers/like.controller.js";

const likeRouter = express.Router();

likeRouter.post("/like/:postId", authMiddleware, likePost);
likeRouter.post("/unlike/:postId", authMiddleware, unlikePost);

export default likeRouter;