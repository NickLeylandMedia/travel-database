/* Library Imports */
//React
import React from "react";

/* Stylesheet Imports */
import "./TableDisp.scss";

/* Image Imports */

/* Component Imports */

/* Module Imports */
import { tableSelectorConfig } from "../../config/tables";

/* Component Interfaces */

/* Component/Functions */
const TableDisp = () => {
  //Logic to render tables
  const renderedTables = tableSelectorConfig.map((table) => {
    return (
      <div className="table" key={table.name}>
        <h3>{table.name}</h3>
        <button>EDIT</button>
        <button>VIEW</button>
      </div>
    );
  });

  //Function return statement
  return (
    <div className="TableDisp">
      <div className="rendTableCont">{renderedTables}</div>
    </div>
  );
};

/* Export Statement */
export default TableDisp;
