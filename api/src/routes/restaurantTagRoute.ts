/* Import Statements */
//Import Express Middleware
import express from "express";
//Import Controllers
import resTagController from "../controllers/restaurantTagController";

//Initialize Router
const router = express.Router();
/* Routes */
//Route for adding item
router.post("/api/restags", resTagController.addResTag);
//Route for deleting a single item
router.delete("/api/restags/:id", resTagController.deleteOneResTag);
//Route for getting all items
router.get("/api/restags", resTagController.getAllResTags);
//Route for getting a single item
router.get("/api/restags/:id", resTagController.getOneResTag);
//Route for getting all items for a single restaurant
router.get("/api/restags/restaurant/:id", resTagController.getCurrentTags);
//Route for modifying a single item
router.put("/api/restags/:id", resTagController.modifyResTag);
/* End Routes */

/* Export Statement */
export default router;
