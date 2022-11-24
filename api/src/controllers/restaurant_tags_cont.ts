/* Import Express Middleware */
import { Request, Response, NextFunction } from "express";

//Database Import
import db from "../db";

//Import Validators
import { valAddResTag, valModResTag } from "../validators/restaurant_tags_val";

/* Controller Functions */
//Add Item to Database
const addResTag = async (req: Request, res: Response, next: NextFunction) => {
  if (!valAddResTag(req.body)) {
    return res.json({
      Error: "Invalid request structure.",
    });
  }

  try {
    //Add Item To db
    const query = await db.query(
      "insert into restaurant_tags (name, description) values ($1, $2) returning *",
      [req.body.name || "Not Entered", req.body.description || null]
    );

    //Success Result
    return res.json({ message: "New Tag Added!", list: query.rows[0] });
  } catch (err) {
    //Throw Error
    return res.json({ error: "Request Failed", info: err });
  }
};

//Delete All Items from Database
const deleteAllResTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.json({ message: "All items deleted" });
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
      //Throw Error
      return res.json({ error: "Invalid ID" });
    }

    //Success Result
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
    //Success Result
    res.status(200).json(results.rows);
    return;
  } catch (err) {
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
const modifyResTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!valModResTag(req.body)) {
    return res.json({
      Error: "Invalid request structure.",
    });
  }

  try {
    //Modify Item In db
    const query = await db.query(
      "update restaurant_tags set name = $1, description = $2, last_edited = $3 where id = $4 returning *",
      [
        req.body.name || "Not entered",
        req.body.description || null,
        new Date(Date.now()).toISOString(),
        req.params.id,
      ]
    );
    //Success Result
    return res.json({
      message: "Restaurant Tag Modified!",
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
  addResTag,
  deleteAllResTag,
  deleteOneResTag,
  getAllResTags,
  getOneResTag,
  modifyResTag,
};
