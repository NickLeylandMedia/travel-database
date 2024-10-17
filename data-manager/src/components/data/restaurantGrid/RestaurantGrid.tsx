/* Library Imports */
//React
import React from "react";

/* Stylesheet Imports */
import styles from "./RestaurantGrid.module.scss";

/* Image Imports */

/* Component Imports */
import RestaurantCard from "@/components/cards/restaurantCard/RestaurantCard";

/* Module Imports */

/* Component Interfaces */
interface Props {
  items: any[];
}

/* Component */
const RestaurantGrid: React.FC<Props> = ({ items }) => {
  /* State Variables */
  /* End State Variables */

  /* Render Variables */
  let renderedRestaurants: any = <p>No restaurants to display!</p>;
  /* End Render Variables */

  /* Render Logic */
  if (items && items.length > 0) {
    renderedRestaurants = items.map((item, index) => {
      return (
        <RestaurantCard
          key={`restaurant-${index}-${item.id}`}
          id={item.id}
          image={item.picture}
          name={item.name}
          titleTextClass={"primary"}
          city={item.city}
          state={item.state}
          categories={item.categories}
          tags={item.tags}
          active={item.active}
          seasonal={item.seasonal}
        />
      );
    });
  }
  /* End Render Logic */

  /* Functions */
  /* End Functions */

  /* Effects */
  /* End Effects */

  /* Component Return Statement */
  return (
    <div className={`${styles.RestaurantGrid} wideContainer`}>
      <h1 className="primary">Restaurants</h1>
      <div className={`${styles.gridContainer} oneToFourColumns`}>
        {renderedRestaurants}
      </div>
    </div>
  );
};

/* Export Statement */
export default RestaurantGrid;
