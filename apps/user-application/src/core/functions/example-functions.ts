import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { exampleMiddlewareWithContext } from "@/core/middleware/example-middleware";
import { env } from "cloudflare:workers";

const baseFunction = createServerFn().middleware([
  exampleMiddlewareWithContext,
]);

const ExampleInputSchema = z.object({
  exampleKey: z.string().min(1),
});

type ExampleInput = z.infer<typeof ExampleInputSchema>;

export const examplefunction = baseFunction
  .inputValidator((data: ExampleInput) => ExampleInputSchema.parse(data))
  .handler(async (ctx) => {
    const backend = await env.BACKEND_SERVICE.saveData(ctx.data.exampleKey)
    console.log("Backend response: ", backend)
    const backendData = await env.BACKEND_SERVICE.getData();
    console.log("Executing example function");
    console.log(`The data passed: ${JSON.stringify(ctx.data)}`);
    console.log(`The context from middleware: ${JSON.stringify(ctx.context)}`);
    console.log(`The Cloudflare Worker Environment: ${JSON.stringify(env)}`);
    return "Function executed successfully : " + backendData;
  });
