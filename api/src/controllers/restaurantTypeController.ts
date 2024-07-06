import { Request, Response, NextFunction } from "express";

//Database Import
import db from "../db";

//Import Validators
import { validateRestaurantType } from "../validators/restaurantTypeValidator";

//Import Logger
import log from "./local/logController";

/* Controller Functions */
const addType = async (req: Request, res: Response, next: NextFunction) => {
  //Validate Request
  if (!validateRestaurantType(req.body)) {
    log.addLogItem(
      "CREATE",
      "Failed to add new restaurant type.",
      "ERROR",
      JSON.stringify(req.body),
      JSON.stringify("Invalid request structure.")
    );

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

    //Success Result
    log.addLogItem(
      "CREATE",
      "New restaurant type added.",
      "INFO",
      JSON.stringify(req.body),
      JSON.stringify(query.rows[0])
    );

    return res.json({ message: "New type added!", data: query.rows[0] });
  } catch (err) {
    log.addLogItem(
      "CREATE",
      "Failed to add new restaurant type.",
      "ERROR",
      JSON.stringify(req.body),
      JSON.stringify(err)
    );

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
      log.addLogItem(
        "DELETE",
        "Failed to delete restaurant type.",
        "ERROR",
        JSON.stringify(req.params.id),
        JSON.stringify("Invalid ID")
      );

      //Throw Error
      return res.json({ error: "Invalid ID" });
    }

    //Success Result
    log.addLogItem(
      "DELETE",
      "Restaurant Type Deleted.",
      "INFO",
      JSON.stringify(req.params.id),
      JSON.stringify(query.rows[0])
    );

    return res.json({
      message: "Restaurant Type Deleted",
      deleted: query.rows[0],
    });
  } catch (err) {
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
    //Success Result
    log.addLogItem(
      "READ",
      "All restaurant types fetched.",
      "INFO",
      JSON.stringify(""),
      JSON.stringify(results.rows)
    );

    return res.status(200).json(results.rows);
  } catch (err) {
    log.addLogItem(
      "READ",
      "Failed to fetch all restaurant types.",
      "ERROR",
      JSON.stringify(""),
      JSON.stringify(err)
    );

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
      log.addLogItem(
        "READ",
        "Failed to fetch restaurant type.",
        "ERROR",
        JSON.stringify(req.params.id),
        JSON.stringify("Invalid ID")
      );

      //Throw Error
      return res.json({ error: "Invalid ID" });
    }

    //Success Result
    log.addLogItem(
      "READ",
      "Restaurant Type fetched.",
      "INFO",
      JSON.stringify(req.params.id),
      JSON.stringify(result.rows[0])
    );

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    log.addLogItem(
      "READ",
      "Failed to fetch restaurant type.",
      "ERROR",
      JSON.stringify(req.params.id),
      JSON.stringify(err)
    );

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
    //Success Result
    log.addLogItem(
      "UPDATE",
      "Restaurant Type Modified.",
      "INFO",
      JSON.stringify(req.body),
      JSON.stringify(query.rows[0])
    );

    return res.json({
      message: "Restaurant Type Modified!",
      restaurant_type: query.rows[0],
    });
  } catch (err) {
    log.addLogItem(
      "UPDATE",
      "Failed to modify restaurant type.",
      "ERROR",
      JSON.stringify(req.body),
      JSON.stringify(err)
    );

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
    //Success Result
    log.addLogItem(
      "READ",
      `All types fetched for restaurant with ID ${req.params.id}.`,
      "INFO",
      JSON.stringify(req.params.id),
      JSON.stringify(results.rows)
    );

    return res.status(200).json(results.rows);
  } catch (err) {
    log.addLogItem(
      "READ",
      `Failed to fetch all types for restaurant with ID ${req.params.id}.`,
      "ERROR",
      JSON.stringify(req.params.id),
      JSON.stringify(err)
    );

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
