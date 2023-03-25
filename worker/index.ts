import {
  createDatadogMetricsSink,
  createReflectServer,
} from "@rocicorp/reflect-server";
import { mutators } from "../src/mutators";

const authHandler = async (auth: string) => {
  return {
    userID: auth,
  };
};

const { worker, RoomDO, AuthDO } = createReflectServer((env: any) => ({
  mutators,
  authHandler,
  logLevel: "debug",
  metricsSink: createDatadogMetricsSink({
    apiKey: env.DATADOG_API_KEY,
    service: "reflect-todo",
  }),
}));
export { worker as default, RoomDO, AuthDO };
