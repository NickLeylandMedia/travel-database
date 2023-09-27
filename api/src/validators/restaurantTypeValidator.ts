//Import Statements
import Ajv from "ajv";

//Variable Declarations
const ajv = new Ajv();

//Schema
const addRestaurantTypeSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    description: { type: "string" },
  },
  required: ["name"],
  additionalProperties: false,
};

/* Validator Functions */
function validateRestaurantType(body: any) {
  //Validator
  const restaurantTypeValidator = ajv.compile(addRestaurantTypeSchema);
  //Validate
  const valid = restaurantTypeValidator(body);
  //Function Returns
  if (valid) {
    return true;
  }
  if (!valid) {
    return false;
  }
}
/* End Validator Functions */

export { validateRestaurantType };
