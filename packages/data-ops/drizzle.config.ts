// packages/data-ops/drizzle.config.ts
import type { Config } from "drizzle-kit";
const config: Config = {
  out: "./src/drizzle",
  dialect: "sqlite",
  driver: "d1-http",
  schema: ["./src/drizzle/auth-schema.ts"],
	dbCredentials: {
		accountId: process.env.CLOUDFLARE_ACCOUNT_ID || "",
		databaseId: process.env.CLOUDFLARE_DATABASE_ID || "",
		token: process.env.CLOUDFLARE_D1_TOKEN || "",
	},
	tablesFilter: ["!_cf_KV", "!auth_*"],
};

export default config satisfies Config;
