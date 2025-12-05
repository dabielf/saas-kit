import { WorkerEntrypoint } from "cloudflare:workers";
export { ExampleDurableObject } from "@/durable-objects/example-durable-object";
import { app } from "@/hono/app";

export default class DataService extends WorkerEntrypoint<Env> {
  fetch(request: Request) {
    return app.fetch(request, this.env, this.ctx);
  }

  async saveData(data: string) {
    const doId = this.env.EXAMPLE_DURABLE_OBJECT.idFromName("example-durable-object");
    const stub = this.env.EXAMPLE_DURABLE_OBJECT.get(doId);
    return await stub.saveData(data);
  }

  async getData() {
    const doId = this.env.EXAMPLE_DURABLE_OBJECT.idFromName("example-durable-object");
    const stub = this.env.EXAMPLE_DURABLE_OBJECT.get(doId);
    return await stub.getData();
  }
}
