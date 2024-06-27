//Import Statements
import Ajv from "ajv";

//Variable Declarations
const ajv = new Ajv();

//Schema
const mealSchema = {
  type: "object",
  properties: {
    restaurant_id: { type: "string" },
    name: { type: "string" },
    price: { type: ["string", "number"] },
    description: { type: "string" },
  },
  required: ["restaurant_id", "name", "price", "description"],
  additionalProperties: false,
};

/* Validator Functions */
function validateMeal(body: any) {
  //Validator
  const mealValidator = ajv.compile(mealSchema);
  //Validate
  const valid = mealValidator(body);
  //Function Returns
  if (valid) {
    return true;
  }
  if (!valid) {
    return false;
  }
}
/* End Validator Functions */

export { validateMeal };
