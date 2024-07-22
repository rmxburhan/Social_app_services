import { Express } from "express";
import AuthRoute from "./auth.routes";
import UserRoute from "./user.routes";
import PostRoute from "./post.routes";
import CommentRoute from "./comment.routes";
const initRoutes = (app: Express) => {
  app.use("/api/auth", AuthRoute);
  app.use("/api/user", UserRoute);
  app.use("/api/posts", PostRoute);
  app.use("/api/comments", CommentRoute);
};

export default initRoutes;
