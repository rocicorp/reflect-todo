import { createReflectServer } from "@rocicorp/reflect-server";
import { mutators, setEnv } from "../src/mutators";

setEnv("server");

const authHandler = async (auth: string) => {
  return {
    userID: auth,
  };
};

const { worker, RoomDO, AuthDO } = createReflectServer({
  mutators,
  authHandler,
  getLogLevel: () => "debug",
});
export { worker as default, RoomDO, AuthDO };
