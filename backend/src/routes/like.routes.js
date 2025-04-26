import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { toggleLike } from "../controllers/like.controller.js";

const likeRouter = express.Router();

likeRouter.post("/toggle-like/:postId", authMiddleware, toggleLike);

export default likeRouter;