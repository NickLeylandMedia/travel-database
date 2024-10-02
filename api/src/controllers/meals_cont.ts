/* Import Express Middleware */
import { Request, Response, NextFunction } from "express";

/* Import Database Connection */
import db from "../db";

/* Import Validator Functions */
import { validateMeal } from "../validators/mealValidator";

/* Import Logger */
import logger from "./utility/logController";

/* Controller Functions */
//Add Item to Database
const addMeal = async (req: Request, res: Response, next: NextFunction) => {
  //Validate Request
  if (!validateMeal(req.body)) {
    //Log Error
    logger.error("Invalid request structure.");
    //Throw Error if Request is Invalid
    return res.json({ error: "Invalid request structure." });
  }

  try {
    //Add Item To db
    const query = await db.query(
      "insert into meals (name, description, restaurant_id, price) values ($1, $2, $3, $4) returning *",
      [
        req.body.name,
        req.body.description,
        req.body.restaurant_id,
        req.body.price,
      ]
    );
    //Data string conversion for logging
    const dataString = JSON.stringify(query.rows[0]);
    //Log Success Result
    logger.info(`New meal added: ${dataString}`);
    //Return Success Result
    return res.json({
      message: "New meal added!",
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
const deleteAllMeals = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = db.query("truncate meals", []);
    //Log Success Result
    logger.warning("All meals deleted!");
    //Success Result
    return res.json({ message: "All meals deleted!" });
  } catch (err) {
    //Json conversion for logging
    const dataString = JSON.stringify(err);
    //Log Error
    logger.error(`Request Failed: ${dataString}`);
    //Throw Error
    return res.json({ error: "Request Failed", info: err });
  }
};

//Delete One Item from Database
const deleteOneMeal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Delete Item From db
    const query = await db.query(
      "delete from meals where id = $1 returning *",
      [req.params.id]
    );
    //Verify that requested data exists
    if (query.rowCount === 0) {
      //Log Error
      logger.error("Invalid ID, meal does not exist.");
      //Throw Error
      return res.json({ error: "Invalid ID" });
    }
    //Log Success Result
    logger.info(`Meal with id ${req.params.id} deleted.`);
    //Return Success Result
    return res.json({ message: "Meal deleted.", data: query.rows[0] });
  } catch (err) {
    //Json conversion for logging
    const dataString = JSON.stringify(err);
    //Log Error
    logger.error(`Request Failed: ${dataString}`);
    //Throw Error
    return res.json({ error: "Request Failed", info: err });
  }
};

//Get All Items from Database
const getAllMeals = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //Fetch Items From db
    const results = await db.query("select * from meals", "");
    //Log Success Result
    logger.info("All meals retrieved.");
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
const getOneMeal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //Fetch Item From db
    const result = await db.query("select * from meals where id = $1", [
      req.params.id,
    ]);
    //Verify That Requested Data Exists
    if (result.rowCount === 0) {
      //Log Error
      logger.error("Invalid ID, meal does not exist.");
      //Throw Error
      return res.json({ error: "Invalid ID" });
    }
    //Data string conversion for logging
    const dataString = JSON.stringify(result.rows[0]);
    //Log Success Result
    logger.info(`Meal retrieved: ${dataString}`);
    //Return Success Result
    return res.status(200).json(result.rows[0]);
  } catch (err) {
    //Throw Error
    return res.json({ error: "Request Failed", info: err });
  }
};

//Update One Item in Database
const modifyMeal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //Validate Request
    if (!validateMeal(req.body)) {
      logger.error("Invalid request structure.");
      //Throw Error if Request is Invalid
      return res.json({ error: "Invalid request structure." });
    }
    //Modify Item In db
    const query = await db.query(
      "update meals set name = $1, description = $2, restaurant_id = $3, price = $4, last_edited = $5 where id = $6 returning *",
      [
        req.body.name,
        req.body.description,
        req.body.restaurant_id,
        req.body.price,
        new Date(Date.now()).toISOString(),
        req.params.id,
      ]
    );
    //Data string conversion for logging
    const dataString = JSON.stringify(query.rows[0]);
    //Log Success Result
    logger.info(`Meal modified: ${dataString}`);
    //Return Success Result
    return res.json({
      message: "Meal modified!",
      data: query.rows[0],
    });
  } catch (err) {
    //Throw Error
    return res.json({ error: "Request Failed", info: err });
  }
};
/* End Controller Functions */

/* Export Controller Functions */
export default {
  addMeal,
  deleteAllMeals,
  deleteOneMeal,
  getAllMeals,
  getOneMeal,
  modifyMeal,
};
