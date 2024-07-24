import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import YAML from "yaml";
import path from "path";

const initSwagger = (app: Express) => {
  const file = fs.readFileSync(
    path.join(process.cwd(), "./docs/swagger/swagger.yaml"),
    "utf-8"
  );
  const swaggerDocument = YAML.parse(file);

  var options = {
    explorer: true,
  };

  // add app host url
  const host = process.env.APP_HOST;
  if (host) {
    swaggerDocument.servers.unshift({
      url: host + "/api",
    });
  }

  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, options)
  );
};

export default initSwagger;
