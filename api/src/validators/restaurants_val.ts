//Import Validator
import { Validator, DetailedValue } from "node-data-validator";

//Validate 'Add Item' Request
const valAddRest = (req: any) => {
  //Validator Data Model
  const model = {
    name: new DetailedValue(String, { required: true }),
    city: new DetailedValue(String, { required: true }),
    state: new DetailedValue(String, { required: true }),
    coord: new DetailedValue(String, { required: false }),
    description: new DetailedValue(String, { required: false }),
    picture: new DetailedValue(String, { required: false }),
    zip: new DetailedValue(String, { required: true }),
    address: new DetailedValue(String, { required: false }),
    active: new DetailedValue(Boolean, { required: true }),
    seasonal: new DetailedValue(Boolean, { required: false }),
    month_closed_text: new DetailedValue(String, { required: false }),
    month_closed_numeric: new DetailedValue(Number, { required: false }),
    year_closed: new DetailedValue(String, { required: false }),
  };

  //Validation Check
  return Validator(req, model);
};

//Validate 'Modify Item' Request
const valModRest = (req: any) => {
  //Validator Data Model
  const model = {
    name: new DetailedValue(String, { required: true }),
    city: new DetailedValue(String, { required: true }),
    state: new DetailedValue(String, { required: true }),
    coord: new DetailedValue(String, { required: false }),
    description: new DetailedValue(String, { required: false }),
    picture: new DetailedValue(String, { required: false }),
    zip: new DetailedValue(String, { required: true }),
    address: new DetailedValue(String, { required: false }),
    active: new DetailedValue(Boolean, { required: true }),
    seasonal: new DetailedValue(Boolean, { required: false }),
    month_closed_text: new DetailedValue(String, { required: false }),
    month_closed_numeric: new DetailedValue(Number, { required: false }),
    year_closed: new DetailedValue(String, { required: false }),
  };
  //Validation Check
  return Validator(req, model);
};

export { valModRest, valAddRest };
