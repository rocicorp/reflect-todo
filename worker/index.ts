import { createReflectServer } from "@rocicorp/reflect-server";
import { mutators } from "../src/mutators";

const { worker, RoomDO, AuthDO } = createReflectServer(() => ({
  mutators,
  logLevel: "debug",
}));

export { worker as default, RoomDO, AuthDO };
