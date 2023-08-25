import { Pool } from "pg";

//DotENV
import dotenv from "dotenv";

/* ENV Initialization */
dotenv.config();

/* Env Variables */
const DBCONN = process.env.DB_CONNECTION_URL;

//Local DB Connection
// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "travelData",
//   password: "",
//   port: 5432,
// });

//CockroachDB Connection
const pool = new Pool({
  connectionString: DBCONN,
});

const cbquery = (text: any, params: any, callback: any): any => {
  pool.query(text, params, callback);
};

const query = (text: any, params: any): any => {
  pool.query(text, params);
};

export default { pool, query, cbquery };
