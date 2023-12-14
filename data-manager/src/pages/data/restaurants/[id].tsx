/* Library Imports */
//React
import React, { useEffect, useState } from "react";

/* Stylesheet Imports */

/* Image Imports */

/* Component Imports */
import ModeSelector from "@/components/data/modeSelector/ModeSelector";
import RestaurantDetail from "@/components/data/restaurantDetail/RestaurantDetail";
import RestaurantEditor from "@/components/data/restaurantEditor/RestaurantEditor";

/* Module Imports */
import {
  fetchOneRestaurant,
  fetchAllRestaurants,
  fetchAllRestaurantTags,
  fetchAllRestaurantTypes,
} from "@/modules/api";

/* Component Interfaces */
interface Props {
  restaurant: any;
}

/* Component */
const RestaurantDisp: React.FC<Props> = ({ restaurant }) => {
  /* State Variables */
  //Page Mode State
  const [pageMode, setPageMode] = useState<"view" | "edit">("view");

  /* End State Variables */

  /* Render Variables */
  /* End Render Variables */

  /* Functions */
  /* End Functions */

  /* Effects */
  /* End Effects */

  /* Component Return Statement */
  return (
    <div className="ItemDisp page">
      {/* Header Start */}
      <header></header>
      {/* Header End */}
      {/* Content Start */}
      <div className="mainContent">
        <ModeSelector mode={pageMode} modeSetter={setPageMode} />
        {pageMode === "view" ? (
          <RestaurantDetail
            name={restaurant.name}
            address={restaurant.address}
            image={restaurant.picture}
            city={restaurant.city}
            state={restaurant.state}
            zip={restaurant.zip}
            description={restaurant.description}
            coord={restaurant.coord}
            active={restaurant.active}
            seasonal={restaurant.seasonal}
            monthClosedNum={restaurant.month_closed_numeric}
            monthClosedText={restaurant.month_closed_text}
            yearClosed={restaurant.year_closed}
          />
        ) : (
          <RestaurantEditor
            id={restaurant.id}
            summary={restaurant.summary}
            name={restaurant.name}
            address={restaurant.address}
            image={restaurant.picture}
            city={restaurant.city}
            state={restaurant.state}
            zip={restaurant.zip}
            description={restaurant.description}
            coord={restaurant.coord}
            active={restaurant.active}
            seasonal={restaurant.seasonal}
            monthClosedNum={restaurant.month_closed_numeric}
            monthClosedText={restaurant.month_closed_text}
            yearClosed={restaurant.year_closed}
          />
        )}
      </div>
      {/* Content End */}
      {/* Footer Start */}
      {/* <Footer /> */}
      {/* Footer End */}
    </div>
  );
};

/* Server Side Rendering Logic */
// Get Static Paths
export async function getStaticPaths() {
  const rests = await fetchAllRestaurants();
  const paths = await rests.map((item: any) => {
    const id = item.id;
    return { params: { id } };
  });

  return {
    paths: paths.map((path: any) => path),
    fallback: false,
  };
}

//Get Static Props
export async function getStaticProps(context: any) {
  const resTags = await fetchAllRestaurantTags();
  const resTypes = await fetchAllRestaurantTypes();
  const restaurant = await fetchOneRestaurant(context.params.id);

  return {
    props: {
      restaurant,
      resTags,
      resTypes,
    },
    revalidate: 10,
  };
}

/* Export Statement */
export default RestaurantDisp;
