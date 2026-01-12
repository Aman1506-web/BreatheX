/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as admin from "../admin.js";
import type * as cart from "../cart.js";
import type * as http from "../http.js";
import type * as orders from "../orders.js";
import type * as plans from "../plans.js";
import type * as schema__shared from "../schema/_shared.js";
import type * as schema_cart from "../schema/cart.js";
import type * as schema_orders from "../schema/orders.js";
import type * as schema_programs from "../schema/programs.js";
import type * as schema_users from "../schema/users.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  admin: typeof admin;
  cart: typeof cart;
  http: typeof http;
  orders: typeof orders;
  plans: typeof plans;
  "schema/_shared": typeof schema__shared;
  "schema/cart": typeof schema_cart;
  "schema/orders": typeof schema_orders;
  "schema/programs": typeof schema_programs;
  "schema/users": typeof schema_users;
  users: typeof users;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
