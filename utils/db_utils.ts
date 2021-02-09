import { MongoClient } from "https://deno.land/x/mongo@v0.21.2/mod.ts";

let client: MongoClient;
let db;

export const connect = async () => {
  try {
    client = new MongoClient();
    await client.connect(Deno.env.get("MONGO_DB_URI") as string);
  } catch (err) {
    console.log(err);
  }
};

export const getDB = async () => {
  db = await client.connect("todo-app-deno");
  return db;
};
