// This file defines our "mutators".
//
// Mutators are how you change data in Reflect.
//
// They are registered with Reflect at construction-time and callable like:
// `myReflect.mutate.createTodo({text: "foo"})`.
//
// Reflect runs each mutation immediately (optimistically) on the client,
// against the local cache. Then later (usually moments later) sends a
// description of the mutation (its name and arguments) to the server, so that
// the server can *re-run* the mutation there against the authoritative
// datastore.
//
// This re-running of mutations is how Reflect handles conflicts: the mutators
// defensively check the database when they run and do the appropriate thing.
// The Reflect sync protocol ensures that the server-side result takes
// precedence over the client-side optimistic result.

import { WriteTransaction } from "@rocicorp/reflect";
import { updateTodo, deleteTodo, Todo, listTodos, putTodo } from "./todo";

export type M = typeof mutators;

export const mutators = {
  // We use these two generic update functions as mutators as-is.
  updateTodo,
  deleteTodo,

  // We also create one special purpose mutator with special merge logic.
  //
  // This mutator creates a new todo, assigning the next available sort value.
  //
  // If two clients create new todos concurrently, they both might choose the
  // same sort value locally (optimistically). That's fine because later when
  // the mutator re-runs on the server the two todos will get unique values.
  //
  // Reflect will automatically sync the change back to the clients, reconcile
  // any changes that happened client-side in the meantime, and update the UI
  // to reflect the changes.
  createTodo: async (
    tx: WriteTransaction,
    todo: { id: string; text: string; completed: boolean }
  ) => {
    const todos = await listTodos(tx);
    todos.sort((t1, t2) => t1.sort - t2.sort);

    const maxSort = todos.pop()?.sort ?? 0;
    const newTodo: Todo = { ...todo, sort: maxSort + 1 };
    await putTodo(tx, newTodo);
  },

  init: async () => {
    // This shouldn't be necessary, but Reflect doesn't send initial snapshot
    // until first mutation. Bug: https://github.com/rocicorp/reflect-server/issues/146.
  },
};
