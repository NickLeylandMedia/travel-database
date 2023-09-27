/* Library Imports */
//React
import React from 'react';

/* Stylesheet Imports */
import './AddMenu.scss';

/* Image Imports */

/* Component Imports */

/* Module Imports */

/* Component Interfaces */
interface Props {
  dataType: string;
  singleAction: any;
  bulkAction: any;
}

/* Component/Functions */
const AddMenu: React.FC<Props> = ({ bulkAction, dataType, singleAction }) => {
  //Function return statement
  return (
    <div className="AddMenu">
      <h3>Add {dataType}s</h3>
      <button onClick={singleAction}>FORM</button>
      <button onClick={bulkAction}>CSV</button>
    </div>
  );
};

/* Export Statement */
export default AddMenu;
