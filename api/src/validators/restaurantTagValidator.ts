//Import Statements
import Ajv from "ajv";

//Variable Declarations
const ajv = new Ajv();

//Schema
const addRestaurantTagSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    description: { type: "string" },
  },
  required: ["name"],
  additionalProperties: false,
};

/* Validator Functions */
function validateRestaurantTag(body: any) {
  //Validator
  const restaurantTagValidator = ajv.compile(addRestaurantTagSchema);
  //Validate
  const valid = restaurantTagValidator(body);
  //Function Returns
  if (valid) {
    return true;
  }
  if (!valid) {
    return false;
  }
}
/* End Validator Functions */

export { validateRestaurantTag };
