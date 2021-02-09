import { Model, DataTypes } from "https://deno.land/x/denodb/mod.ts";

import { getDB } from "../utils/db_utils.ts";

class Todo extends Model {
  static fields = {
    id: DataTypes.INTEGER,
    text: DataTypes.STRING,
  };
  static table = "todo";
}
const db = getDB();
try {
  db.link([Todo]);
  await db.sync();
} catch (err) {
  console.log(err);
}

export default Todo;
