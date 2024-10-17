/*  Imports  */
//CORS
const cors = require("cors");

//Express
import express from "express";
// import { Express } from "express";
//DotENV
import dotenv from "dotenv";

/* API Routes */
//Join Route Imports
import resTagRelRoutes from "./routes/joinRoutes/restaurantTagRelationRoute";
import resTypeRelRoutes from "./routes/joinRoutes/restaurantTypeRelationRoute";
//Standard Route Imports
import restReviewRoutes from "./routes/restaurantReviewRoute";
import restRoutes from "./routes/restaurantRoute";
import resTagRoutes from "./routes/restaurantTagRoute";
import resTypeRoutes from "./routes/restaurantTypeRoute";
import mealRoutes from "./routes/mealRoute";

/* App Initialization */
const app = express();

/* ENV Initialization */
dotenv.config();

/* Env Variables */
const PORT: any = process.env.PORT || 3042;

/* Logger Initialization */
import logger from "./controllers/utility/logController";

/* Middleware Initialization */
//CORS
app.use(cors());
//Express JSON
app.use(express.json());

//Logger Initialization (Requests)
app.use((req, res, next) => {
  logger.info(`Request: ${req.method} ${req.url}`);
  next();
});

//Logger Initialization (Errors)
app.use((err: any, req: any, res: any, next: any) => {
  logger.error(`Error: ${err}`);
  next();
});

/* Routes */
//Join Routes
app.use("/", resTagRelRoutes);
app.use("/", resTypeRelRoutes);
//Standard Routes
app.use("/", mealRoutes);
app.use("/", restReviewRoutes);
app.use("/", restRoutes);
app.use("/", resTagRoutes);
app.use("/", resTypeRoutes);

/* App Listener */
app.listen(PORT, () => {
  logger.info(`Server initialized and running on port ${PORT}`);
});
