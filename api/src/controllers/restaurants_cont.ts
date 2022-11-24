import { Request, Response, NextFunction } from "express";

//Database Import
import db from "../db";

//Import Validators
import { valAddRest, valModRest } from "../validators/restaurants_val";

const addRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!valAddRest(req.body)) {
    return res.json({
      error: "Invalid request structure.",
    });
  }
  try {
    //Add Item To db
    const query = await db.query(
      "insert into restaurants (name, city, state, coord, description, picture, zip, address, active, seasonal, month_closed_text, month_closed_numeric, year_closed) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) returning *",
      [
        req.body.name || "Not entered",
        req.body.city || "Not entered",
        req.body.state || "Not entered",
        req.body.coord || null,
        req.body.description || null,
        req.body.picture || null,
        req.body.zip || "Not entered",
        req.body.address || null,
        req.body.active || true,
        req.body.seasonal || null,
        req.body.month_closed_text || null,
        req.body.month_closed_numeric || null,
        req.body.year_closed || null,
      ]
    );

    //Success Result
    return res.json({ message: "New Restaurant Added!", list: query.rows[0] });
  } catch (err) {
    //Throw Error
    return res.json({ error: "Request Failed", info: err });
  }
};

// const deleteAllRestaurants = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   res.json({ message: "All Restaurants deleted" });
// };

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
      //Throw Error
      return res.json({ error: "Invalid ID" });
    }

    //Success Result
    return res.json({ message: "Restaurant Deleted", deleted: query.rows[0] });
  } catch (err) {
    //Throw Error
    return res.json({ error: "Request Failed", info: err });
  }
};

const getAllRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Fetch Items From db
    const results = await db.query("select * from restaurants", "");
    //Success Result
    res.status(200).json(results.rows);
    return;
  } catch (err) {
    //Throw Error
    return res.json({ error: "Request Failed", info: err });
  }
};

const getOneRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Fetch Item From db
    const result = await db.query("select * from restaurant where id = $1", [
      req.params.id,
    ]);

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

const modifyRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!valModRest(req.body)) {
    return res.json({
      error: "Invalid request structure.",
    });
  }

  try {
    //Modify Item In db
    const query = await db.query(
      "update restaurants set name = $1, city = $2, state = $3, coord = $4, description = $5, picture = $6, zip = $7, address = $8, active = $9, seasonal = $10, month_closed_text = $11, month_closed_numeric = $12, year_closed = $13, last_edited = $14 where id = $15 returning *",
      [
        req.body.name || "Not entered",
        req.body.city || "Not entered",
        req.body.state || "Not entered",
        req.body.coord || null,
        req.body.description || null,
        req.body.picture || null,
        req.body.zip || "Not entered",
        req.body.address || null,
        req.body.active || true,
        req.body.seasonal || null,
        req.body.month_closed_text || null,
        req.body.month_closed_numeric || null,
        req.body.year_closed || null,
        new Date(Date.now()).toISOString(),
        req.params.id,
      ]
    );
    //Success Result
    return res.json({
      message: "Restaurant Modified!",
      restaurant: query.rows[0],
    });
  } catch (err) {
    //Throw Error
    return res.json({ error: "Request Failed", info: err });
  }
};

export default {
  addRestaurant,
  // deleteAllRestaurants,
  deleteOneRestaurant,
  getAllRestaurants,
  getOneRestaurant,
  modifyRestaurant,
};
