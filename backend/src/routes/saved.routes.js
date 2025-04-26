import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { getSavedPosts, togglePostSave } from "../controllers/saved.controller.js";

const savedRouter = express.Router();

savedRouter.use(authMiddleware);

savedRouter.post("/toggle-save/:id", togglePostSave);
savedRouter.get("/saved", getSavedPosts);

export default savedRouter;
