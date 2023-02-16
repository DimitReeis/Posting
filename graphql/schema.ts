import { builder } from "./builder";
import "./types/Post";
import "./types/User";

export const schema = builder.toSchema();
