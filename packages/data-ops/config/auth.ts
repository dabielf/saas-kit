// packages/data-ops/config/auth.ts
import { createBetterAuth } from "@/auth/setup";
import { getDb } from "@/database/setup";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = createBetterAuth({
  database: drizzleAdapter(getDb(),
    {
      provider: "sqlite",
    },
  ),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }
  }
});
