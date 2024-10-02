import { Request, Response, NextFunction } from "express";

//Database Import
import db from "../db";

//Import Validators
import { validateRestaurant } from "../validators/restaurantValidator";

//Import Logger
import logger from "./utility/logController";

/* Controller Functions */
//Add Item to Database
const addRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Validate Request
  if (!validateRestaurant(req.body)) {
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
      "insert into restaurants (name, city, state, coord, description, picture, zip, address, active, seasonal, month_closed_text, month_closed_numeric, year_closed, summary) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) returning *",
      [
        req.body.name,
        req.body.city,
        req.body.state,
        req.body.coord,
        req.body.description,
        req.body.picture,
        req.body.zip,
        req.body.address,
        req.body.active,
        req.body.seasonal,
        req.body.month_closed_text,
        req.body.month_closed_numeric,
        req.body.year_closed,
        req.body.summary,
      ]
    );
    //Data string conversion for logging
    const dataString = JSON.stringify(query.rows[0]);
    //Log Success Result
    logger.info(`New restaurant added: ${dataString}`);
    //Return Success Result
    return res.json({
      message: "New restaurant added!",
      data: query.rows[0],
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

//Delete All Items from Database
const deleteAllRestaurants = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = db.query("truncate restaurants", []);
    //Log Success Result
    logger.warning("All restaurants deleted!");
    //Return Success Result
    return res.json({ message: "All Restaurants deleted!" });
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
const deleteOneRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Delete Item From db
    const query = await db.query(
      "delete from restaurants where id = $1 returning *",
      [req.params.id]
    );

    //Verify that requested data exists
    if (query.rowCount === 0) {
      //Log Error
      logger.error("Invalid ID, restaurant does not exist.");
      //Throw Error
      return res.json({ error: "Invalid ID" });
    }

    //Data string conversion for logging
    const dataString = JSON.stringify(query.rows[0]);
    //Log Success Result
    logger.warning(`Restaurant deleted: ${dataString}`);
    //Return Success Result
    return res.json({ message: "Restaurant Deleted", data: query.rows[0] });
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
const getAllRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Fetch Items From db
    const results = await db.query("select * from restaurants", "");
    //Log Success Result
    logger.info("All restaurants fetched.");
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

//Get One Item from Database
const getOneRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Fetch Item From db
    const result = await db.query("select * from restaurants where id = $1", [
      req.params.id,
    ]);
    //Verify That Requested Data Exists
    if (result.rowCount === 0) {
      //Log Error
      logger.error("Invalid ID, restaurant does not exist.");
      //Throw Error
      return res.json({ error: "Invalid ID" });
    }
    //Data string conversion for logging
    const dataString = JSON.stringify(result.rows[0]);
    //Log Success Result
    logger.info(`Restaurant retrieved: ${dataString}`);
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

//Modify Item in Database
const modifyRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Modify Item In db
    const query = await db.query(
      "update restaurants set name = $1, city = $2, state = $3, coord = $4, description = $5, picture = $6, zip = $7, address = $8, active = $9, seasonal = $10, month_closed_text = $11, month_closed_numeric = $12, year_closed = $13, last_edited = $14, summary = $15 where id = $16 returning *",
      [
        req.body.name,
        req.body.city,
        req.body.state,
        req.body.coord,
        req.body.description,
        req.body.picture,
        req.body.zip,
        req.body.address,
        req.body.active,
        req.body.seasonal,
        req.body.month_closed_text,
        req.body.month_closed_numeric,
        req.body.year_closed,
        new Date(Date.now()).toISOString(),
        req.body.summary,
        req.params.id,
      ]
    );
    //Data string conversion for logging
    const dataString = JSON.stringify(query.rows[0]);
    //Success Result
    logger.info(`Restaurant modified: ${dataString}`);
    //Return Success Result
    return res.json({
      message: "Restaurant modified!",
      data: query.rows[0],
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

export default {
  addRestaurant,
  deleteAllRestaurants,
  deleteOneRestaurant,
  getAllRestaurants,
  getOneRestaurant,
  modifyRestaurant,
};
