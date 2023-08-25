import express from "express";

import multer from "multer";

import restController from "../controllers/restaurants_cont";

const upload = multer({ dest: "tmp/csv/" });

const router = express.Router();

router.post("/api/restaurants", restController.addRestaurant);

router.post(
  "/api/restaurants/bulk",
  upload.single("csv"),
  restController.addRestaurantBulk
);

// router.delete("/api/restaurants/", restController.deleteAllRestaurants);

router.delete("/api/restaurants/:id", restController.deleteOneRestaurant);

router.get("/api/restaurants", restController.getAllRestaurants);

router.get("/api/restaurants/:id", restController.getOneRestaurant);

router.put("/api/restaurants/:id", restController.modifyRestaurant);

export default router;
