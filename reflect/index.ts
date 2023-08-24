import type { ReflectServerOptions } from "@rocicorp/reflect/server";
import { mutators, M } from "../src/mutators";

function makeOptions(): ReflectServerOptions<M> {
  return {
    mutators,
    logLevel: "debug",
  };
}

export { makeOptions as default };
