import express, { Express } from "express";
import initDB from "./startup/db";
import initCORS from "./startup/cors";
import dotenv from "dotenv";
import initRoutes from "./routes/index";
import bodyParser from "body-parser";
import initSwagger from "./startup/swagger";
import { errorHandlers } from "./middleware/errror-handler.middleware";

const app: Express = express();
dotenv.config();

app.use(bodyParser.json());
initDB();
initCORS(app);
initRoutes(app);
initSwagger(app);
app.use(errorHandlers);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server running at port: ", port);
});

initCORS(app);
