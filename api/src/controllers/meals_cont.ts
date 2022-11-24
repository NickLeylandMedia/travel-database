/* Import Express Middleware */
import { Request, Response, NextFunction } from "express";

/* Controller Functions */
//Add Item to Database
const addMeal = async (req: Request, res: Response, next: NextFunction) => {
  return res.json({ message: "New item posted" });
};

//Delete All Items from Database
const deleteAllMeals = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.json({ message: "All items deleted" });
};

//Delete One Item from Database
const deleteOneMeal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.json({ message: "Meal deleted" });
};

//Get All Items from Database
const getAllMeals = async (req: Request, res: Response, next: NextFunction) => {
  return res.json({ message: "Here are the meals!" });
};

//Get One Item from Database
const getOneMeal = async (req: Request, res: Response, next: NextFunction) => {
  return res.json({ message: "Here is the meal!" });
};

//Update One Item in Database
const modifyMeal = async (req: Request, res: Response, next: NextFunction) => {
  return res.json({ message: "Meal modified" });
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
