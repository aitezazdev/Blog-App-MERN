import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { deleteAccount, updateProfile, viewProfile } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/view-profile", authMiddleware, viewProfile);
userRouter.put("/update-profile", authMiddleware, updateProfile);
userRouter.delete("/delete-account", authMiddleware, deleteAccount);

export default userRouter;