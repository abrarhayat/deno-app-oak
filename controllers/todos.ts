import { RouterContext } from "https://deno.land/x/oak/mod.ts";

import Todo from "../models/todo.ts";

type Body = {
  text: string;
};

export const getAllTodos = async (ctx: RouterContext) => {
  try {
    const todos = await Todo.all();
    //console.log("todos", todos);
    const tranformedTodos = todos.map((todo: any) => {
      return {
        _id: todo._id.toString(),
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
    const todo = {
      text: body.text,
    };
    const result = await Todo.create(todo);
    console.log(result);
    ctx.response.body = {
      message: "Created todo successfully!",
      todo: result,
    };
  } catch (err) {
    console.log(err);
  }
};

export const updateTodo = async (ctx: RouterContext) => {
  try {
    const todoId = ctx.params.todoId as string;
    const body: Body = await ctx.request.body().value;
    const updatedTodo = await Todo.where("_id", todoId.toString()).update(
      "text",
      body.text
    );
    ctx.response.body = {
      message: "Updated todo successfully!",
      todo: updatedTodo,
    };
  } catch (err) {
    console.log(err);
  }
};

export const deleteTodo = async (ctx: RouterContext) => {
  try {
    const todoId = ctx.params.todoId;
    const result = await Todo.deleteById(todoId as string);
    ctx.response.body = {
      message: "Deleted todo successfully!",
    };
  } catch (err) {
    console.log(err);
  }
};
