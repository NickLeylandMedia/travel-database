const getRestaurants = async () => {
  const response = await fetch(
    'https://brickwall-travel-database.onrender.com/api/restaurants'
  );
  const data = await response.json();

  return data;
};

/* Send CSV to API */
const sendCSV = async (data: any, callback: any) => {
  console.log({ sentData: data });
  fetch('//127.0.0.1:3009/api/restaurants/bulk', {
    method: 'POST',
    body: data,
  }).then(async (res) => {
    const result = await res.json();
    if (callback) {
      callback(result);
    }
  });
};

export { getRestaurants, sendCSV };
