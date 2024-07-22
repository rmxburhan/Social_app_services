import cors from "cors";
import { Express } from "express";
const initCORS = (app: Express) => {
  app.use(cors());
};

export default initCORS;
