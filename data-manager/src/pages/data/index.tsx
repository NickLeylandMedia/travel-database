/* Library Imports */
//React
import React, { useEffect, useState } from "react";

/* Stylesheet Imports */

/* Image Imports */

/* Component Imports */
import TableDisp from "@/components/data/tableDisp/TableDisp";
import TableSelector from "@/components/data/tableSelector/TableSelector";

/* Module Imports */
//Array Tools
import { getAllTitles } from "@/modules/arrTools";
//React Query
import { useQuery } from "react-query";
//Next Router
import { useRouter } from "next/router";
//API
import {
  fetchAllRestaurants,
  fetchAllRestaurantTags,
  fetchAllRestaurantTypes,
} from "@/modules/api";
//Recoil
import { useRecoilValue, useRecoilState } from "recoil";
//Recoil Atoms
import { targetItemDetails } from "@/modules/atoms/appAtoms";

/* Component Interfaces */
interface Props {
  restaurants: any;
  resTags: any;
  resTypes: any;
}

/* Component */
const Data: React.FC<Props> = ({ restaurants, resTags, resTypes }) => {
  console.log({ restaurants: restaurants });
  console.log({ resTags: resTags });
  console.log({ resTypes: resTypes });
  /* State Variables */
  //Query State
  const queries = [
    {
      title: "restaurants",
      query: restaurants,
    },
    {
      title: "restaurant_tags",
      query: resTags,
    },
    {
      title: "restaurant_types",
      query: resTypes,
    },
  ];
  //Rendered Objects State
  const [renderArray, setRenderArray] = useState<any[]>([]);
  //Selected Table State
  const [selectedTable, setSelectedTable] = useState<string>("");
  //Page Mode State
  const [pageMode, setPageMode] = useState<string>("grid");
  //Router
  const router = useRouter();
  /* End State Variables */

  /* Render Variables */
  /* End Render Variables */

  /* Functions */
  /* End Functions */

  /* Effects */
  //Effect to set the render array from selected table
  useEffect(() => {
    const query = queries.find((query) => query.title === selectedTable);
    if (query) {
      setRenderArray(query.query);
    }
  }, [selectedTable]);

  /* Component Return Statement */
  return (
    <div className="page Data">
      {/* Header Start */}
      <header></header>
      {/* Header End */}
      {/* Content Start */}
      <div className="mainContent">
        <TableSelector
          tableSetter={setSelectedTable}
          tables={getAllTitles(queries)}
        />
        <TableDisp selectedTable={selectedTable} items={renderArray} />
      </div>
      {/* Content End */}
      {/* Footer Start */}
      {/* <Footer /> */}
      {/* Footer End */}
    </div>
  );
};

export async function getStaticProps() {
  const restaurants = await fetchAllRestaurants();
  const resTags = await fetchAllRestaurantTags();
  const resTypes = await fetchAllRestaurantTypes();

  return {
    props: {
      restaurants,
      resTags,
      resTypes,
    },
    revalidate: 10,
  };
}

/* Export Statement */
export default Data;
