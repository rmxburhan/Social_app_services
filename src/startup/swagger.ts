import { Express } from "express";
import swaggerUi from "swagger-ui-express";
const swaggerDocument = require("../../docs/swagger/swagger.json");

var options = {
  explorer: true,
};
const initSwagger = (app: Express) => {
  swaggerDocument.host = process.env.APP_HOST || "http://localhost:5000";
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, options)
  );
};
export default initSwagger;
