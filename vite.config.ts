import {
	copyFileSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	statSync,
} from "node:fs";
import { join } from "node:path";
import { defineConfig } from "vite";
import { vitePrerenderPlugin } from "vite-prerender-plugin";
import rootConfig from "../../vite.config";
import { editorials } from "./src/editorials";

type EditorialPageProp = {
	type?: string;
	// biome-ignore lint/suspicious/noExplicitAny: external data shape varies
	pageProp?: any;
};

type EditorialRoute = {
	slug: string;
	pageProps?: EditorialPageProp[];
};

const buildPrerenderRoutes = () => {
	const routes = new Set<string>(["/"]);

	const walkRoutes = (route: EditorialRoute, basePath: string) => {
		const currentPath = `${basePath}/${route.slug}`.replace(
			/\/+/g,
			"/",
		);
		routes.add(currentPath);

		for (const prop of route.pageProps ?? []) {
			if (
				prop.type === "project-list" &&
				Array.isArray(prop.pageProp)
			) {
				for (const child of prop.pageProp) {
					walkRoutes(child, currentPath);
				}
			}
		}
	};

	for (const [langKey, langData] of Object.entries(editorials)) {
		const lang = `/${langKey.toLowerCase()}`;
		routes.add(`${lang}/`);
		routes.add(`${lang}/contact/`);

		for (const route of langData.routes ?? []) {
			walkRoutes(route, lang);
		}
	}

	return Array.from(routes);
};

const prerenderRoutes = buildPrerenderRoutes();

const pluginsWithoutPrerender =
	(rootConfig.plugins ?? []).filter(
		(plugin) =>
			!(
				typeof plugin === "object" &&
				plugin !== null &&
				"name" in plugin &&
				(plugin as { name?: string }).name === "vite-prerender-plugin"
			),
	) ?? [];

const copyPreservedFolders = () => {
	const srcRoot = "src/editorial-contents"; // dossier contenant ce qu’on veut garder
	const destRoot = "dist/src/editorial-contents";

	const copyRecursive = (src: string, dest: string) => {
		mkdirSync(dest, { recursive: true });
		for (const entry of readdirSync(src)) {
			const srcPath = join(src, entry);
			const destPath = join(dest, entry);
			if (statSync(srcPath).isDirectory()) {
				copyRecursive(srcPath, destPath);
			} else {
				copyFileSync(srcPath, destPath);
			}
		}
	};

	copyRecursive(srcRoot, destRoot);
};

const duplicateCssNextToHtml = () => {
	const distRoot = "dist";
	const assetsDir = join(distRoot, "assets");
	if (
		!statSync(distRoot).isDirectory() ||
		!statSync(assetsDir).isDirectory()
	)
		return;

	const cssAsset =
		readdirSync(assetsDir).find(
			(file) => file.endsWith(".css") && file.startsWith("prerender-"),
		) ?? readdirSync(assetsDir).find((file) => file.endsWith(".css"));

	if (!cssAsset) return;

	const cssSource = join(assetsDir, cssAsset);

	const processDir = (dir: string) => {
		for (const entry of readdirSync(dir)) {
			const fullPath = join(dir, entry);
			const stats = statSync(fullPath);

			if (stats.isDirectory()) {
				if (entry !== "assets") {
					processDir(fullPath);
				}
				continue;
			}

			if (entry.endsWith(".html")) {
				const cssDest = join(dir, "style.css");
				copyFileSync(cssSource, cssDest);

				const html = readFileSync(fullPath, "utf8");
				const updated = html.replace(
					/href="\/assets\/[^"]+\.css"/g,
					'href="./style.css"',
				);
				writeFileSync(fullPath, updated, "utf8");
			}
		}
	};

	processDir(distRoot);
};

export default defineConfig({
	...rootConfig,
	plugins: [
		...pluginsWithoutPrerender,
		vitePrerenderPlugin({
			renderTarget: "#root",
			additionalPrerenderRoutes: prerenderRoutes,
		}),
		{
			name: "preserve-folders",
			closeBundle() {
				copyPreservedFolders();
			},
		},
		{
			name: "duplicate-css-next-to-html",
			closeBundle() {
				duplicateCssNextToHtml();
			},
		},
	],
});
