import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app";
import { mutators } from "./mutators";
import { Reflect, ReadTransaction } from "@rocicorp/reflect";
import { nanoid } from "nanoid";

const userID = nanoid();
const roomID = "s1";
const socketOrigin =
  import.meta.env.VITE_WORKER_URL ??
  "wss://reflect-todo.replicache.workers.dev";

const r = new Reflect({
  socketOrigin,
  userID,
  roomID,
  auth: userID,
  mutators,
});

r.subscribe(
  async (tx: ReadTransaction) => {
    console.log("querying...");
    return await tx.get("init");
  },
  {
    onData: async (data) => {
      console.log("got data", data);
      if (data === "server") {
        console.log(
          "first sync complete - data is:",
          await r.query((tx) => tx.scan().toArray())
        );
      }
    },
  }
);

// Workaround for https://github.com/rocicorp/reflect-server/issues/146.
// We don't receive initial data until first mutation after connection.
void r.mutate.init();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App reflect={r} />
  </React.StrictMode>
);
