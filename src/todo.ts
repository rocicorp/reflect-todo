// This file defines our domain objects and some CRUD helpers.
//
// For convenience we use @rocicorp/rails to do this (see:
// https://github.com/rocicorp/rails). Rails generates these CRUD functions and
// also schema validation.

import { generate, Update } from "@rocicorp/rails";

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  sort: number;
};

export type TodoUpdate = Update<Todo>;
export const {
  put: putTodo,
  update: updateTodo,
  delete: deleteTodo,
  list: listTodos,
} = generate<Todo>("todo");
