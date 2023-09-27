//Import Validator
import { Validator, DetailedValue } from "node-data-validator";

//Validate 'Add Item' Request
const valAddResType = (req: any) => {
  //Validator Data Model
  const model = {
    name: new DetailedValue(String, { required: true }),
    description: new DetailedValue(String, { required: false }),
  };

  //Validation Check
  return Validator(req, model);
};

//Validate 'Modify Item' Request
const valModResType = (req: any) => {
  //Validator Data Model
  const model = {
    name: new DetailedValue(String, { required: true }),
    description: new DetailedValue(String, { required: false }),
  };
  //Validation Check
  return Validator(req, model);
};

export { valAddResType, valModResType };
