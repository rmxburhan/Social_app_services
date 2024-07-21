import cors from "cors";
import { Express } from "express";
const initCORS = (app: Express) => {
  app.use(cors({ origin: "*" }));
};

export default initCORS;
