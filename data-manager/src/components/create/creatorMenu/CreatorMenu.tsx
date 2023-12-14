/* Library Imports */
//React
import React from "react";

/* Stylesheet Imports */
import styles from "./CreatorMenu.module.scss";

/* Image Imports */

/* Component Imports */
import Link from "next/link";

/* Module Imports */

/* Component Interfaces */
interface Link {
  title: string;
  path: string;
}

interface Props {
  links: Link[];
}

/* Component */
const CreatorMenu: React.FC<Props> = ({ links }) => {
  /* State Variables */
  /* End State Variables */

  /* Render Variables */
  let linkMenu: any = "No links to display!";
  /* End Render Variables */

  /* Functions */
  //Logic to render links
  if (links.length > 0) {
    linkMenu = links.map((link: Link) => {
      return (
        <Link
          className={styles.creatorMenuLink}
          href={link.path}
          key={Math.random()}
        >
          <h2 className="primary">{link.title}</h2>
        </Link>
      );
    });
  }
  /* End Functions */

  /* Effects */
  /* End Effects */

  /* Component Return Statement */
  return (
    <div className={styles.CreatorMenu}>
      <h1 className="primary">Create An Item</h1>
      <div className={styles.linkBox}>{linkMenu}</div>
    </div>
  );
};

/* Export Statement */
export default CreatorMenu;
