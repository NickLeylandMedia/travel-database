const allRestaurantsQuery = async () => {
  try {
    const response = await fetch(
      "https://brickwall-adult-server.onrender.com/api/girls",
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
    return [];
  }
};

export { allRestaurantsQuery };
