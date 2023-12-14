/* Library Imports */
//React
import React from "react";

/* Stylesheet Imports */
import styles from "./TableSelector.module.scss";

/* Image Imports */

/* Component Imports */

/* Module Imports */
import { formatTitles } from "@/modules/stringTools";

/* Component Interfaces */
interface Props {
  tableSetter: (table: string) => void;
  tables: string[];
}

/* Component */
const TableSelector: React.FC<Props> = ({ tables, tableSetter }) => {
  /* State Variables */
  /* End State Variables */

  /* Render Variables */
  let renderedTableOptions: any = null;
  /* End Render Variables */

  /* Functions */
  //Render Table Options
  if (tables.length > 0) {
    renderedTableOptions = tables.map((table) => {
      return (
        <div className={styles.tableOpt} key={Math.random()}>
          <h2 className={styles.tableOptTitle}>{formatTitles(table)}</h2>
          <button
            className={styles.tableOptButton}
            onClick={() => tableSetter(table)}
          >
            SELECT
          </button>
        </div>
      );
    });
  }
  /* End Functions */

  /* Effects */
  /* End Effects */

  /* Component Return Statement */
  return <div className={styles.TableSelector}>{renderedTableOptions}</div>;
};

/* Export Statement */
export default TableSelector;
