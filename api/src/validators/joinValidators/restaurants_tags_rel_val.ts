//Import Statements
import Ajv from "ajv";

//Variable Declarations
const ajv = new Ajv();

//Schema
const resTagRelSchema = {
  type: "object",
  properties: {
    restaurant_id: { type: "string" },
    restaurant_tag_id: { type: "string" },
  },
  required: ["restaurant_id", "restaurant_tag_id"],
  additionalProperties: false,
};

/* Validator Functions */
function validateResTagRel(body: any) {
  //Validator
  const resTagRelValidator = ajv.compile(resTagRelSchema);
  //Validate
  const valid = resTagRelValidator(body);
  //Function Returns
  if (valid) {
    return true;
  }
  if (!valid) {
    return false;
  }
}
/* End Validator Functions */

export { validateResTagRel };
