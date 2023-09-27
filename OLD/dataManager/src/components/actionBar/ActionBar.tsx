/* Library Imports */
//React
import React from 'react';

/* Stylesheet Imports */
import './ActionBar.scss';

/* Image Imports */

/* Component Imports */

/* Module Imports */

/* Component Interfaces */
interface ActionObj {
  text: string;
  action: any;
  active: boolean;
}

interface Props {
  actions: ActionObj[];
}

/* Component/Functions */
const ActionBar: React.FC<Props> = ({ actions }) => {
  //Variable to store rendered actions;
  let renderedActions;
  //Logic to render actions
  if (actions.length > 0) {
    renderedActions = actions.map(({ text, action, active }) => {
      if (active)
        return (
          <button className="actionItem active" onClick={action}>
            {text}
          </button>
        );
      if (!active)
        return (
          <button className="actionItem" onClick={action}>
            {text}
          </button>
        );
    });
  }

  //Function return statement
  return <div className="ActionBar">{renderedActions}</div>;
};

/* Export Statement */
export default ActionBar;
