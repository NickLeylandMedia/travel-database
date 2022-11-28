/* Library Imports */
//React
import React from "react";
//Tanstack Query
import { useQuery } from "@tanstack/react-query";

/* Stylesheet Imports */
import "./TableEditor.scss";

/* Image Imports */

/* Component Imports */
import ItemGrid from "../itemGrid/ItemGrid";

/* Module Imports */
import { allRestaurantsQuery } from "../../config/queries";

/* Component Interfaces */
interface Props {
  dataMode: string;
}

/* Component/Functions */
const TableEditor: React.FC<Props> = ({ dataMode }) => {
  const queries: any = {
    restaurants: useQuery(["restaurants"], allRestaurantsQuery),
  };

  //Function return statement
  return (
    <div className="TableEditor">
      <div className="editorActions">
        <button className="editorButton">ADD ITEM</button>
      </div>
      {queries[dataMode].onSuccess ? (
        <ItemGrid items={queries[dataMode].data} />
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

/* Export Statement */
export default TableEditor;
