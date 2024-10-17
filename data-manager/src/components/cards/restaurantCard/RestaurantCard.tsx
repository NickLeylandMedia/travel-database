/* Library Imports */
//React
import React from "react";

/* Stylesheet Imports */
import styles from "./RestaurantCard.module.scss";

/* Image Imports */

/* Component Imports */
import Image from "next/image";
import Link from "next/link";

/* Module Imports */

/* Component Interfaces */
interface Props {
  id: string;
  image: string;
  name: string;
  titleTextClass?: "primary" | "secondary" | "tertiary";
  city?: string;
  state?: string;
  categories: any[];
  tags: any[];
  active: boolean;
  seasonal: boolean;
}

/* Component */
const RestaurantCard: React.FC<Props> = ({
  id,
  image,
  name,
  titleTextClass,
  city,
  state,
  categories,
  tags,
  active,
  seasonal,
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
  if (city && state) {
    locationText = `${city}, ${state}`;
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
    <div className={`${styles.RestaurantCard} moderatelyRaisedCard`}>
      <div className={styles.badgeBox}>
        {active ? null : (
          <p className={`${styles.inactiveBadge} light`}>CLOSED</p>
        )}
        {seasonal ? (
          <p className={`${styles.seasonalBadge} light`}>SEASONAL</p>
        ) : null}
      </div>
      <Image
        src={image ? image : "/placeholder.jpg"}
        className={styles.image}
        alt={""}
        width={1280}
        height={720}
      />
      <div className={styles.infoBox}>
        <h5 className={`${titleTextClass}`}>{name}</h5>
        <div className={styles.locationBox}>
          <Image
            alt="location icon"
            className={styles.locationIcon}
            src={"/location.svg"}
            width={25}
            height={25}
          />
          <p>{locationText}</p>
        </div>
        <div className={styles.categoryBox}>
          <p>Categories:</p>
          <div className={`${styles.categoryContainer} flexJustifyEvenly`}>
            {renderedCategories}
          </div>
        </div>
        <div className={styles.tagBox}>
          <p>Tags:</p>
          <div className={`${styles.tagContainer} flexJustifyEvenly`}>
            {renderedTags}
          </div>
        </div>
        <Link className={styles.link} href={`/restaurants/${id}`}>
          DETAILS
        </Link>
      </div>
    </div>
  );
};

/* Export Statement */
export default RestaurantCard;
