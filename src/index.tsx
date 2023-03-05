import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app";
import { mutators } from "./mutators";
import { Reflect } from "@rocicorp/reflect";

const userID = "reflect-user";
const roomID: string | undefined = import.meta.env.VITE_ROOM_ID;
if (roomID === undefined || roomID === "") {
  throw new Error("VITE_ROOM_ID required");
}
const socketOrigin =
  import.meta.env.VITE_WORKER_URL ??
  "wss://reflect-todo.replicache.workers.dev";

const r = new Reflect({
  socketOrigin,
  userID,
  roomID,
  mutators,
  auth: () => {
    console.log("auth callback");
    return userID;
  },
});

r.onOnlineChange = (onlineParam) => {
  console.log("online", r.online, onlineParam);
};

// Workaround for https://github.com/rocicorp/reflect-server/issues/146.
// We don't receive initial data until first mutation after connection.
void r.mutate.init();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App reflect={r} />
  </React.StrictMode>
);
