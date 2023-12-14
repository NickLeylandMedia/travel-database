/* GET REQUESTS */
//All Restaurants
function fetchAllRestaurants() {
  return fetch("http://127.0.0.1:3008/api/restaurants").then((res) =>
    res.json()
  );
}

//One Restaurant
function fetchOneRestaurant(id: string) {
  return fetch(`http://127.0.0.1:3008/api/restaurants/${id}`).then((res) =>
    res.json()
  );
}

//All Tags
function fetchAllRestaurantTags() {
  return fetch("http://localhost:3008/api/restags").then((res) => res.json());
}

//All Types
function fetchAllRestaurantTypes() {
  return fetch("http://localhost:3008/api/restypes").then((res) => res.json());
}
/* END GET REQUESTS */

/* POST REQUESTS */
//New Restaurant
function postNewRestaurant(
  name: string,
  city: string,
  state: string,
  coord: string,
  description: string,
  picture: string | null,
  zip: string,
  address: string,
  active: boolean,
  seasonal: boolean,
  month_closed_text: string,
  month_closed_numeric: number,
  year_closed: number,
  summary: string
) {
  const payload = JSON.stringify({
    name: name,
    city: city,
    state: state,
    coord: coord || null,
    description: description || null,
    picture: picture || null,
    zip: zip,
    address: address || null,
    active: active,
    seasonal: seasonal || false,
    month_closed_text: month_closed_text || null,
    month_closed_numeric: month_closed_numeric || null,
    year_closed: year_closed || null,
    summary: summary || null,
  });

  return fetch("http://localhost:3008/api/restaurants", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
  }).then((res) => res.json());
}

//New Restaurant Tag Relationship
function postNewRestaurantTagRel(restaurant_id: string, tag_id: string) {
  const payload = JSON.stringify({
    restaurant_id: restaurant_id,
    restaurant_tag_id: tag_id,
  });

  return fetch("http://localhost:3008/api/restagrel", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
  }).then((res) => res.json());
}

//New Restaurant Type Relationship
function postNewRestaurantTypeRel(restaurant_id: string, type_id: string) {
  const payload = JSON.stringify({
    restaurant_id: restaurant_id,
    restaurant_type_id: type_id,
  });

  return fetch("http://localhost:3008/api/restyperel", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
  }).then((res) => res.json());
}
/* END POST REQUESTS */

/* PUT REQUESTS */
function updateRestaurant(
  id: string,
  name: string,
  city: string,
  state: string,
  coord: string,
  description: string,
  picture: string,
  zip: string,
  address: string,
  active: boolean,
  seasonal: boolean,
  month_closed_text: string,
  month_closed_numeric: number,
  year_closed: number,
  summary: string
) {
  //Initialize Payload
  const payload = JSON.stringify({
    name: name,
    city: city,
    state: state,
    coord: coord || null,
    description: description || null,
    picture: picture || null,
    zip: zip,
    address: address || null,
    active: active,
    seasonal: seasonal || false,
    month_closed_text: month_closed_text || null,
    month_closed_numeric: month_closed_numeric || null,
    year_closed: year_closed || null,
    summary: summary || null,
  });

  return fetch(`http://localhost:3008/api/restaurants/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
  }).then((res) => res.json());
}
/* END PUT REQUESTS */

export {
  fetchAllRestaurants,
  fetchOneRestaurant,
  fetchAllRestaurantTags,
  fetchAllRestaurantTypes,
  postNewRestaurant,
  postNewRestaurantTagRel,
  postNewRestaurantTypeRel,
  updateRestaurant,
};
