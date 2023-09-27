/* Library Imports */
//Detect-it
import { deviceType } from 'detect-it';

//React
import React, { useEffect, useState } from 'react';

/* Stylesheet Imports */
import './NavBar.scss';

/* Image Imports */

/* Component Imports */

/* Module Imports */

/* Component Interfaces */
interface LinkObj {
  name: string;
  link: string;
  active: boolean;
}

interface Props {
  links: LinkObj[];
}

/* Component/Functions */
const NavBar: React.FC<Props> = ({ links }) => {
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

  //Variable to store rendered links
  let renderedLinks;

  //Logic to render links
  if (links.length) {
    renderedLinks = links.map((link) => {
      if (link.active) {
        return (
          <a className={`navLink active ${hoverCond}`} href={link.link}>
            {link.name}
          </a>
        );
      }
      return (
        <a className={`navLink ${hoverCond}`} href={link.link}>
          {link.name}
        </a>
      );
    });
  }

  //Function return statement
  return <div className="NavBar">{renderedLinks}</div>;
};

/* Export Statement */
export default NavBar;
