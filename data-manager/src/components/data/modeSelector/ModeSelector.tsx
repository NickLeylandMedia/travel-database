/* Library Imports */
//React
import React from "react";

/* Stylesheet Imports */
import styles from "./ModeSelector.module.scss";

/* Image Imports */

/* Component Imports */

/* Module Imports */

/* Component Interfaces */
interface Props {
  mode: "view" | "edit";
  modeSetter: React.Dispatch<React.SetStateAction<"view" | "edit">>;
}

/* Component */
const ModeSelector: React.FC<Props> = ({ mode, modeSetter }) => {
  /* State Variables */
  /* End State Variables */

  /* Render Variables */
  /* End Render Variables */

  /* Functions */
  /* End Functions */

  /* Effects */
  /* End Effects */

  /* Component Return Statement */
  if (mode === "view") {
    return (
      <div className={styles.ModeSelector}>
        <button className={`${styles.leftButton} ${styles.active}`}>
          VIEW
        </button>
        <button
          className={`${styles.rightButton} ${styles.inactive}`}
          onClick={() => modeSetter("edit")}
        >
          EDIT
        </button>
      </div>
    );
  }

  if (mode === "edit") {
    return (
      <div className={styles.ModeSelector}>
        <button
          className={`${styles.leftButton} ${styles.inactive}`}
          onClick={() => modeSetter("view")}
        >
          VIEW
        </button>
        <button className={`${styles.rightButton} ${styles.active}`}>
          EDIT
        </button>
      </div>
    );
  }
};

/* Export Statement */
export default ModeSelector;
