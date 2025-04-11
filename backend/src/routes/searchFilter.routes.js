import express from "express";
import { filterPosts, searchPosts } from "../controllers/searchFilter.controller.js";

const searchFilterRouter = express.Router();

searchFilterRouter.get("/search", searchPosts);
searchFilterRouter.get("/filter", filterPosts);

export default searchFilterRouter;
