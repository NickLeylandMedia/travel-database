/* Import Express Middleware */
import { Request, Response, NextFunction } from "express";

//Database Import
import db from "../db";

//Import Validators
import { validateRestaurantReview } from "../validators/restaurantReviewValidator";

//Import Logger
import logger from "./utility/logController";

/* Controller Functions */
//Add Item to Database
const addResReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Validate Request
  if (!validateRestaurantReview(req.body)) {
    logger.error("Invalid request structure.");
    //Throw Error if Request is Invalid
    return res.json({
      Error: "Invalid request structure.",
    });
  }

  try {
    //Add Item To db
    const query = await db.query(
      "insert into restaurant_reviews (restaurant_id, title, content, score10, date_visited) values ($1, $2, $3, $4, $5) returning *",
      [
        req.body.restaurant_id,
        req.body.title,
        req.body.content,
        req.body.score10,
        req.body.date_visited,
      ]
    );

    //JSON.stringify for logging
    const dataString = JSON.stringify(query.rows[0]);
    //Log Success Result
    logger.info(`New review added: ${dataString}`);
    //Return Success Result
    return res.json({ message: "New review added!", data: query.rows[0] });
  } catch (err) {
    //Throw Error
    return res.json({ error: "Request Failed", info: err });
  }
};

// Delete All Items from Database
const deleteAllResReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Delete All Items From db
    const query = await db.query("truncate restaurant_reviews", []);
    //Success Result
    logger.warning("All restaurant reviews deleted!");
    //Return Success Result
    return res.json({
      message: "All restaurant reviews deleted!",
      data: query.rows,
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

//Delete One Item from Database
const deleteOneResReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Delete Item From db
    const query = await db.query(
      "delete from restaurant_reviews where id = $1 returning *",
      [req.params.id]
    );

    //Verify that requested data exists
    if (query.rowCount === 0) {
      //Log Error
      logger.error("Invalid ID, restaurant review does not exist.");
      //Throw Error
      return res.json({ error: "Invalid ID" });
    }
    //Data string conversion for logging
    const dataString = JSON.stringify(query.rows[0]);
    //Log Success Result
    logger.warning(`Restaurant Review deleted: ${dataString}`);
    //Return Success Result
    return res.json({
      message: "Restaurant Review Deleted",
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

//Get All Items from Database
const getAllResReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Fetch Items From db
    const results = await db.query("select * from restaurant_reviews", "");
    //Success Result
    logger.info("All restaurant reviews fetched.");
    //Return Success Result
    return res.status(200).json(results.rows);
  } catch (err) {
    //Stringify Error for Logging
    const dataString = JSON.stringify(err);
    //Log Error
    logger.error(`Request Failed: ${dataString}`);
    //Throw Error
    return res.json({ error: "Request Failed", info: err });
  }
};

//Get One Item from Database
const getOneResReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Fetch Item From db
    const result = await db.query(
      "select * from restaurant_reviews where id = $1",
      [req.params.id]
    );
    //Verify That Requested Data Exists
    if (result.rowCount === 0) {
      //Log Error
      logger.error("Invalid ID, restaurant review does not exist.");
      //Throw Error
      return res.json({ error: "Invalid ID" });
    }
    //Data string conversion for logging
    const dataString = JSON.stringify(result.rows[0]);
    //Log Success Result
    logger.info(`Restaurant Review retrieved: ${dataString}`);
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
const modifyResReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Modify Item In db
    const query = await db.query(
      "update restaurant_reviews set restaurant_id = $1, title = $2, content = $3, score10 = $4, date_visited = $5, last_edited = $6 where id = $7 returning *",
      [
        req.body.restaurant_id,
        req.body.title,
        req.body.content,
        req.body.score10 || 0,
        req.body.date_visited || null,
        new Date(Date.now()).toISOString(),
        req.params.id,
      ]
    );
    //Data string conversion for logging
    const dataString = JSON.stringify(query.rows[0]);
    //Log Success Result
    logger.info(`Restaurant Review modified: ${dataString}`);
    //Return Success Result
    return res.json({
      message: "Restaurant Review Modified!",
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
  addResReview,
  deleteAllResReviews,
  deleteOneResReview,
  getAllResReviews,
  getOneResReview,
  modifyResReview,
};
