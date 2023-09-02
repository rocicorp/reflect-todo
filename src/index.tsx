import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app";
import { mutators } from "./mutators";
import { Reflect } from "@rocicorp/reflect/client";
import { nanoid } from "nanoid";

const socketOrigin =
  import.meta.env.VITE_REFLECT_URL ??
  "wss://medieval-viridian-soldier-lloyod8u.reflect-server.net";

const r = new Reflect({
  socketOrigin,
  userID: nanoid(),
  roomID: "my-room",
  mutators,
});

r.onOnlineChange = (onlineParam) => {
  console.log("online", r.online, onlineParam);
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App reflect={r} />
  </React.StrictMode>
);
