import { Express } from "express";
import AuthRoute from "./auth.routes";
import UserRoute from "./user.routes";
const initRoutes = (app: Express) => {
  app.use("/api/auth", AuthRoute);
  app.use("/api/user", UserRoute);
};

export default initRoutes;
