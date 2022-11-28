const allRestaurantsQuery = async () => {
  try {
    const response = await fetch(
      "https://brickwall-travel-database.onrender.com/api/restaurants",
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();
    return json;
  } catch (error) {
    console.log("error", error);
    return { error: error };
  }
};

export { allRestaurantsQuery };
