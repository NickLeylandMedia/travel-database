import { Request, Response, NextFunction } from "express";

//Database Import
import db from "../db";

//Import Validators
import { validateRestaurantType } from "../validators/restaurantTypeValidator";

//Import Logger
import logger from "./utility/logController";

/* Controller Functions */
const addType = async (req: Request, res: Response, next: NextFunction) => {
  //Validate Request
  if (!validateRestaurantType(req.body)) {
    //Log Error
    logger.error("Invalid request structure.");
    //Throw Error if Request is Invalid
    return res.json({
      error: "Invalid request structure.",
    });
  }

  try {
    //Add Item To db
    const query = await db.query(
      "insert into restaurant_types (name, description) values ($1, $2) returning *",
      [req.body.name, req.body.description]
    );
    //Data string conversion for logging
    const dataString = JSON.stringify(query.rows[0]);
    //Log Success Result
    logger.info(`New type added: ${dataString}`);
    //Return Success Result
    return res.json({ message: "New type added!", data: query.rows[0] });
  } catch (err) {
    //Data string conversion for logging
    const dataString = JSON.stringify(err);
    //Log Error
    logger.error(`Request Failed: ${dataString}`);
    //Throw Error
    return res.json({ error: "Request Failed", info: err });
  }
};

const deleteOneType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Delete Item From db
    const query = await db.query(
      "delete from restaurant_types where id = $1 returning *",
      [req.params.id]
    );
    //Verify that requested data exists
    if (query.rowCount === 0) {
      //Log Error
      logger.error("Invalid ID, type does not exist.");
      //Throw Error
      return res.json({ error: "Invalid ID" });
    }
    //Data string conversion for logging
    const dataString = JSON.stringify(query.rows[0]);
    //Log Success Result
    logger.info(`Type deleted: ${dataString}`);
    //Return Success Result
    return res.json({
      message: "Restaurant Type Deleted",
      deleted: query.rows[0],
    });
  } catch (err) {
    //Data string conversion for logging
    const dataString = JSON.stringify(err);
    //Log Error
    logger.error(`Request Failed: ${dataString}`);
    //Throw Error
    return res.json({ error: "Request Failed", info: err });
  }
};

const getAllResTypes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Fetch Items From db
    const results = await db.query("select * from restaurant_types", "");
    //Log Success Result
    logger.info("All types fetched.");
    //Return Success Result
    return res.status(200).json(results.rows);
  } catch (err) {
    //Data string conversion for logging
    const dataString = JSON.stringify(err);
    //Log Error
    logger.error(`Request Failed: ${dataString}`);
    //Throw Error
    return res.json({ error: "Request Failed", info: err });
  }
};

const getOneResType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Fetch Item From db
    const result = await db.query(
      "select * from restaurant_types where id = $1",
      [req.params.id]
    );
    //Verify That Requested Data Exists
    if (result.rowCount === 0) {
      //Log Error
      logger.error("Invalid ID, restaurant type does not exist.");
      //Throw Error
      return res.json({ error: "Invalid ID" });
    }
    //Data string Conversion for logging
    const dataString = JSON.stringify(result.rows[0]);
    //Log Success Result
    logger.info(`Type retrieved: ${dataString}`);
    //Return Success Result
    return res.status(200).json(result.rows[0]);
  } catch (err) {
    //Data string conversion for logging
    const dataString = JSON.stringify(err);
    //Log Error
    logger.error(`Request Failed: ${dataString}`);
    //Throw Error
    return res.json({ error: "Request Failed", info: err });
  }
};

//Modify Item In db
const modifyResType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Modify Item In db
    const query = await db.query(
      "update restaurant_types set name = $1, description = $2, last_edited = $3 where id = $4 returning *",
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
    logger.info(`Type modified: ${dataString}`);
    //Return Success Result
    return res.json({
      message: "Restaurant Type Modified!",
      restaurant_type: query.rows[0],
    });
  } catch (err) {
    //Data string conversion for logging
    const dataString = JSON.stringify(err);
    //Log Error
    logger.error(`Request Failed: ${dataString}`);
    //Throw Error
    return res.json({ error: "Request Failed", info: err });
  }
};

const getCurrentTypes = async (
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
    logger.info(`Types fetched for restaurant with ID ${req.params.id}.`);
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

export default {
  addType,
  deleteOneType,
  getAllResTypes,
  modifyResType,
  getOneResType,
  getCurrentTypes,
};
