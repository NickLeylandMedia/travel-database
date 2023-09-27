//Import Statements
import Ajv from "ajv";

//Variable Declarations
const ajv = new Ajv();

//Schema
const restaurantReviewSchema = {
  type: "object",
  properties: {
    restaurant_id: { type: "string" },
    title: { type: "string" },
    content: { type: "string" },
    score10: { type: "number" },
  },
  required: ["restaurant_id", "title", "content", "score10"],
  additionalProperties: false,
};

/* Validator Functions */
function validateRestaurantReview(body: any) {
  //Validator
  const restaurantReviewValidator = ajv.compile(restaurantReviewSchema);
  //Validate
  const valid = restaurantReviewValidator(body);
  //Function Returns
  if (valid) {
    return true;
  }
  if (!valid) {
    return false;
  }
}
/* End Validator Functions */

export { validateRestaurantReview };
