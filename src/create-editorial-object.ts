import fs from "node:fs";
import path from "node:path";

// ----------------------
// Types
// ----------------------
export type PagePropType =
	| "section"
	| "title"
	| "text"
	| "image"
	| "slideshow"
	| "video"
	| "button"
	| "project-list"
	| "project-card"
	| "project-card-carrousel";

export type ProjectCardItem = {
	image: string;
	title: string;
	alt?: string;
	slug: string;
};

export type PagePropMap = {
	section: { title: string; number: string };
	title: string;
	text: string;
	image: { path: string; alt: string; text?: string };
	slideshow: PagePropMap["image"][];
	video: { path: string; alt: string };
	button: string;
	"project-list": EditorialRoute[];
	"project-card": ProjectCardItem[];
	"project-card-carrousel": ProjectCardItem[];
};

export type PageProp<T extends PagePropType = PagePropType> = {
	type: T;
	pageProp: PagePropMap[T];
};

export type EditorialRoute = {
	slug: string;
	pageProps: PageProp[];
};

export type JSONEditorials = {
	[lang: string]: {
		routes: EditorialRoute[];
	};
};

// ----------------------
// Utils
// ----------------------
const BASE_DIR = path.resolve("src/editorial-contents");

const readTextFile = (filePath: string): string =>
	fs.existsSync(filePath)
		? fs.readFileSync(filePath, "utf8").trim()
		: "";

const getDirectories = (src: string) =>
	fs
		.readdirSync(src)
		.filter((file) => fs.statSync(path.join(src, file)).isDirectory());

const getOrderedSubdirs = (src: string) =>
	getDirectories(src)
		.filter((dir) => /^\d+-/.test(dir))
		.map((dir) => {
			const [indexStr, ...rest] = dir.split("-");
			const type = rest.join("-") as PagePropType;
			return {
				index: Number.parseInt(indexStr, 10),
				type,
				dirPath: path.join(src, dir),
			};
		})
		.sort((a, b) => a.index - b.index);

const getOrderedDirsByIndex = (src: string) =>
	getDirectories(src)
		.map((dir) => {
			const m = dir.match(/^(\d+)-(.+)$/);
			if (m) {
				return {
					index: Number.parseInt(m[1], 10),
					name: m[2],
					dirPath: path.join(src, dir),
				};
			}
			return {
				index: Number.POSITIVE_INFINITY,
				name: dir,
				dirPath: path.join(src, dir),
			};
		})
		.sort((a, b) => a.index - b.index);

// ----------------------
// Core Builders
// ----------------------
const buildImageProp = (dirPath: string): PagePropMap["image"] => {
	const alt = readTextFile(path.join(dirPath, "alt.txt"));
	const text = readTextFile(path.join(dirPath, "text.txt"));
	const files = fs
		.readdirSync(dirPath)
		.filter(
			(f) =>
				!f.endsWith(".txt") &&
				!fs.statSync(path.join(dirPath, f)).isDirectory(),
		);

	const imgFile = files[0] ?? "";
	const relativePath = path.relative(
		BASE_DIR,
		path.join(dirPath, imgFile),
	);

	return {
		path: relativePath.replace(/\\/g, "/"),
		alt,
		...(text && { text }),
	};
};

const buildVideoProp = (dirPath: string): PagePropMap["video"] => {
	const alt = readTextFile(path.join(dirPath, "alt.txt"));
	const files = fs
		.readdirSync(dirPath)
		.filter(
			(f) =>
				!f.endsWith(".txt") &&
				!fs.statSync(path.join(dirPath, f)).isDirectory(),
		);

	const videoFile = files[0] ?? "";
	const relativePath = path.relative(
		BASE_DIR,
		path.join(dirPath, videoFile),
	);

	return { path: relativePath.replace(/\\/g, "/"), alt };
};

const buildPageProp = (
	type: PagePropType,
	dirPath: string,
): PageProp => {
	switch (type) {
		case "section":
			return {
				type,
				pageProp: {
					title: readTextFile(path.join(dirPath, "title.txt")),
					number: readTextFile(path.join(dirPath, "number.txt")),
				},
			};

		case "title":
		case "button":
		case "text": {
			const txtFiles = fs
				.readdirSync(dirPath)
				.filter(
					(f) =>
						f.endsWith(".txt") &&
						!fs.statSync(path.join(dirPath, f)).isDirectory(),
				);

			const firstTxt = txtFiles[0]
				? readTextFile(path.join(dirPath, txtFiles[0]))
				: "";

			return {
				type,
				pageProp: firstTxt,
			};
		}
		case "image":
			return {
				type,
				pageProp: buildImageProp(dirPath),
			};

		case "slideshow": {
			const subImages = getOrderedSubdirs(dirPath)
				.filter((s) => s.type === "image")
				.map((s) => buildImageProp(s.dirPath));
			return {
				type,
				pageProp: subImages,
			};
		}

		case "video": {
			return {
				type,
				pageProp: buildVideoProp(dirPath),
			};
		}

		case "project-list": {
			const orderedDirs = getOrderedDirsByIndex(dirPath);

			const routes: EditorialRoute[] = orderedDirs.map(
				({ name, dirPath: childPath }) =>
					buildEditorialRoute(name, childPath),
			);

			return { type, pageProp: routes };
		}

		case "project-card":
		case "project-card-carrousel": {
			return {
				type,
				pageProp: [],
			};
		}

		default:
			throw new Error(`Type inconnu: ${type}`);
	}
};

// ----------------------
// Editorial route builder (récursif)
// ----------------------
const buildEditorialRoute = (
	slug: string,
	routePath: string,
): EditorialRoute => {
	const [, cleanSlug = slug] = slug.split(/^\d+-/).filter(Boolean);

	const ordered = getOrderedSubdirs(routePath);
	const pageProps: PageProp[] = ordered.map(({ type, dirPath }) =>
		buildPageProp(type, dirPath),
	);

	const projectListFullPath = path.join(routePath, "project-list");
	if (
		fs.existsSync(projectListFullPath) &&
		fs.statSync(projectListFullPath).isDirectory()
	) {
		pageProps.push(buildPageProp("project-list", projectListFullPath));
	}

	return { slug: cleanSlug, pageProps };
};

// ----------------------
// Main builder
// ----------------------
export const buildEditorialsJSON = (): JSONEditorials => {
	const langs = getDirectories(BASE_DIR);
	const result: JSONEditorials = {};

	for (const lang of langs) {
		const langPath = path.join(BASE_DIR, lang);
		const slugs = getDirectories(langPath);

		const routes: EditorialRoute[] = slugs.map((slug) =>
			buildEditorialRoute(slug, path.join(langPath, slug)),
		);

		result[lang] = { routes };
	}

	return result;
};

// ----------------------
// Runner
// ----------------------
if (require.main === module) {
	const json = buildEditorialsJSON();

	// 💡 On génère maintenant un fichier TypeScript au lieu d’un JSON
	const outPath = path.resolve("src/editorials.ts");

	const fileContent = `// ⚙️ Fichier généré automatiquement – ne pas modifier\nimport type { JSONEditorials } from "./create-editorial-object";\n\nexport const editorials = ${JSON.stringify(json, null, 2)} as const satisfies JSONEditorials;\n`;

	fs.writeFileSync(outPath, fileContent, "utf8");
	console.log(`✅ editorials.ts généré dans ${outPath}`);
}
