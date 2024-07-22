import { Express } from "express";
import swaggerUi from "swagger-ui-express";
const swaggerDocument = require("../../docs/swagger/swagger.json");

var options: swaggerUi.SwaggerOptions = {
  explorer: true,
};
const initSwagger = (app: Express) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, options)
  );
};
export default initSwagger;
