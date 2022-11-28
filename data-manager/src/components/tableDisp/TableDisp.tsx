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
interface Props {
  pageModeSetter: (pageMode: string) => void;
}

/* Component/Functions */
const TableDisp: React.FC<Props> = ({ pageModeSetter }) => {
  //Logic to render tables
  const renderedTables = tableSelectorConfig.map((table) => {
    //Capitalize a string
    const capName = table.name.charAt(0).toUpperCase() + table.name.slice(1);

    return (
      <div className="table" key={`table${table.name}`}>
        <h3>{capName}</h3>
        <button onClick={() => pageModeSetter("edit")}>EDIT</button>
        <button onClick={() => pageModeSetter("view")}>VIEW</button>
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
