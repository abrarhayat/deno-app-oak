import { Database, MySQLConnector } from "https://deno.land/x/denodb/mod.ts";

let db: Database;
export const connect = () => {
  try {
    const connector = new MySQLConnector({
      database: Deno.env.get("MY_SQL_SCHEMA") as string,
      host: Deno.env.get("MY_SQL_HOST") as string,
      username: Deno.env.get("MY_SQL_USERNAME") as string,
      password: Deno.env.get("MY_SQL_PASSWORD") as string,
      port: parseInt(Deno.env.get("MY_SQL_PORT") as string),
    });
    db = new Database(connector);
  } catch (err) {
    console.log(err);
  }
};

export const getDB = () => {
  if (!db) {
    connect();
  }
  return db;
};
