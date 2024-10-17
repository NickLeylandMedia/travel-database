/* Import Statements */
//Import Express Middleware
import express from "express";
//Import Controllers
import resTagRelController from "../../controllers/joinControllers/restaurantTagRelationController";

//Initialize Router
const router = express.Router();
/* Routes */
//Route for adding item
router.post("/api/restagrel", resTagRelController.addResTagRel);
//Route for deleting a single item
router.delete("/api/restagrel/:id", resTagRelController.deleteOneResTagRel);
//Route for getting all items
router.get("/api/restagrel", resTagRelController.getAllResTagRels);
//Route for getting a single item
router.get("/api/restagrel/:id", resTagRelController.getOneResTagRel);
//Route for modifying a single item
router.put("/api/restagrel/:id", resTagRelController.modifyResTagRel);
/* End Routes */

/* Export Statement */
export default router;
