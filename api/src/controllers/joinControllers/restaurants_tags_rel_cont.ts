/* Import Express Middleware */
import { Request, Response, NextFunction } from "express";

//Database Import
import db from "../../db";

//Import Validators
import { validateResTagRel } from "../../validators/joinValidators/restaurants_tags_rel_val";

//Import Logger
import log from "../local/logController";

/* Controller Functions */
//Add Item to Database
const addResTagRel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Validate Request
  if (!validateResTagRel(req.body)) {
    log.addLogItem(
      "CREATE",
      "Failed to add new restaurant-tag relationship.",
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
      "insert into restaurants_tags_join (restaurant_id, restaurant_tag_id) values ($1, $2) returning *",
      [req.body.restaurant_id, req.body.restaurant_tag_id]
    );

    //Success Result
    log.addLogItem(
      "CREATE",
      "New restaurant-tag relationship added.",
      "INFO",
      JSON.stringify(req.body),
      JSON.stringify(query.rows[0])
    );

    return res.json({
      message: "New restaurant-tag relationship added!",
      data: query.rows[0],
    });
  } catch (err) {
    log.addLogItem(
      "CREATE",
      "Failed to add new restaurant-tag relationship.",
      "ERROR",
      JSON.stringify(req.body),
      JSON.stringify(err)
    );

    //Throw Error
    return res.json({ error: "Request Failed", info: err });
  }
};

//Delete All Items from Database
const deleteAllResTagRels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Delete All Items From db
    const query = await db.query("truncate restaurants_tags_join", []);

    //Success Result
    log.addLogItem(
      "DELETE",
      "All Restaurant - Tag Relationships Deleted",
      "INFO",
      JSON.stringify("All Gone"),
      JSON.stringify(query.rows)
    );

    return res.json({
      message: "All Restaurant - Tag Relationships Deleted",
      deleted: query.rows,
    });
  } catch (err) {
    log.addLogItem(
      "DELETE",
      "Failed to delete all restaurant - tag relationships.",
      "ERROR",
      JSON.stringify("All Gone"),
      JSON.stringify(err)
    );

    //Throw Error
    return res.json({ error: "Request Failed", info: err });
  }
};

//Delete One Item from Database
const deleteOneResTagRel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Delete Item From db
    const query = await db.query(
      "delete from restaurants_tags_join where id = $1 returning *",
      [req.params.id]
    );

    //Verify that requested data exists
    if (query.rowCount === 0) {
      log.addLogItem(
        "DELETE",
        "Failed to delete restaurant - tag relationship.",
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
      "Restaurant - Tag Relationship Deleted",
      "INFO",
      JSON.stringify(req.params.id),
      JSON.stringify(query.rows[0])
    );

    return res.json({
      message: "Restaurant - Tag Relationship Deleted",
      deleted: query.rows[0],
    });
  } catch (err) {
    log.addLogItem(
      "DELETE",
      "Failed to delete restaurant - tag relationship.",
      "ERROR",
      JSON.stringify(req.params.id),
      JSON.stringify(err)
    );

    //Throw Error
    return res.json({ error: "Request Failed", info: err });
  }
};

//Get All Items from Database
const getAllResTagRels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Fetch Items From db
    const results = await db.query("select * from restaurants_tags_join", "");
    //Success Result
    log.addLogItem(
      "READ",
      "All Restaurant - Tag Relationships Fetched",
      "INFO",
      JSON.stringify(""),
      JSON.stringify(results.rows)
    );

    return res.status(200).json(results.rows);
  } catch (err) {
    //Throw Error
    return res.json({ error: "Request Failed", info: err });
  }
};

//Get One Item from Database
const getOneResTagRel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Fetch Item From db
    const result = await db.query(
      "select * from restaurants_tags_join where id = $1",
      [req.params.id]
    );

    //Verify That Requested Data Exists
    if (result.rowCount === 0) {
      log.addLogItem(
        "READ",
        "Failed to fetch restaurant - tag relationship.",
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
      "Restaurant - Tag Relationship Fetched",
      "INFO",
      JSON.stringify(req.params.id),
      JSON.stringify(result.rows[0])
    );

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    log.addLogItem(
      "READ",
      "Failed to fetch restaurant - tag relationship.",
      "ERROR",
      JSON.stringify(req.params.id),
      JSON.stringify(err)
    );

    //Throw Error
    return res.json({ error: "Request Failed", info: err });
  }
};

//Update One Item in Database
const modifyResTagRel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!validateResTagRel(req.body)) {
    log.addLogItem(
      "UPDATE",
      "Failed to modify restaurant - tag relationship.",
      "ERROR",
      JSON.stringify(req.body),
      JSON.stringify("Invalid request structure.")
    );

    //Throw Error if Request is Invalid
    return res.json({
      Error: "Invalid request structure.",
    });
  }

  try {
    //Modify Item In db
    const query = await db.query(
      "update restaurants_tags_join set restaurant_id = $1, restaurant_tag_id = $2, last_edited = $3 where id = $4 returning *",
      [
        req.body.restaurant_id || "Not entered",
        req.body.restaurant_type_id || "Not entered",
        new Date(Date.now()).toISOString(),
        req.params.id,
      ]
    );
    //Success Result
    log.addLogItem(
      "UPDATE",
      "Restaurant - Tag Relationship Modified",
      "INFO",
      JSON.stringify(req.body),
      JSON.stringify(query.rows[0])
    );

    return res.json({
      message: "Restaurant - Tag Relationship Modified!",
      restaurant_type: query.rows[0],
    });
  } catch (err) {
    //Throw Error
    return res.json({ error: "Request Failed", info: err });
  }
};
/* End Controller Functions */

/* Export Controller Functions */
export default {
  addResTagRel,
  deleteAllResTagRels,
  deleteOneResTagRel,
  getAllResTagRels,
  getOneResTagRel,
  modifyResTagRel,
};
