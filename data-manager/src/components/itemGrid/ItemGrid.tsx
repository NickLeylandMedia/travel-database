/* Library Imports */
//React
import React, { useState } from "react";

/* Stylesheet Imports */
import "./ItemGrid.scss";

/* Image Imports */

/* Component Imports */

/* Module Imports */

/* Component Interfaces */
interface Props {
  items: any[];
}

/* Component/Functions */
const ItemGrid: React.FC<Props> = ({ items }) => {
  //State for component mode
  const [compMode, setCompMode] = useState("view");

  //Variable for one-column mode
  let colAmt: any = "oneCol";

  //Variable to render items from
  const itemsActual = items || [];

  //Variable to store rendered items
  let renderedItems: any = <h2>No Items to Display!</h2>;

  //If there are items to render
  if (itemsActual.length > 0) {
    colAmt = "multiCol";

    //Render Items
    renderedItems = itemsActual.map((item) => {
      console.log(items);
      return (
        <div className="item" key={`item${item.id}`}>
          <img src="" alt="" />
          <h3>{item.name || "Poop"}</h3>
        </div>
      );
    });
  }

  //Function return statement
  return <div className={`ItemGrid ${colAmt}`}>{renderedItems}</div>;
};

/* Export Statement */
export default ItemGrid;
