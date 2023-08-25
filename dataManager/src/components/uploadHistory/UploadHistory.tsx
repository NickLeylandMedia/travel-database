/* Library Imports */
//React
import React from 'react';

/* Stylesheet Imports */
import './UploadHistory.scss';

/* Image Imports */

/* Component Imports */

/* Module Imports */

/* Component Interfaces */
interface UploadObj {
  id: string;
  date: string;
  name: string;
}

interface Props {
  items: UploadObj[];
}

/* Component/Functions */
const UploadHistory: React.FC<Props> = ({ items }) => {
  //Logic to render history items
  let renderedItems;

  if (items.length > 0) {
  }
  //Function return statement
  return <div className="UploadHistory"></div>;
};

/* Export Statement */
export default UploadHistory;
