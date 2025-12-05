import { createMiddleware } from "@tanstack/react-start";
import { env } from "cloudflare:workers";

export const exampleMiddlewareWithContext = createMiddleware({
  type: "function",
}).server(async ({ next }) => {
  console.log("Executing exampleMiddlewareWithContext");
  return await next({
    context: {
      data: "Some Data From Middleware",
      foo: "bar",
      myVar: env.MY_VAR,
    },
  });
});
