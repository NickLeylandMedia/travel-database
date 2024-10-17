/* Library Imports */
//React
import React from "react";

/* Stylesheet Imports */

/* Image Imports */

/* Component Imports */
import RestaurantGrid from "@/components/data/restaurantGrid/RestaurantGrid";

/* Module Imports */
import {
  fetchAllRestaurantsDetailed,
  fetchAllRestaurantTags,
  fetchAllRestaurantTypes,
} from "@/modules/api";

/* Component Interfaces */
interface Props {
  restaurants: any[];
  resTags: any[];
  resTypes: any[];
}

/* Component */
const Restaurants: React.FC<Props> = ({ restaurants, resTags, resTypes }) => {
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
    <div className="Restaurants page">
      {/* Header Start */}
      <header></header>
      {/* Header End */}
      {/* Content Start */}
      <div className="mainContent">
        <RestaurantGrid items={restaurants} />
      </div>
      {/* Content End */}
      {/* Footer Start */}
      {/* <Footer /> */}
      {/* Footer End */}
    </div>
  );
};

export async function getStaticProps() {
  const restaurants = await fetchAllRestaurantsDetailed();
  const resTags = await fetchAllRestaurantTags();
  const resTypes = await fetchAllRestaurantTypes();

  return {
    props: {
      restaurants,
      resTags,
      resTypes,
    },
    revalidate: 10,
  };
}

/* Export Statement */
export default Restaurants;
