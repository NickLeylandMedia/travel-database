/* Library Imports */
//React
import React, { useState } from "react";

/* Stylesheet Imports */

/* Image Imports */

/* Component Imports */
import TableDisp from "../components/tableDisp/TableDisp";

/* Module Imports */

/* Component Interfaces */

/* Component/Functions */
const Data = () => {
  //State to store page mode
  const [pageMode, setPageMode] = useState("select");

  //Function return statement
  if (pageMode === "select") {
    return (
      <div className="Data page">
        <TableDisp />
      </div>
    );
  }
  return (
    <div className="Data page">
      <TableDisp />
    </div>
  );
};

/* Export Statement */
export default Data;
