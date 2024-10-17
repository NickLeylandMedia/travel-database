//Import Statements
import Ajv from "ajv";

//Variable Declarations
const ajv = new Ajv();

//Schema
const mealReviewSchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    content: { type: "string" },
    score10: { type: "number" },
    meal_id: { type: "string" },
    date_eaten: { type: "string" },
  },
  required: ["title", "content", "score10", "meal_id"],
  additionalProperties: false,
};

/* Validator Functions */
function validateMealReview(body: any) {
  //Validator
  const mealReviewValidator = ajv.compile(mealReviewSchema);
  //Validate
  const valid = mealReviewValidator(body);
  //Function Returns
  if (valid) {
    return true;
  }
  if (!valid) {
    return false;
  }
}
/* End Validator Functions */

export { validateMealReview };
