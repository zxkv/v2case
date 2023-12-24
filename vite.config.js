import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";

import { resolve } from "path";

export default defineConfig({
	plugins: [vue()],
	base: "/v2case/",
	server: {
		open: true,
		host: true,
		port: 3000
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "src")
		}
	}
});
