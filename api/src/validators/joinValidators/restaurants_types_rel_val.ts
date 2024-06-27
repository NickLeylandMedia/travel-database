//Import Statements
import Ajv from "ajv";

//Variable Declarations
const ajv = new Ajv();

//Schema
const resTypeRelSchema = {
  type: "object",
  properties: {
    restaurant_id: { type: "string" },
    restaurant_type_id: { type: "string" },
  },
  required: ["restaurant_id", "restaurant_type_id"],
  additionalProperties: false,
};

/* Validator Functions */
function validateResTypeRel(body: any) {
  //Validator
  const resTypeRelValidator = ajv.compile(resTypeRelSchema);
  //Validate
  const valid = resTypeRelValidator(body);
  //Function Returns
  if (valid) {
    return true;
  }
  if (!valid) {
    return false;
  }
}
/* End Validator Functions */

export { validateResTypeRel };
