/* Library Imports */
//React
import React from "react";

/* Stylesheet Imports */

/* Image Imports */

/* Component Imports */
import CreatorMenu from "@/components/create/creatorMenu/CreatorMenu";

/* Module Imports */

/* Component Interfaces */
interface Props {}

/* Component */
const Create: React.FC<Props> = () => {
  /* State Variables */
  /* End State Variables */

  /* Render Variables */
  /* End Render Variables */

  /* Functions */
  /* End Functions */

  /* Effects */
  /* End Effects */

  /* Component Return Statement */
  return (
    <div className="page Create">
      {/* Header Start */}
      <header></header>
      {/* Header End */}
      {/* Content Start */}
      <div className="mainContent">
        <CreatorMenu
          links={[
            { title: "Restaurant", path: "/data/create/restaurants" },
            { title: "Restaurant Type", path: "/data/create/restaurant_types" },
            { title: "Restaurant Tag", path: "/data/create/restaurant_tags" },
          ]}
        />
      </div>
      {/* Content End */}
      {/* Footer Start */}
      {/* <Footer /> */}
      {/* Footer End */}
    </div>
  );
};

/* Export Statement */
export default Create;
