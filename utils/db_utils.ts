import { Database, MySQLConnector } from "https://deno.land/x/denodb/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

let db: Database;
const envConfig = await config();
export const connect = () => {
  try {
    const connector = new MySQLConnector({
      database:
        (Deno.env.get("MY_SQL_SCHEMA") as string) || envConfig["MY_SQL_SCHEMA"],
      host: (Deno.env.get("MY_SQL_HOST") as string) || envConfig["MY_SQL_HOST"],
      username:
        (Deno.env.get("MY_SQL_USERNAME") as string) ||
        envConfig["MY_SQL_USERNAME"],
      password:
        (Deno.env.get("MY_SQL_PASSWORD") as string) ||
        envConfig["MY_SQL_PASSWORD"],
      port:
        parseInt(Deno.env.get("MY_SQL_PORT") as string) ||
        envConfig["MY_SQL_PORT"],
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
