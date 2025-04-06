import express from "express"
import dbConnection from "./src/config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./src/routes/auth.routes.js";
import postRouter from "./src/routes/post.routes.js";
import userRouter from "./src/routes/user.routes.js";
import savedRouter from "./src/routes/saved.routes.js";
import commentRouter from "./src/routes/comment.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

dbConnection();

app.get("/", (req, res) => {
  res.send("Hello world");
})

app.use("/auth", authRouter);
app.use("/", userRouter);
app.use("/api", postRouter);
app.use("/posts", savedRouter);
  app.use("/post", commentRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});