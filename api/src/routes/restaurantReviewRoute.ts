/* Import Statements */
//Import Express Middleware
import express from "express";
//Import Controllers
import resReviewController from "../controllers/restaurantReviewController";

//Initialize Router
const router = express.Router();
/* Routes */
//Route for adding item
router.post("/api/resreviews", resReviewController.addResReview);
//Route for deleting a single item
router.delete("/api/resreviews/:id", resReviewController.deleteOneResReview);
//Route for getting all items
router.get("/api/resreviews", resReviewController.getAllResReviews);
//Route for getting a single item
router.get("/api/resreviews/:id", resReviewController.getOneResReview);
//Route for modifying a single item
router.put("/api/resreviews/:id", resReviewController.modifyResReview);
/* End Routes */

/* Export Statement */
export default router;
