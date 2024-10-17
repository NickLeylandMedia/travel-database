/* Library Imports */
//React
import React from "react";

/* Stylesheet Imports */

/* Image Imports */

/* Component Imports */
import Navbar from "@/components/navigation/navbar/Navbar";
import RestaurantDetailV2 from "@/components/data/restaurantDetailV2/RestaurantDetailV2";

/* Module Imports */

/* Component Interfaces */
interface Props {}

/* Component */
const RestaurantDetail: React.FC<Props> = () => {
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
    <div className="RestaurantDetail page">
      {/* Header Start */}
      <header>
        <Navbar
          fontClass="primary"
          items={[
            { text: "Home", address: "/" },
            { text: "Restaurants", address: "/restaurants" },
            { text: "Categories", address: "/categories" },
            { text: "Tags", address: "/tags" },
            { text: "Lists", address: "/lists" },
          ]}
        />
      </header>
      {/* Header End */}
      {/* Content Start */}
      <div className="mainContent"></div>
      {/* Content End */}
      {/* Footer Start */}
      {/* <Footer /> */}
      {/* Footer End */}
    </div>
  );
};

/* Export Statement */
export default RestaurantDetail;
