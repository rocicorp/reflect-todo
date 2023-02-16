import {
  consoleLogSink,
  createReflectServer,
  DatadogLogSink,
  DatadogMetricsSink,
  ReflectServerBaseEnv,
} from "@rocicorp/reflect-server";
import { mutators } from "../src/mutators";

const authHandler = async (auth: string) => {
  return {
    userID: auth,
  };
};

type Env = ReflectServerBaseEnv & {
  ["DATADOG_API_KEY"]?: string | undefined;
};

const { worker, RoomDO, AuthDO } = createReflectServer({
  mutators,
  authHandler,
  getLogLevel: () => "debug",
  getLogSinks: (env: Env) => {
    const sinks = [consoleLogSink];
    if (env.DATADOG_API_KEY) {
      sinks.push(
        new DatadogLogSink({
          apiKey: env.DATADOG_API_KEY,
          service: "replidraw-do",
        })
      );
    }
    return sinks;
  },
  getMetricsSink: (env: Env) =>
    env.DATADOG_API_KEY
      ? new DatadogMetricsSink({
          apiKey: env.DATADOG_API_KEY,
        })
      : undefined,
});
export { worker as default, RoomDO, AuthDO };
