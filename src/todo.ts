// This file defines our domain objects and some CRUD helpers.
//
// For convenience we use @rocicorp/rails to do this (see:
// https://github.com/rocicorp/rails). Rails generates these CRUD functions and
// also schema validation.

import { z } from "zod";
import { entitySchema, generate, Update } from "@rocicorp/rails";

export const todoSchema = entitySchema.extend({
  text: z.string(),
  completed: z.boolean(),
  sort: z.number(),
});

export type Todo = z.infer<typeof todoSchema>;
export type TodoUpdate = Update<Todo>;
export const {
  put: putTodo,
  update: updateTodo,
  delete: deleteTodo,
  list: listTodos,
} = generate("todo", todoSchema);
