/* Import Express Middleware */
import { Request, Response, NextFunction } from "express";

//Database Import
import db from "../db";

//Import Validators
import { validateRestaurantTag } from "../validators/restaurantTagValidator";

//Import Logger
import logger from "./utility/logController";

/* Controller Functions */
//Add Item to Database
const addResTag = async (req: Request, res: Response, next: NextFunction) => {
  //Validate Request
  if (!validateRestaurantTag(req.body)) {
    //Log Error
    logger.error("Invalid request structure.");
    //Throw Error if Request is Invalid
    return res.json({
      Error: "Invalid request structure.",
    });
  }

  try {
    //Add Item To db
    const query = await db.query(
      "insert into restaurant_tags (name, description) values ($1, $2) returning *",
      [req.body.name, req.body.description]
    );
    //Data string conversion for logging
    const dataString = JSON.stringify(query.rows[0]);
    //Log Success Result
    logger.info(`New tag added: ${dataString}`);
    //Return Success Result
    return res.json({ message: "New tag added!", data: query.rows[0] });
  } catch (err) {
    //Data string conversion for logging
    const dataString = JSON.stringify(err);
    //Log Error
    logger.error(`Request Failed: ${dataString}`);
    //Throw Error
    return res.json({ error: "Request Failed", info: err });
  }
};

// Delete All Items from Database
const deleteAllResTags = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Delete All Items From db
    const query = await db.query("truncate restaurant_tags", []);
    //Log Success Result
    logger.warning("All restaurant tags deleted.");
    //Return Success Result
    return res.json({
      message: "All restaurant tags deleted.",
      deleted: query.rows,
    });
  } catch (err) {
    //Stringify Error
    const dataString = JSON.stringify(err);
    //Log Error
    logger.error(`Request Failed: ${dataString}`);
    //Throw Error
    return res.json({ error: "Request Failed", info: err });
  }
};

//Delete One Item from Database
const deleteOneResTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Delete Item From db
    const query = await db.query(
      "delete from restaurant_tags where id = $1 returning *",
      [req.params.id || "not entered"]
    );

    //Verify that requested data exists
    if (query.rowCount === 0) {
      //Log Error
      logger.error("Invalid ID, tag does not exist.");
      //Throw Error
      return res.json({ error: "Invalid ID" });
    }

    //Data string conversion for logging
    const dataString = JSON.stringify(query.rows[0]);
    //Log Success Result
    logger.warning(`Restaurant Tag deleted: ${dataString}`);
    //Return Success Result
    return res.json({
      message: "Restaurant Tag Deleted",
      deleted: query.rows[0],
    });
  } catch (err) {
    //Throw Error
    return res.json({ error: "Request Failed", info: err });
  }
};

//Get All Items from Database
const getAllResTags = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Fetch Items From db
    const results = await db.query("select * from restaurant_tags", "");
    //Log Success Result
    logger.info("All tags fetched.");
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
const getOneResTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Fetch Item From db
    const result = await db.query(
      "select * from restaurant_tags where id = $1",
      [req.params.id || "not entered"]
    );
    //Verify That Requested Data Exists
    if (result.rowCount === 0) {
      //Log Error
      logger.error("Invalid ID, restaurant tag does not exist.");
      //Throw Error
      return res.json({ error: "Invalid ID" });
    }
    //Data string conversion for logging
    const dataString = JSON.stringify(result.rows[0]);
    //Log Success Result
    logger.info(`Restaurant tag retrieved: ${dataString}`);
    //Return Success Result
    return res.status(200).json(result.rows[0]);
  } catch (err) {
    //Throw Error
    return res.json({ error: "Request Failed", info: err });
  }
};

//Modify Item in Database
const modifyResTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!validateRestaurantTag(req.body)) {
    //Log Error
    logger.error("Invalid request structure.");
    //Throw Error if Request is Invalid
    return res.json({
      Error: "Invalid request structure.",
    });
  }

  try {
    //Modify Item In db
    const query = await db.query(
      "update restaurant_tags set name = $1, description = $2, last_edited = $3 where id = $4 returning *",
      [
        req.body.name,
        req.body.description,
        new Date(Date.now()).toISOString(),
        req.params.id,
      ]
    );
    //Data string conversion for logging
    const dataString = JSON.stringify(query.rows[0]);
    //Log Success Result
    logger.info(`Restaurant Tag modified: ${dataString}`);
    //Return Success Result
    return res.json({
      message: "Restaurant Tag Modified!",
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

const getCurrentTags = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Fetch Items From db
    const results = await db.query(
      `select restaurants_types_join.restaurant_type_id, restaurant_types.name from public.restaurants_types_join inner join public.restaurant_types on restaurants_types_join.restaurant_type_id=restaurant_types.id where (restaurants_types_join.restaurant_id=$1);`,
      [req.params.id]
    );
    //Log Success Result
    logger.info(`Tags fetched for restaurant with ID ${req.params.id}.`);
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
/* End Controller Functions */

/* Export Controller Functions */
export default {
  addResTag,
  deleteAllResTags,
  deleteOneResTag,
  getAllResTags,
  getOneResTag,
  modifyResTag,
  getCurrentTags,
};
