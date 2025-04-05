import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { savePost, unsavePost, getSavedPosts } from "../controllers/saved.controller.js";

const savedRouter = express.Router();

savedRouter.use(authMiddleware);

savedRouter.post("/save/:id", savePost);
savedRouter.delete("/unsave/:id", unsavePost);
savedRouter.get("/saved", getSavedPosts);

export default savedRouter;
