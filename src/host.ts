export const reflectServer = import.meta.env.VITE_REFLECT_SERVER!;

if (!reflectServer) {
  throw new Error("Required env var VITE_REFLECT_SERVER is not defined");
}
