/* Library Imports */
//React
import React from "react";

/* Stylesheet Imports */

/* Image Imports */

/* Component Imports */
import RestaurantForm from "../../../components/create/restaurantForm/RestaurantForm";

/* Module Imports */

/* Component Interfaces */
interface Props {}

/* Component */
const CreateRestaurant: React.FC<Props> = () => {
  /* State Variables */
  /* End State Variables */

  /* Render Variables */
  /* End Render Variables */

  /* Functions */
  /* End Functions */

  /* Effects */
  /* End Effects */

  /* Component Return Statement */
  return (
    <div className="page CreateRestaurant">
      {/* Header Start */}
      <header></header>
      {/* Header End */}
      {/* Content Start */}
      <div className="mainContent">
        <RestaurantForm />
      </div>
      {/* Content End */}
      {/* Footer Start */}

      {/* Footer End */}
    </div>
  );
};

/* Export Statement */
export default CreateRestaurant;
