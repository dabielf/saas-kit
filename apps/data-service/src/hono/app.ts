import { Hono } from "hono";

export const app = new Hono<{ Bindings: Env }>();

app.get("/", (c) => {
  return c.text("Hello World");
});

app.get("/example-durable-object", async (c) => {
  const doId = c.env.EXAMPLE_DURABLE_OBJECT.idFromName("example-durable-object");
  const stub = c.env.EXAMPLE_DURABLE_OBJECT.get(doId);
  return c.text(await stub.getData() || "");
});

app.post("/example-durable-object", async (c) => {
  const doId = c.env.EXAMPLE_DURABLE_OBJECT.idFromName("example-durable-object");
  const stub = c.env.EXAMPLE_DURABLE_OBJECT.get(doId);
  await stub.saveData(c.body.toString());
  return c.text("Data saved");
})