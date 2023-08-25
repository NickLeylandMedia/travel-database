/* Library Imports */
//Detect It
import { deviceType } from 'detect-it';

//React
import React, { useEffect, useState } from 'react';

/* Stylesheet Imports */
import './CardGrid.scss';

/* Image Imports */

/* Component Imports */

/* Module Imports */

/* Component Interfaces */
interface CardObj {
  id: number;
  name: string;
  snippet: string;
  image: string;
}

interface Props {
  items: CardObj[];
  mode: 'view' | 'edit';
}

/* Component/Functions */
const CardGrid: React.FC<Props> = ({ items, mode }) => {
  /* MOBILE STATE LOGIC */
  //Logic + Vars for hover state
  let hoverCond: any;

  //State to store mobile logic
  const [isMobile, setMob] = useState<boolean>(false);

  //Logic to set if mobile
  useEffect(() => {
    if (deviceType !== 'mouseOnly') setMob(true);
  }, []);

  //Logic to determine hover condition
  if (!isMobile) hoverCond = 'hoverable';
  /* END MOBILE STATE LOGIC */

  //Logic for rendering card grid
  let renderedCards;
  if (items.length > 0) {
    renderedCards = items.map((item) => {
      return (
        <div className={`card ${hoverCond}`} key={item.id}>
          <img src={item.image} alt={item.name} />
          <h3>{item.name}</h3>
          <p>{item.snippet}</p>
          {mode === 'edit' ? <button>EDIT</button> : <button>VIEW</button>}
        </div>
      );
    });
  }
  //Function return statement
  return <div className="CardGrid">{renderedCards}</div>;
};

/* Export Statement */
export default CardGrid;
