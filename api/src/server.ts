/*  Imports  */
//CORS
const cors = require("cors");

//Express
import express from "express";
//DotENV
import dotenv from "dotenv";

/* API Routes */
//Join Route Imports
import resTagRelRoutes from "./routes/joinRoutes/restaurants_tags_rel_route";
import resTypeRelRoutes from "./routes/joinRoutes/restaurants_types_rel_route";
//Standard Route Imports
import restReviewRoutes from "./routes/restaurantReviewRoute";
import restRoutes from "./routes/restaurantRoute";
import resTagRoutes from "./routes/restaurantTagRoute";
import resTypeRoutes from "./routes/restaurantTypeRoute";
import mealRoutes from "./routes/meals_route";

/* App Initialization */
const app = express();

/* ENV Initialization */
dotenv.config();

/* Env Variables */
const PORT: any = process.env.PORT || 3042;

/* Middleware Initialization */
//CORS
app.use(cors());
//Express JSON
app.use(express.json());

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
app.listen(PORT, "127.0.0.1", () => {
  console.log(`Server initialized and running on port ${PORT}`);
});
