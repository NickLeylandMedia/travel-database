//Import Validator
import { Validator, DetailedValue } from "node-data-validator";

//Validate 'Add Item' Request
const valAddResReview = (req: any) => {
  //Validator Data Model
  const model = {
    restaurant_id: new DetailedValue(String, { required: true }),
    title: new DetailedValue(String, { required: true }),
    content: new DetailedValue(String, { required: true }),
    score10: new DetailedValue(Number, { required: true }),
  };

  //Validation Check
  return Validator(req, model);
};

//Validate 'Modify Item' Request
const valModResReview = (req: any) => {
  //Validator Data Model
  const model = {
    restaurant_id: new DetailedValue(String, { required: true }),
    title: new DetailedValue(String, { required: true }),
    content: new DetailedValue(String, { required: true }),
    score10: new DetailedValue(Number, { required: true }),
  };
  //Validation Check
  return Validator(req, model);
};

export { valAddResReview, valModResReview };
