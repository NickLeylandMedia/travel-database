/* Library Imports */
//React
import { type } from 'os';
import React from 'react';

/* Stylesheet Imports */
import './InputWithLabel.scss';

/* Image Imports */

/* Component Imports */

/* Module Imports */

/* Component Interfaces */
interface Props {
  label: string;
  callback: any;
  type: 'text' | 'number' | 'email' | 'password' | 'date' | 'time' | 'file';
}

/* Component/Functions */
const InputWithLabel: React.FC<Props> = ({ callback, label, type }) => {
  //Variable to store rendered input
  let renderedInput;

  //Logic to render input type
  if (type === 'text') {
    renderedInput = (
      <input
        type="text"
        name="input"
        id="input"
        onChange={(e) => callback(e.target.value)}
      />
    );
  }
  if (type === 'file') {
    renderedInput = (
      <input
        type="file"
        name="csv"
        id="csv"
        onChange={(e) => callback(e.target.files?.[0])}
      />
    );
  }

  //Function return statement
  return (
    <div className="InputWithLabel">
      <label htmlFor="input">{label}</label>
      {renderedInput}
    </div>
  );
};

/* Export Statement */
export default InputWithLabel;
