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
}

/* Component */
const RestaurantCard: React.FC<Props> = ({
  id,
  image,
  name,
  titleTextClass,
  city,
  state,
}) => {
  /* State Variables */
  /* End State Variables */

  /* Render Variables */
  let locationText = `Location Unknown`;

  if (city && state) {
    locationText = `${city}, ${state}`;
  }

  /* End Render Variables */

  /* Functions */
  /* End Functions */

  /* Effects */
  /* End Effects */

  /* Component Return Statement */
  return (
    <div className={`${styles.RestaurantCard} raisedWhiteCardNoPadding`}>
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
          <p>{locationText}</p>
        </div>
        <div className={styles.categoryBox}>
          <p>Categories:</p>
          <div className={styles.categoryContainer}></div>
        </div>
        <div className={styles.tagBox}>
          <p>Tags:</p>
          <div className={styles.tagContainer}></div>
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
