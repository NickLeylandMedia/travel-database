//Import Validator
import { Validator, DetailedValue } from "node-data-validator";

//Validate 'Add Item' Request
const valAddResTagRel = (req: any) => {
  //Validator Data Model
  const model = {
    restaurant_id: new DetailedValue(String, { required: true }),
    restaurant_tag_id: new DetailedValue(String, { required: true }),
  };

  //Validation Check
  return Validator(req, model);
};

//Validate 'Modify Item' Request
const valModResTagRel = (req: any) => {
  //Validator Data Model
  const model = {
    restaurant_id: new DetailedValue(String, { required: true }),
    restaurant_tag_id: new DetailedValue(String, { required: true }),
  };
  //Validation Check
  return Validator(req, model);
};

export { valAddResTagRel, valModResTagRel };
