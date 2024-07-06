/* Database Connection */
import db from "../../db";

async function getAllLogs() {
  try {
    //Get All Items from db
    const query = await db.query("select * from log", []);

    return query.rows;
  } catch (err) {
    //Throw Error
    console.log({ error: "Request Failed", info: err });
  }
}

async function addLogItem(
  eventType: string,
  message: string,
  level: string,
  request: string,
  response: string
) {
  try {
    //Add Item to db
    const query = await db.query(
      "insert into log (event_type, message, level, request, response) values ($1, $2, $3, $4, $5) returning *",
      [eventType, message, level, request, response]
    );

    return query.rows[0];
  } catch (err) {
    //Throw Error
    console.log({ error: "Request Failed", info: err });
  }
}

export default { getAllLogs, addLogItem };
