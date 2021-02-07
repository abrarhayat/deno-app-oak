import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  getAllTodos,
  createNewTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todos.ts";

const router = new Router();

router.get("/todos", getAllTodos);

router.post("/todo", createNewTodo);

router.put("/todo/:todoId", updateTodo);

router.delete("/todo/:todoId", deleteTodo);

export default router;
