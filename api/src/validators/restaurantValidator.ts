//Import Statements
import Ajv from "ajv";

//Variable Declarations
const ajv = new Ajv();

//Schema
const restaurantSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    city: { type: "string" },
    state: { type: "string" },
    coord: { type: "string" },
    description: { type: "string" },
    picture: { type: "string" },
    zip: { type: "string" },
    address: { type: "string" },
    active: { type: "boolean" },
    seasonal: { type: "boolean" },
    month_closed_text: { type: "string" },
    month_closed_numeric: { type: "integer" },
    year_closed: { type: "integer" },
  },
  required: ["name", "city", "state", "zip", "active"],
  additionalProperties: false,
};

/* Validator Functions */
function validateRestaurant(body: any) {
  //Validator
  const restaurantValidator = ajv.compile(restaurantSchema);
  //Validate
  const valid = restaurantValidator(body);
  //Function Returns
  if (valid) {
    return true;
  }
  if (!valid) {
    return false;
  }
}
/* End Validator Functions */

export { validateRestaurant };
