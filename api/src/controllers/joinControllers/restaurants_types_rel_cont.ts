/* Import Express Middleware */
import { Request, Response, NextFunction } from "express";

//Database Import
import db from "../../db";

//Import Validators
import { validateResTypeRel } from "../../validators/joinValidators/restaurants_types_rel_val";

/* Controller Functions */
//Add Item to Database
const addResTypeRel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Validate Request
  if (!validateResTypeRel(req.body)) {
    //Throw Error if Request is Invalid
    return res.json({
      error: "Invalid request structure.",
    });
  }

  try {
    //Add Item To db
    const query = await db.query(
      "insert into restaurants_types_join (restaurant_id, restaurant_type_id) values ($1, $2) returning *",
      [req.body.restaurant_id, req.body.restaurant_type_id]
    );

    //Success Result
    return res.json({
      message: "New restaurant-type relationship added!",
      data: query.rows[0],
    });
  } catch (err) {
    //Throw Error
    return res.json({ error: "Request Failed", info: err });
  }
};

//Delete All Items from Database
const deleteAllResTypeRels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.json({ message: "All items deleted" });
};

//Delete One Item from Database
const deleteOneResTypeRel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Delete Item From db
    const query = await db.query(
      "delete from restaurants_types_join where id = $1 returning *",
      [req.params.id]
    );

    //Verify that requested data exists
    if (query.rowCount === 0) {
      //Throw Error
      return res.json({ error: "Invalid ID" });
    }

    //Success Result
    return res.json({
      message: "Restaurant - Type Relationship Deleted",
      deleted: query.rows[0],
    });
  } catch (err) {
    //Throw Error
    return res.json({ error: "Request Failed", info: err });
  }
};

//Get All Items from Database
const getAllResTypeRels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Fetch Items From db
    const results = await db.query("select * from restaurants_types_join", "");
    //Success Result
    res.status(200).json(results.rows);
    return;
  } catch (err) {
    //Throw Error
    return res.json({ error: "Request Failed", info: err });
  }
};

//Get One Item from Database
const getOneResTypeRel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Fetch Item From db
    const result = await db.query(
      "select * from restaurants_types_join where id = $1",
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
const modifyResTypeRel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!validateResTypeRel(req.body)) {
    return res.json({
      Error: "Invalid request structure.",
    });
  }

  try {
    //Modify Item In db
    const query = await db.query(
      "update restaurants_types_join set restaurant_id = $1, restaurant_type_id = $2, last_edited = $3 where id = $4 returning *",
      [
        req.body.restaurant_id || "Not entered",
        req.body.restaurant_type_id || "Not entered",
        new Date(Date.now()).toISOString(),
        req.params.id,
      ]
    );
    //Success Result
    return res.json({
      message: "Restaurant - Type Relationship Modified!",
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
  addResTypeRel,
  deleteAllResTypeRels,
  deleteOneResTypeRel,
  getAllResTypeRels,
  getOneResTypeRel,
  modifyResTypeRel,
};
