import { Todo } from "../models/todo.ts";
import { RouterContext } from "https://deno.land/x/oak/mod.ts";

let todos: Todo[] = [];

export const getAllTodos = (ctx: RouterContext) => {
  try {
    ctx.response.body = {
      message: "All todos retrieved successfully!",
      todos: todos,
    };
  } catch (err) {
    console.log(err);
  }
};

export const createNewTodo = async (ctx: RouterContext) => {
  try {
    const body = await ctx.request.body().value;
    const todo: Todo = {
      id: new Date().toISOString(),
      text: body.text,
    };
    todos.push(todo);
    ctx.response.body = {
      message: "Created todo successfully!",
      todo: todo,
      todos: todos,
    };
  } catch (err) {
    console.log(err);
  }
};

export const updateTodo = async (ctx: RouterContext) => {
  try {
    const todoId = ctx.params.todoId;
    const body = await ctx.request.body().value;
    if (todos.length === 0) {
      ctx.response.body = {
        message: "No todos found!",
      };
      return;
    }
    const updatedTodoIndex = todos.findIndex((todo) => todo.id === todoId);
    if (updatedTodoIndex < 0) {
      ctx.response.body = {
        message: "No todo found with ID!",
      };
      return;
    }
    todos[updatedTodoIndex] = {
      id: todos[updatedTodoIndex].id,
      text: body.text,
    };
    ctx.response.body = {
      message: "Updated todo successfully!",
      todo: todos[updatedTodoIndex],
      todos: todos,
    };
  } catch (err) {
    console.log(err);
  }
};

export const deleteTodo = (ctx: RouterContext) => {
  try {
    const todoId = ctx.params.todoId;
    if (todos.length === 0) {
      ctx.response.body = {
        message: "No todos found!",
      };
      return;
    }
    const deletedTodoIndex = todos.findIndex((todo) => todo.id === todoId);
    if (deletedTodoIndex < 0) {
      ctx.response.body = {
        message: "No todo found with ID!",
      };
      return;
    }
    todos = todos.filter((todo) => todo.id !== todoId);
    ctx.response.body = {
      message: "Deleted todo successfully!",
      todos: todos,
    };
  } catch (err) {
    console.log(err);
  }
};
