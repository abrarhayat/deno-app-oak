import { Database, MongoDBConnector } from "https://deno.land/x/denodb/mod.ts";

let db: Database;
export const connect = () => {
  try {
    const connector = new MongoDBConnector({
      uri: Deno.env.get("MONGO_DB_URI") as string,
      database: "todo-app-deno",
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
