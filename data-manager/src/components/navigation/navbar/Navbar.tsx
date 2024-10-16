/* Library Imports */
//React
import React from "react";

/* Stylesheet Imports */
import styles from "./Navbar.module.scss";

/* Image Imports */

/* Component Imports */
import WhiteTextHoverColor from "@/components/clickables/whiteTextHoverColor/WhiteTextHoverColor";

/* Module Imports */

/* Component Interfaces */
interface LinkItem {
  address: string;
  text: string;
}

interface Props {
  items: LinkItem[];
  fontClass: "primary" | "secondary" | "tertiary";
}

/* Component */
const Navbar: React.FC<Props> = ({ items, fontClass }) => {
  /* State Variables */
  /* End State Variables */

  /* Render Variables */
  let renderedLinks: any = null;
  /* End Render Variables */

  /* Render Logic */
  if (items && items.length > 0) {
    renderedLinks = items.map((item: any) => {
      return (
        <WhiteTextHoverColor
          address={item.address}
          text={item.text}
          fontClass={fontClass}
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
    <div className={`${styles.Navbar} wideContainer`}>
      <div className={`${styles.narrowNav} ${styles.colorBar}`}></div>
      <div className={styles.logoBox}></div>
      <div className={`${styles.linkBox} ${styles.colorBar}`}>
        {renderedLinks}
      </div>
    </div>
  );
};

/* Export Statement */
export default Navbar;
