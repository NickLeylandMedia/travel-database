/* Import Express Middleware */
import { Request, Response, NextFunction } from "express";

/* Import Database Connection */
import db from "../db";

/* Import Validator Functions */
import { validateMeal } from "../validators/mealValidator";

/* Import Logger */
import log from "./local/logController";

/* Controller Functions */
//Add Item to Database
const addMeal = async (req: Request, res: Response, next: NextFunction) => {
  //Validate Request
  if (!validateMeal(req.body)) {
    log.addLogItem(
      "CREATE",
      "Failed to add new meal.",
      "ERROR",
      JSON.stringify(req.body),
      JSON.stringify("Invalid request structure.")
    );

    //Throw Error if Request is Invalid
    return res.json({ error: "Invalid request structure." });
  }

  try {
    //Add Item To db
    const query = await db.query(
      "insert into meals (name, description, restaurant_id, price) values ($1, $2, $3, $4) returning *",
      [
        req.body.name,
        req.body.description,
        req.body.restaurant_id,
        req.body.price,
      ]
    );

    //Success Result
    log.addLogItem(
      "CREATE",
      "New meal added.",
      "INFO",
      JSON.stringify(req.body),
      JSON.stringify(query.rows[0])
    );

    return res.json({
      message: "New meal added!",
      data: query.rows[0],
    });
  } catch (err) {
    log.addLogItem(
      "CREATE",
      "Failed to add new meal.",
      "ERROR",
      JSON.stringify(req.body),
      JSON.stringify(err)
    );

    //Throw Error
    return res.json({ error: "Request Failed", info: err });
  }
};

//Delete All Items from Database
const deleteAllMeals = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = db.query("truncate meals", []);

    //Success Result
    log.addLogItem(
      "DELETE",
      "Deleted all meals.",
      "INFO",
      JSON.stringify({ Nukeit: "From Orbit" }),
      JSON.stringify("All meals deleted! :(")
    );

    return res.json({ message: "All meals deleted! :(" });
  } catch (err) {
    log.addLogItem(
      "DELETE",
      "Failed to delete all meals.",
      "ERROR",
      JSON.stringify({ OhNo: "Oopsie Doopsie" }),
      JSON.stringify(err)
    );

    return res.json({ error: "Request Failed", info: err });
  }
};

//Delete One Item from Database
const deleteOneMeal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Delete Item From db
    const query = await db.query(
      "delete from meals where id = $1 returning *",
      [req.params.id]
    );

    //Verify that requested data exists
    if (query.rowCount === 0) {
      log.addLogItem(
        "DELETE",
        `Failed to delete meal with id ${req.params.id}.`,
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
      `Meal with id ${req.params.id} deleted.`,
      "INFO",
      JSON.stringify(req.params.id),
      JSON.stringify(query.rows[0])
    );

    return res.json({ message: "Meal deleted.", data: query.rows[0] });
  } catch (err) {
    log.addLogItem(
      "DELETE",
      `Failed to delete meal with id ${req.params.id}.`,
      "ERROR",
      JSON.stringify(req.params.id),
      JSON.stringify(err)
    );

    //Throw Error
    return res.json({ error: "Request Failed", info: err });
  }
};

//Get All Items from Database
const getAllMeals = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //Fetch Items From db
    const results = await db.query("select * from meals", "");
    //Success Result
    log.addLogItem(
      "READ",
      "Retrieved all meals.",
      "INFO",
      JSON.stringify({ gottaCatch: "Em All" }),
      JSON.stringify(results.rows)
    );

    return res.status(200).json(results.rows);
  } catch (err) {
    log.addLogItem(
      "READ",
      "Failed to retrieve all meals.",
      "ERROR",
      JSON.stringify({ gottaCatch: "Em All" }),
      JSON.stringify(err)
    );

    //Throw Error
    return res.json({ error: "Request Failed", info: err });
  }
};

//Get One Item from Database
const getOneMeal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //Fetch Item From db
    const result = await db.query("select * from meals where id = $1", [
      req.params.id,
    ]);

    //Verify That Requested Data Exists
    if (result.rowCount === 0) {
      log.addLogItem(
        "READ",
        `Failed to retrieve meal with id ${req.params.id}.`,
        "ERROR",
        JSON.stringify(req.params.id),
        JSON.stringify("Invalid ID")
      );
      //Throw Error
      return res.json({ error: "Invalid ID" });
    }

    //Success Result
    return res.status(200).json(result.rows[0]);
  } catch (err) {
    //Throw Error
    return res.json({ error: "Request Failed", info: err });
  }
};

//Update One Item in Database
const modifyMeal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //Modify Item In db
    const query = await db.query(
      "update meals set name = $1, description = $2, restaurant_id = $3, price = $4, last_edited = $5 where id = $6 returning *",
      [
        req.body.name,
        req.body.description,
        req.body.restaurant_id,
        req.body.price,
        new Date(Date.now()).toISOString(),
        req.params.id,
      ]
    );

    //Success Result
    log.addLogItem(
      "UPDATE",
      `Meal with id ${req.params.id} modified.`,
      "INFO",
      JSON.stringify(req.body),
      JSON.stringify(query.rows[0])
    );

    return res.json({
      message: "Meal modified!",
      data: query.rows[0],
    });
  } catch (err) {
    log.addLogItem(
      "UPDATE",
      `Failed to modify meal with id ${req.params.id}.`,
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
  addMeal,
  deleteAllMeals,
  deleteOneMeal,
  getAllMeals,
  getOneMeal,
  modifyMeal,
};
