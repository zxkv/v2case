import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue2";
import envHtml from "vite-plugin-env-html";
import { resolve } from "path";

export default defineConfig(mode => {
	const env = loadEnv(mode, process.cwd(), "");
	// const title = env.VITE_APP_TITLE || "v2case";
	const hasProd = env.VITE_APP_ENV === "production";

	return {
		plugins: [vue(), envHtml(env)],
		base: hasProd ? "/v2case/" : "/",
		server: {
			open: true,
			cors: true,
			host: true,
			port: 3000,
			proxy: {
				[env.VITE_APP_API]: {
					target: "http://localhost:3000",
					changeOrigin: true,
					rewrite: path => path.replace("^" + env.VITE_APP_API, "")
				}
			}
		},
		resolve: {
			alias: {
				"@": resolve(__dirname, "src")
			}
		}
	};
});
