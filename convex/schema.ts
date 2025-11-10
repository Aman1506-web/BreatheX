import { defineSchema } from "convex/server";
import { usersSchema } from "./schema/users";
import { programsSchema } from "./schema/programs";

export default defineSchema({
  ...usersSchema,
  ...programsSchema,
});
