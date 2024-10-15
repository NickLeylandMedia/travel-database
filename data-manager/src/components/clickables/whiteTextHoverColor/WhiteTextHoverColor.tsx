/* Library Imports */
//React
import React from "react";

/* Stylesheet Imports */
import styles from "./WhiteTextHoverColor.module.scss";

/* Image Imports */

/* Component Imports */
import Link from "next/link";

/* Module Imports */

/* Component Interfaces */
interface Props {
  address: string;
  text: string;
  fontClass: "primary" | "secondary" | "tertiary";
}

/* Component */
const WhiteTextHoverColor: React.FC<Props> = ({ address, text, fontClass }) => {
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
    <Link
      href={address}
      className={`${styles.WhiteTextHoverColor} ${fontClass} light`}
    >
      {text}
    </Link>
  );
};

/* Export Statement */
export default WhiteTextHoverColor;
