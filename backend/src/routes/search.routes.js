import express from "express";
import searchPosts from "../controllers/search.controller.js";

const searchRouter = express.Router();

searchRouter.get("/search", searchPosts);

export default searchRouter;