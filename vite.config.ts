import {
	copyFileSync,
	mkdirSync,
	readdirSync,
	statSync,
} from "node:fs";
import { join } from "node:path";
import { defineConfig } from "vite";
import rootConfig from "../../vite.config";

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

export default defineConfig({
	...rootConfig,
	plugins: [
		...(rootConfig.plugins ?? []),
		{
			name: "preserve-folders",
			closeBundle() {
				copyPreservedFolders();
			},
		},
	],
});
