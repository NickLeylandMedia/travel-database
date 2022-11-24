/* Import Express Middleware */
import { Request, Response, NextFunction } from "express";

//Database Import
import db from "../db";

//Import Validators
import {
  valAddResReview,
  valModResReview,
} from "../validators/restaurant_reviews_val";

/* Controller Functions */
//Add Item to Database
const addResReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!valAddResReview(req.body)) {
    return res.json({
      Error: "Invalid request structure.",
    });
  }

  try {
    //Add Item To db
    const query = await db.query(
      "insert into restaurant_reviews (restaurant_id, title, content, score10, date_visited) values ($1, $2, $3, $4, $5) returning *",
      [
        req.body.restaurant_id || "Not Entered",
        req.body.title || "Not Entered",
        req.body.content || "Not Entered",
        req.body.score10 || 0,
        req.body.date_visited || null,
      ]
    );

    //Success Result
    return res.json({ message: "New Review Added!", review: query.rows[0] });
  } catch (err) {
    //Throw Error
    return res.json({ error: "Request Failed", info: err });
  }
};

//Delete All Items from Database
const deleteAllResReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.json({ message: "All items deleted" });
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
      //Throw Error
      return res.json({ error: "Invalid ID" });
    }

    //Success Result
    return res.json({
      message: "Restaurant Review Deleted",
      deleted: query.rows[0],
    });
  } catch (err) {
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
    res.status(200).json(results.rows);
    return;
  } catch (err) {
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
      //Throw Error
      return res.json({ error: "Invalid ID" });
    }

    //Success Result
    res.status(200).json(result.rows[0]);
    return;
  } catch (err) {
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
  if (!valModResReview(req.body)) {
    return res.json({
      Error: "Invalid request structure.",
    });
  }

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
    return res.json({
      message: "Restaurant Review Modified!",
      restaurant_review: query.rows[0],
    });
  } catch (err) {
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
