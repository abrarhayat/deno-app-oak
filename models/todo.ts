import { Model, DataTypes } from "https://deno.land/x/denodb/mod.ts";

import { getDB } from "../utils/db_utils.ts";

class Todo extends Model {
  static fields = {
    _id: {
      primaryKey: true,
    },
    text: DataTypes.STRING,
  };
}
const db = getDB();
try {
  db.link([Todo]);
  await db.sync();
} catch (err) {
  console.log(err);
}

export default Todo;
