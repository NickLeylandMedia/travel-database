/* Import Statements */
//Import Express Middleware
import express from "express";
//Import Controllers
import resTagController from "../controllers/restaurant_tags_cont";

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
//Route for modifying a single item
router.put("/api/restags/:id", resTagController.modifyResTag);
/* End Routes */

/* Export Statement */
export default router;
