import * as path from "node:path";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import rootConfig from "../../vite.config";

import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	...rootConfig,
	resolve: {
		alias: [
			{ find: "@src", replacement: path.resolve(__dirname, "src") },
			{
				find: "@assets",
				replacement: path.resolve(__dirname, "src/assets"),
			},
			{
				find: "@assets",
				replacement: path.resolve(__dirname, "assets"),
			},
			{
				find: "@styles",
				replacement: path.resolve(
					__dirname,
					"../../styled-system/css/css",
				),
			},
		],
	},
	plugins: [react(), svgr()],
});
