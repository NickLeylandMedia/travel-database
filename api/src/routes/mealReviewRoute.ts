/* Import Statements */
//Import Express Middleware
import express from "express";
//Import Controllers
import mealReviewController from "../controllers/mealReviewController";

//Initialize Router
const router = express.Router();
/* Routes */
//Route for adding item
router.post("/api/mealreview", mealReviewController.addMealReview);
//Route for deleting a single item
router.delete("/api/mealreview/:id", mealReviewController.deleteOneMealReview);
//Route for getting all items
router.get("/api/mealreview", mealReviewController.getAllMealReviews);
//Route for getting a single item
router.get("/api/mealreview/:id", mealReviewController.getOneMealReview);
//Route for modifying a single item
router.put("/api/mealreview/:id", mealReviewController.modifyMealReview);
/* End Routes */

/* Export Statement */
export default router;
