/* Import Express Middleware */
import { Request, Response, NextFunction } from "express";

/* Import Database Connection */
import db from "../db";

/* Import Validator Functions */
import { validateMealReview } from "../validators/mealReviewValidator";

/* Import Logger */
import logger from "./utility/logController";

/* Controller Functions */
//Add Item to Database
const addMealReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Validate Request
  if (!validateMealReview(req.body)) {
    //Log Error
    logger.error("Invalid request structure.");
    //Throw Error if Request is Invalid
    return res.json({ error: "Invalid request structure." });
  }
  try {
    //Add Item To db
    const query = await db.query(
      "insert into meal_reviews (title, content, score10, meal_id, date_eaten) values ($1, $2, $3, $4, $5) returning *",
      [
        req.body.title,
        req.body.content,
        req.body.score10,
        req.body.meal_id,
        req.body.date_eaten,
      ]
    );
    //Data string conversion for logging
    const dataString = JSON.stringify(query.rows[0]);
    //Log Success Result
    logger.info(`New meal review added: ${dataString}`);
    //Return Success Result
    return res.json({
      message: "New meal review added!",
      data: query.rows[0],
    });
    //Catch Error
  } catch (err) {
    //Data string conversion for logging
    const dataString = JSON.stringify(err);
    //Log Error
    logger.error(`Request Failed: ${dataString}`);
    //Throw Error
    return res.json({ error: "Request Failed", info: err });
  }
};

//Delete All Items from Database
const deleteAllMealReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = db.query("truncate meal_reviews", []);
    //Log Success Result
    logger.warning("All meal reviews deleted!");
    //Return Success Result
    return res.json({ message: "All meal reviews deleted!" });
  } catch (err) {
    //Data string conversion for logging
    const dataString = JSON.stringify(err);
    //Log Error
    logger.error(`Request Failed: ${dataString}`);
    //Throw Error
    return res.json({ error: "Request Failed", info: err });
  }
};

//Delete One Item from Database
const deleteOneMealReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Delete Item From db
    const query = await db.query(
      "delete from meal_reviews where id = $1 returning *",
      [req.params.id]
    );
    //Verify that requested data exists
    if (query.rowCount === 0) {
      //Log Error
      logger.error("Invalid ID, meal review does not exist.");
      //Throw Error
      return res.json({ error: "Invalid ID" });
    }
    //Data string conversion for logging
    const dataString = JSON.stringify(query.rows[0]);
    //Log Success Result
    logger.warning(`Meal review deleted: ${dataString}`);
    //Return Success Result
    return res.json({ message: "Meal Review Deleted", data: query.rows[0] });
  } catch (err) {
    //Data string conversion for logging
    const dataString = JSON.stringify(err);
    //Log Error
    logger.error(`Request Failed: ${dataString}`);
    //Throw Error
    return res.json({ error: "Request Failed", info: err });
  }
};

//Get All Items from Database
const getAllMealReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Fetch Items From db
    const results = await db.query("select * from meal_reviews", "");
    //Log Success Result
    logger.info("All meal reviews retrieved.");
    //Success Result
    return res.status(200).json(results.rows);
  } catch (err) {
    //Json conversion for logging
    const dataString = JSON.stringify(err);
    //Log Error
    logger.error(`Request Failed: ${dataString}`);
    //Throw Error
    return res.json({ error: "Request Failed", info: err });
  }
};

//Get One Item from Database
const getOneMealReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Fetch Item From db
    const result = await db.query("select * from meal_reviews where id = $1", [
      req.params.id,
    ]);
    //Verify That Requested Data Exists
    if (result.rowCount === 0) {
      //Log Error
      logger.error("Invalid ID, meal review does not exist.");
      //Throw Error
      return res.json({ error: "Invalid ID" });
    }
    //Data string conversion for logging
    const dataString = JSON.stringify(result.rows[0]);
    //Log Success Result
    logger.info(`Meal Review retrieved: ${dataString}`);
    //Return Success Result
    return res.status(200).json(result.rows[0]);
  } catch (err) {
    //Stringify Error for Logging
    const dataString = JSON.stringify(err);
    //Log Error
    logger.error(`Request Failed: ${dataString}`);
    //Throw Error
    return res.json({ error: "Request Failed", info: err });
  }
};

//Update One Item in Database
const modifyMealReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Modify Item In db
    const query = await db.query(
      "update meal_reviews set title = $1, content = $2, score10 = $3, meal_id = $4, date_eaten = $5, last_edited = $6 where id = $7 returning *",
      [
        req.body.title || "Not Entered",
        req.body.content || "Not Entered",
        req.body.score10 || "Not Entered",
        req.body.meal_id || 0,
        req.body.date_eaten || null,
        new Date(Date.now()).toISOString(),
        req.params.id,
      ]
    );
    //Data string conversion for logging
    const dataString = JSON.stringify(query.rows[0]);
    //Log Success Result
    logger.info(`Meal review modified: ${dataString}`);
    //Return Success Result
    return res.json({
      message: "Meal Review Modified!",
      data: query.rows[0],
    });
  } catch (err) {
    //Stringify Error for Logging
    const dataString = JSON.stringify(err);
    //Log Error
    logger.error(`Request Failed: ${dataString}`);
    //Throw Error
    return res.json({ error: "Request Failed", info: err });
  }
};
/* End Controller Functions */

/* Export Controller Functions */
export default {
  addMealReview,
  deleteAllMealReviews,
  deleteOneMealReview,
  getAllMealReviews,
  getOneMealReview,
  modifyMealReview,
};
