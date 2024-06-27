import express from "express";

import resTypeController from "../controllers/restaurantTypeController";

const router = express.Router();

router.post("/api/restypes", resTypeController.addType);

// router.delete("/api/restypes/", restController.deleteAllRestaurants);

router.delete("/api/restypes/:id", resTypeController.deleteOneType);

router.get("/api/restypes", resTypeController.getAllResTypes);

router.get("/api/restypes/restaurant/:id", resTypeController.getCurrentTypes);

router.get("/api/restypes/:id", resTypeController.getOneResType);

router.put("/api/restypes/:id", resTypeController.modifyResType);

export default router;
