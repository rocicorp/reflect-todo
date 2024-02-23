import type { ReflectServerOptions } from "@rocicorp/reflect/server";
import { mutators, M } from "../src/mutators";

function makeOptions(): ReflectServerOptions<M> {
  return {
    mutators,
  };
}

export { makeOptions as default };
