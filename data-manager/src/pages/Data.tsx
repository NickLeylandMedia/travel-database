/* Library Imports */
//React
import React, { useState } from "react";
//Tanstack Query
import { useQuery } from "@tanstack/react-query";

/* Stylesheet Imports */

/* Image Imports */

/* Component Imports */
import TableDisp from "../components/tableDisp/TableDisp";
import TableEditor from "../components/tableEdit/TableEditor";

/* Module Imports */
//Table + Data Config
import { tableConfig } from "../config/tables";
import { allRestaurantsQuery } from "../config/queries";

/* Component Interfaces */

/* Component/Functions */
const Data = () => {
  //State for Data Mode
  const [dataMode, setDataMode] = useState("restaurants");

  //State to store page mode
  const [pageMode, setPageMode] = useState("select");

  //Function return statement
  //Table Editor Mode
  if (pageMode === "edit") {
    return (
      <div className="Data page">
        <TableEditor dataMode={dataMode} />
      </div>
    );
  }

  //Table Selector Mode
  if (pageMode === "select") {
    return (
      <div className="Data page">
        <TableDisp pageModeSetter={setPageMode} />
      </div>
    );
  }

  //Table Viewer Mode
  if (pageMode === "view") {
    return <div className="Data page"></div>;
  }

  //Default Mode (Table Selector)
  return (
    <div className="Data page">
      <TableDisp pageModeSetter={setPageMode} />
    </div>
  );
};

/* Export Statement */
export default Data;
