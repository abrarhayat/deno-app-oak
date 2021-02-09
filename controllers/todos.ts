import { RouterContext } from "https://deno.land/x/oak/mod.ts";

import Todo from "../models/todo.ts";

type Body = {
  text: string;
};

export const getAllTodos = async (ctx: RouterContext) => {
  const todos = await Todo.all();
  //console.log("todos", todos);
  const tranformedTodos = todos.map((todo) => {
    return {
      id: todo.id,
      text: todo.text,
    };
  });

  ctx.response.body = {
    message: "All todos retrieved successfully!",
    todos: tranformedTodos,
  };
};

export const createNewTodo = async (ctx: RouterContext) => {
  const body: Body = await ctx.request.body().value;
  const result = await Todo.create({
    text: body.text,
  });
  console.log(result);
  const todo = { text: body.text, id: result.lastInsertId as string };
  ctx.response.body = {
    message: "Created todo successfully!",
    todo: todo,
  };
};

export const updateTodo = async (ctx: RouterContext) => {
  const todoId = ctx.params.todoId as string;
  const body: Body = await ctx.request.body().value;
  const result = await Todo.where("id", todoId).update("text", body.text);
  console.log(result);
  const updatedTodo = { text: body.text, id: todoId };
  ctx.response.body = {
    message: "Updated todo successfully!",
    todo: updatedTodo,
  };
};

export const deleteTodo = async (ctx: RouterContext) => {
  const todoId = ctx.params.todoId;
  console.log(todoId);
  const result = await Todo.where("id", todoId as string).delete();
  console.log(result);
  ctx.response.body = {
    message: "Deleted todo successfully!",
  };
};
