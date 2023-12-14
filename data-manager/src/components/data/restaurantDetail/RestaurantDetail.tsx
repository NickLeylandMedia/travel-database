/* Library Imports */
//React
import React from "react";

/* Stylesheet Imports */
import styles from "./RestaurantDetail.module.scss";

/* Image Imports */

/* Component Imports */
import Link from "next/link";

/* Module Imports */

/* Component Interfaces */
interface Props {
  name: string;
  image: string;
  city: string;
  state: string;
  zip: string;
  address: string;
  coord: string;
  description: string;
  active: boolean;
  seasonal: boolean;
  monthClosedNum: number | string;
  monthClosedText: string;
  yearClosed: number | string;
}

/* Component */
const RestaurantDetail: React.FC<Props> = ({
  name,
  image,
  description,
  city,
  state,
  zip,
  address,
  coord,
  active,
  seasonal,
  monthClosedNum,
  monthClosedText,
  yearClosed,
}) => {
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
    <div className={styles.RestaurantDetail}>
      <h1 className="primary">{name}</h1>
      <img
        className={styles.restaurantImage}
        src={image ? image : "/placeholder.jpg"}
        alt=""
      />
      <div className={styles.descriptionBox}>
        <p>{description ? description : "No Description Available"}</p>
      </div>
      <div className={styles.locationInfo}>
        <h2 className="primary">Location</h2>
        <p>{address ? address : "Address Unavailable"}</p>
        <p>
          {city}, {state} {zip}
        </p>
        <p>{coord ? coord : null}</p>
      </div>
      <div className={styles.activityStatus}>
        <h2 className="primary">Activity Status</h2>
        <div className={styles.activityBox}>
          <h3 className="secondary">Active?</h3>
          {active ? (
            <img src="/check.svg" alt="" />
          ) : (
            <img src="/error.svg" alt="" />
          )}
        </div>
        <div className={styles.activityBox}>
          <h3 className="secondary">Seasonal?</h3>
          {seasonal ? (
            <img src="/check.svg" alt="" />
          ) : (
            <img src="/error.svg" alt="" />
          )}
        </div>
        {!active && monthClosedText ? (
          <div className={styles.activityInfoBox}>
            <h3 className="secondary">Month Closed:</h3>
            <p>{monthClosedText}</p>
          </div>
        ) : null}
        {!active && yearClosed ? (
          <div className={styles.activityInfoBox}>
            <h3 className="secondary">Year Closed:</h3>
            <p>{yearClosed}</p>
          </div>
        ) : null}
        <div className={styles.typeBox}>
          <h3 className="primary">Types</h3>
          <div className={styles.typeContainer}>
            <Link href="/data/types/1" className={styles.type}>
              Test Type
            </Link>
            <Link href="/data/types/2" className={styles.type}>
              Test Type
            </Link>
            <Link href="/data/types/3" className={styles.type}>
              Test Type
            </Link>
          </div>
        </div>
        <div className={styles.tagBox}>
          <h3 className="primary">Tags</h3>
          <div className={styles.tagContainer}>
            <Link href="/data/tags/1" className={styles.tag}>
              Test Tag
            </Link>
            <Link href="/data/tags/2" className={styles.tag}>
              Test Tag
            </Link>
            <Link href="/data/tags/3" className={styles.tag}>
              Test Tag
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Export Statement */
export default RestaurantDetail;
