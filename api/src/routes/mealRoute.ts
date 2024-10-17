/* Import Statements */
//Import Express Middleware
import express from "express";
//Import Controllers
import mealController from "../controllers/mealController";

//Initialize Router
const router = express.Router();
/* Routes */
//Route for adding item
router.post("/api/meals", mealController.addMeal);
//Route for deleting a single item
router.delete("/api/meals/:id", mealController.deleteOneMeal);
//Route for deleting all items
router.delete("/api/meals", mealController.deleteAllMeals);
//Route for getting all items
router.get("/api/meals", mealController.getAllMeals);
//Route for getting a single item
router.get("/api/meals/:id", mealController.getOneMeal);
//Route for modifying a single item
router.put("/api/meals/:id", mealController.modifyMeal);
/* End Routes */

/* Export Statement */
export default router;
