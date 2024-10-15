/* Library Imports */
//React
import React from "react";

/* Stylesheet Imports */
import styles from "./MinimalCard.module.scss";

/* Image Imports */

/* Component Imports */
import Link from "next/link";

/* Module Imports */

/* Component Interfaces */
interface Props {
  id: string;
  title: string;
  summary: string;
  image: string;
  alt: string;
  link: string;
  city?: string;
  state?: string;
}

/* Component */
const MinimalCard: React.FC<Props> = ({
  alt,
  image,
  summary,
  title,
  id,
  link,
  city,
  state,
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
    <div className={`${styles.MinimalCard} raisedWhiteCardNoHover`}>
      <img src={image} alt={alt} className={styles.minimalCardImage} />
      <h3 className={styles.minimalCardTitle}>{title}</h3>
      {city && state ? (
        <div className={styles.minimalCardLocation}>
          <p>{city},</p>
          <p>{state}</p>
        </div>
      ) : null}
      <p className={styles.minimalCardSummary}>
        {summary ? summary : "No Summary to Display"}
      </p>
      <Link href={link} className={styles.minimalCardLink}>
        VIEW/EDIT
      </Link>
    </div>
  );
};

/* Export Statement */
export default MinimalCard;
