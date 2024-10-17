/* Library Imports */
//React
import React from "react";

/* Stylesheet Imports */
import styles from "./RestaurantDetailV2.module.scss";

/* Image Imports */

/* Component Imports */
import Image from "next/image";

/* Module Imports */

/* Component Interfaces */
interface Props {
  name: string;
  categories: any[];
  tags: any[];
  city: string;
  state: string;
  address: string;
}

/* Component */
const RestaurantDetailV2: React.FC<Props> = ({
  name,
  categories,
  tags,
  city,
  state,
  address,
}) => {
  /* State Variables */
  /* End State Variables */

  /* Render Variables */
  //Location Variable
  let locationText = `Location Unknown`;
  //Rendered Categories Variable
  let renderedCategories: any = <p>None</p>;
  //Rendered Tags Variable
  let renderedTags: any = <p>None</p>;
  /* End Render Variables */

  /* Render Logic */
  //Render city and state if valid
  if (address && city && state) {
    locationText = `${address}, ${city}, ${state}`;
  }
  //Render location unknown if city or state is not entered
  if (
    city === "Not Entered" ||
    state === "Not Entered" ||
    city === "Not entered" ||
    state === "Not entered"
  ) {
    locationText = `Location Unknown`;
  }
  if (city === "N/A" || state === "N/A") {
    //Render multiple locations if equal to N/A
    locationText = `Multiple Locations`;
  }
  //Render Categories
  if (categories && categories.length > 0) {
    renderedCategories = categories.map((category, index) => {
      return (
        <p key={index} className={`${styles.category} light`}>
          {category.name}
        </p>
      );
    });
  }
  //Render Tags
  if (tags && tags.length > 0) {
    renderedTags = tags.map((tag, index) => {
      return (
        <p key={index} className={`${styles.tag} light`}>
          {tag.name}
        </p>
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
    <div className={`${styles.RestaurantDetailV2} wideContainer`}>
      <div className={`${styles.infoBox} moderatelyRaisedCard`}>
        <h1 className="primary dark">{name}</h1>
        <div className="flexRow">
          <Image
            alt="location icon"
            className={styles.locationIcon}
            src={"/location.svg"}
            width={25}
            height={25}
          />
          <p>{locationText}</p>
        </div>
      </div>
      <div className={styles.mealBox}></div>
      <div className={styles.reviewBox}></div>
    </div>
  );
};

/* Export Statement */
export default RestaurantDetailV2;
