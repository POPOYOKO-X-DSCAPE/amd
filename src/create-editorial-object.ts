import fs from "node:fs";
import path from "node:path";

// ----------------------
// Types
// ----------------------
type PagePropType =
	| "section"
	| "title"
	| "text"
	| "image"
	| "slideshow"
	| "video"
	| "button"
	| "project-list";

type PagePropMap = {
	section: { title: string; number: string };
	title: string;
	text: string;
	image: { path: string; alt: string };
	slideshow: PagePropMap["image"][];
	video: string;
	button: string;
	"project-list": EditorialRoute[];
};

type PageProp<T extends PagePropType = PagePropType> = {
	type: T;
	pageProp: PagePropMap[T];
};

type EditorialRoute = {
	slug: string;
	pageProps: PageProp[];
};

type JSONEditorials = {
	[lang: string]: {
		routes: EditorialRoute[];
	};
};

// ----------------------
// Utils
// ----------------------
const BASE_DIR = path.resolve("editorial-contents");

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
			// sous-dossiers numérotés (1-image, 2-image...)
			const subImages = getOrderedSubdirs(dirPath)
				.filter((s) => s.type === "image")
				.map((s) => buildImageProp(s.dirPath));
			return {
				type,
				pageProp: subImages,
			};
		}

		case "video": {
			const files = fs
				.readdirSync(dirPath)
				.filter(
					(f) =>
						!f.endsWith(".txt") &&
						!fs.statSync(path.join(dirPath, f)).isDirectory(),
				);
			return {
				type,
				pageProp: files[0] ?? "",
			};
		}

		case "project-list": {
			// On récupère les sous-dossiers triés par préfixe numérique (1-name, 2-name, ...)
			const orderedDirs = getOrderedDirsByIndex(dirPath);

			const routes: EditorialRoute[] = orderedDirs.map(
				({ name, dirPath: childPath }) =>
					// `name` est déjà sans le préfixe numérique, on le passe comme slug propre
					buildEditorialRoute(name, childPath),
			);

			return { type, pageProp: routes };
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
	// Supprime le numéro éventuel dans le slug (ex: "1-project" -> "project")
	const [, cleanSlug = slug] = slug.split(/^\d+-/).filter(Boolean);

	const ordered = getOrderedSubdirs(routePath);
	const pageProps: PageProp[] = ordered.map(({ type, dirPath }) =>
		buildPageProp(type, dirPath),
	);

	// project-list non numéroté
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
	const outPath = path.resolve("editorials.json");
	fs.writeFileSync(outPath, JSON.stringify(json, null, 2), "utf8");
	console.log(`✅ JSONEditorials généré dans ${outPath}`);
}
