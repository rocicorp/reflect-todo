import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app";
import { mutators } from "./mutators";
import { Reflect } from "@rocicorp/reflect/client";

const server = import.meta.env.VITE_REFLECT_SERVER ?? "";

const r = new Reflect({
  server,
  userID: "anon",
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
