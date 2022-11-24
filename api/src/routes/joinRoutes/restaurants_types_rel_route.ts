/* Import Statements */
//Import Express Middleware
import express from "express";
//Import Controllers
import resTypeRelController from "../../controllers/joinControllers/restaurants_types_rel_cont";

//Initialize Router
const router = express.Router();
/* Routes */
//Route for adding item
router.post("/api/restyperel", resTypeRelController.addResTypeRel);
//Route for deleting a single item
router.delete("/api/restyperel/:id", resTypeRelController.deleteOneResTypeRel);
//Route for getting all items
router.get("/api/restyperel", resTypeRelController.getAllResTypeRels);
//Route for getting a single item
router.get("/api/restyperel/:id", resTypeRelController.getOneResTypeRel);
//Route for modifying a single item
router.put("/api/restyperel/:id", resTypeRelController.modifyResTypeRel);
/* End Routes */

/* Export Statement */
export default router;
