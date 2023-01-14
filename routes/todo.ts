import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  getAllTodos,
  createNewTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todos.ts";

const router = new Router();

router.get("/", async (ctx: RouterContext) => {
  ctx.response.body = {
    message: "Hit this route: /todos",
  };
});

router.get("/todos", getAllTodos);

router.post("/todo", createNewTodo);

router.put("/todo/:todoId", updateTodo);

router.delete("/todo/:todoId", deleteTodo);

export default router;
