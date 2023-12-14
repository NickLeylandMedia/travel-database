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
    coord: { type: ["string", "null"] },
    description: { type: ["string", "null"] },
    picture: { type: ["string", "null"] },
    zip: { type: "string" },
    address: { type: ["string", "null"] },
    active: { type: "boolean" },
    seasonal: { type: "boolean" },
    month_closed_text: { type: ["string", "null"] },
    month_closed_numeric: { type: ["integer", "null"] },
    year_closed: { type: ["integer", "null"] },
    summary: { type: ["string", "null"] },
  },
  required: ["name", "city", "state", "zip", "active"],
  additionalProperties: false,
};

/* Validator Functions */
function validateRestaurant(body: any) {
  console.log({ body: body });
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
