import express from "express";

import restController from "../controllers/restaurants_cont";

const router = express.Router();

router.post("/api/restaurants", restController.addRestaurant);

// router.delete("/api/restaurants/", restController.deleteAllRestaurants);

router.delete("/api/restaurants/:id", restController.deleteOneRestaurant);

router.get("/api/restaurants", restController.getAllRestaurants);

router.get("/api/restaurants/:id", restController.getOneRestaurant);

router.put("/api/restaurants/:id", restController.modifyRestaurant);

export default router;
