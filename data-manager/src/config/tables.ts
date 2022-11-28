import { allRestaurantsQuery } from "./queries";

const dataModes = ["meals", "restaurants"];

const tableSelectorConfig = [{ name: "restaurants" }, { name: "meals" }];

const tableConfig = [
  { name: "restaurants", queryFunc: allRestaurantsQuery },
  //   { name: "meals" },
];

export { dataModes, tableConfig, tableSelectorConfig };
