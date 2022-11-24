/* Import Express Middleware */
import { Request, Response, NextFunction } from "express";

//Database Import
import db from "../../db";

//Import Validators
import {
  valAddResTagRel,
  valModResTagRel,
} from "../../validators/joinValidators/restaurants_tags_rel_val";

/* Controller Functions */
//Add Item to Database
const addResTagRel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!valAddResTagRel(req.body)) {
    return res.json({
      error: "Invalid request structure.",
    });
  }

  try {
    //Add Item To db
    const query = await db.query(
      "insert into restaurants_tags_join (restaurant_id, restaurant_tag_id) values ($1, $2) returning *",
      [
        req.body.restaurant_id || "Not entered",
        req.body.restaurant_tag_id || "Not entered",
      ]
    );

    //Success Result
    return res.json({
      message: "New Restaurant-Tag Relationship Added!",
      list: query.rows[0],
    });
  } catch (err) {
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
  return res.json({ message: "All items deleted" });
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
      //Throw Error
      return res.json({ error: "Invalid ID" });
    }

    //Success Result
    return res.json({
      message: "Restaurant - Tag Relationship Deleted",
      deleted: query.rows[0],
    });
  } catch (err) {
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
    res.status(200).json(results.rows);
    return;
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
const modifyResTagRel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!valModResTagRel(req.body)) {
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
