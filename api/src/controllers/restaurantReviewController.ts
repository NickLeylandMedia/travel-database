/* Import Express Middleware */
import { Request, Response, NextFunction } from "express";

//Database Import
import db from "../db";

//Import Validators
import { validateRestaurantReview } from "../validators/restaurantReviewValidator";

//Import Logger
import log from "./local/logController";

/* Controller Functions */
//Add Item to Database
const addResReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Validate Request
  if (!validateRestaurantReview(req.body)) {
    log.addLogItem(
      "CREATE",
      "Failed to add new restaurant review.",
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

    //Success Result
    log.addLogItem(
      "CREATE",
      "New restaurant review added.",
      "INFO",
      JSON.stringify(req.body),
      JSON.stringify(query.rows[0])
    );

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
    log.addLogItem(
      "DELETE",
      "All restaurant reviews deleted.",
      "INFO",
      JSON.stringify("SHEGONE"),
      JSON.stringify({ message: "All Restaurant Reviews Deleted" })
    );

    return res.json({
      message: "All Restaurant Reviews Deleted",
      data: query.rows,
    });
  } catch (err) {
    log.addLogItem(
      "DELETE",
      "Failed to delete all restaurant reviews.",
      "ERROR",
      JSON.stringify("OHNO"),
      JSON.stringify(err)
    );

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
      log.addLogItem(
        "DELETE",
        "Failed to delete restaurant review.",
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
      "Restaurant Review Deleted.",
      "INFO",
      JSON.stringify(req.params.id),
      JSON.stringify(query.rows[0])
    );

    return res.json({
      message: "Restaurant Review Deleted",
      data: query.rows[0],
    });
  } catch (err) {
    log.addLogItem(
      "DELETE",
      "Failed to delete restaurant review.",
      "ERROR",
      JSON.stringify(req.params.id),
      JSON.stringify(err)
    );

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
    log.addLogItem(
      "READ",
      "All restaurant reviews fetched.",
      "INFO",
      JSON.stringify(""),
      JSON.stringify(results.rows)
    );

    return res.status(200).json(results.rows);
  } catch (err) {
    log.addLogItem(
      "READ",
      "Failed to fetch all restaurant reviews.",
      "ERROR",
      JSON.stringify(""),
      JSON.stringify(err)
    );

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
      log.addLogItem(
        "READ",
        "Failed to fetch restaurant review.",
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
      "Restaurant review fetched.",
      "INFO",
      JSON.stringify(req.params.id),
      JSON.stringify(result.rows[0])
    );

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    log.addLogItem(
      "READ",
      "Failed to fetch restaurant review.",
      "ERROR",
      JSON.stringify(req.params.id),
      JSON.stringify(err)
    );

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
        req.body.restaurant_id || "Not Entered",
        req.body.title || "Not Entered",
        req.body.content || "Not Entered",
        req.body.score10 || 0,
        req.body.date_visited || null,
        new Date(Date.now()).toISOString(),
        req.params.id,
      ]
    );
    //Success Result
    log.addLogItem(
      "UPDATE",
      `Restaurant Review with id ${req.params.id} modified.`,
      "INFO",
      JSON.stringify(req.body),
      JSON.stringify(query.rows[0])
    );

    return res.json({
      message: "Restaurant Review Modified!",
      data: query.rows[0],
    });
  } catch (err) {
    log.addLogItem(
      "UPDATE",
      `Failed to modify restaurant review with id ${req.params.id}.`,
      "ERROR",
      JSON.stringify(req.body),
      JSON.stringify(err)
    );

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
