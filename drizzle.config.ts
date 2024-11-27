import { defineConfig } from 'drizzle-kit';
import { env } from './src/config/env';

export default defineConfig({
	dialect: 'turso',
	schema: './src/database/schema',
	out: './drizzle',
	dbCredentials: {
		url: env.TURSO_DATABASE,
		authToken: env.TURSO_TOKEN,
	}
});
