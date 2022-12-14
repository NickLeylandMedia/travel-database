import { Request, Response, NextFunction } from "express";

//Database Import
import db from "../db";

//Import Validators
import {
  valAddResType,
  valModResType,
} from "../validators/restaurant_types_val";

const addType = async (req: Request, res: Response, next: NextFunction) => {
  if (!valAddResType(req.body)) {
    return res.json({
      Error: "Invalid request structure.",
    });
  }

  try {
    //Add Item To db
    const query = await db.query(
      "insert into restaurant_types (name, description) values ($1, $2) returning *",
      [req.body.name, req.body.description]
    );

    //Success Result
    return res.json({ message: "New Type Added!", list: query.rows[0] });
  } catch (err) {
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
      //Throw Error
      return res.json({ error: "Invalid ID" });
    }

    //Success Result
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
    res.status(200).json(results.rows);
    return;
  } catch (err) {
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

const modifyResType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!valModResType(req.body)) {
    return res.json({
      Error: "Invalid request structure.",
    });
  }

  try {
    //Modify Item In db
    const query = await db.query(
      "update restaurant_types set name = $1, description = $2, last_edited = $3 where id = $4 returning *",
      [
        req.body.name || "Not entered",
        req.body.description || null,
        new Date(Date.now()).toISOString(),
        req.params.id,
      ]
    );
    //Success Result
    return res.json({
      message: "Restaurant Type Modified!",
      restaurant_type: query.rows[0],
    });
  } catch (err) {
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
};
