import { defineSchema } from "convex/server";
import { usersSchema } from "./schema/users";
import { programsSchema } from "./schema/programs";
import { cartSchema } from "./schema/cart";
import { ordersSchema } from "./schema/orders";

export default defineSchema({
  ...usersSchema,
  ...programsSchema,
  ...cartSchema,
  ...ordersSchema,
});
