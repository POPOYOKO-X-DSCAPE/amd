import fs from "node:fs";
import path from "node:path";

type PageNode = {
  name: string;
  path: string;
  children?: PageNode[];
};

const ROOT_DIR = path.resolve("src/pages");

const formatSegment = (segment: string) =>
  segment.replace(/\.tsx$/, "").toLowerCase();

const generateTree = (dir: string, basePath = ""): PageNode[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    const segment = formatSegment(entry.name);
    const routePath = `${basePath}/${segment}`.replace(/\\/g, "/") || "/";

    if (entry.isDirectory()) {
      const children = generateTree(fullPath, routePath);
      return {
        name: segment,
        path: routePath,
        ...(children.length && { children }),
      };
    }

    if (
      entry.isFile() &&
      entry.name.endsWith(".tsx") &&
      entry.name !== "index.tsx"
    ) {
      return {
        name: segment,
        path: routePath,
      };
    }

    return [];
  });

const main = () => {
  const tree = { pages: generateTree(ROOT_DIR) };

  const home = tree.pages.find((p) => p.name === "home");
  if (home) home.path = "/";

  fs.writeFileSync("website-tree.json", JSON.stringify(tree, null, 2));
  console.log("✅ website-tree.json generated successfully!");
};

main();
