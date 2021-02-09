import { RouterContext } from "https://deno.land/x/oak/mod.ts";

import { getDB } from "../utils/db_utils.ts";
import { Todo } from "../models/todo.ts";

type Body = {
  text: string;
};

export const getAllTodos = async (ctx: RouterContext) => {
  try {
    const todos = (await getDB()).collection("todos").find();
    const tranformedTodos = todos.map((todo: any) => {
      return {
        _id: todo._id.$oid,
        text: todo.text,
      };
    });
    ctx.response.body = {
      message: "All todos retrieved successfully!",
      todos: tranformedTodos,
    };
  } catch (err) {
    console.log(err);
  }
};

export const createNewTodo = async (ctx: RouterContext) => {
  try {
    const body: Body = await ctx.request.body().value;
    const todo: Todo = {
      text: body.text,
    };
    const id = await (await getDB()).collection("todos").insertOne(todo);
    todo.id = id.$oid;
    ctx.response.body = {
      message: "Created todo successfully!",
      todo: todo,
    };
  } catch (err) {
    console.log(err);
  }
};

export const updateTodo = async (ctx: RouterContext) => {
  try {
    const todoId = ctx.params.todoId;
    const body: Body = await ctx.request.body().value;
    const result = await (await getDB())
      .collection("todos")
      .updateOne({ _id: todoId }, { $set: { text: body.text } });
    ctx.response.body = {
      message: "Updated todo successfully!",
    };
  } catch (err) {
    console.log(err);
  }
};

export const deleteTodo = async (ctx: RouterContext) => {
  try {
    const todoId = ctx.params.todoId;
    const result = await (await getDB())
      .collection("todos")
      .deleteOne({ _id: todoId });
    ctx.response.body = {
      message: "Deleted todo successfully!",
    };
  } catch (err) {
    console.log(err);
  }
};
