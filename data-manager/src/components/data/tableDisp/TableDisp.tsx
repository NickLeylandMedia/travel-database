/* Library Imports */
//React
import React, { useEffect, useState } from "react";

/* Stylesheet Imports */
import styles from "./TableDisp.module.scss";

/* Image Imports */

/* Component Imports */
import MinimalCard from "@/components/cards/minimalCard/MinimalCard";

/* Module Imports */

/* Component Interfaces */
interface Props {
  items: any[];
  selectedTable: string;
}

/* Component */
const TableDisp: React.FC<Props> = ({ items, selectedTable }) => {
  console.log(items);
  /* State Variables */
  /* End State Variables */

  /* Render Variables */
  let renderedItems: any = "Select a table to view items.";
  /* End Render Variables */

  /* Functions */
  if (items.length > 0) {
    renderedItems = items.map((item) => {
      return (
        <MinimalCard
          id={item.id}
          key={item.id}
          title={item.name}
          link={`/data/${selectedTable}/${item.id}`}
          summary={item.summary}
          image={item.image || item.picture || "/placeholder.jpg"}
          alt={item.name}
          city={item.city}
          state={item.state}
        />
      );
    });
  }
  /* End Functions */

  /* Effects */
  /* End Effects */

  /* Component Return Statement */
  return <div className={styles.TableDisp}>{renderedItems}</div>;
};

/* Export Statement */
export default TableDisp;
