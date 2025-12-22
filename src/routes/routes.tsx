import { Stack } from "@packages/ui";
import useMobile from "@packages/ui/hooks/use-mobile";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Button } from "../components/button";
import ListElement from "../components/list-element";
import { ProjectCard } from "../components/project-card";
import { ProjectCardCarrousel } from "../components/project-card-carrousel";
import Section from "../components/section";
import { useLang } from "../contexts/language-context.tsx";
import { editorials } from "../editorials";
import usePageTransition from "../hooks/usePageTransition";
import { PageNotFound } from "../pages/404/index.tsx";
import { Contact } from "../pages/Contact/index.tsx";
import { Home } from "../pages/Home/index.tsx";
import { styles } from "../styles.ts";

type LangKey = keyof typeof editorials;
type EditorialLang = (typeof editorials)[LangKey];
type EditorialRoute = EditorialLang["routes"][number];
type RealPageProp = EditorialRoute["pageProps"][number];

type ImagePageProp = Extract<RealPageProp, { type: "image" }> & {
  pageProp: {
    path: string;
    alt: string;
    text?: string;
  };
};

const kebabToCustomCase = (kebabStr: string): string => {
  return kebabStr
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const extractNumber = (input: string): string => {
  const match = input.match(/(\d+)/);
  return match ? match[0] : "99";
};

interface IRenderedRoutes {
  pageProps: RealPageProp[];
}

export const RouteContent = ({ pageProps }: IRenderedRoutes) => {
  let headingVideoPath: string | null = null;
  let headingVideoAlt: string | null = null;
  let sectionTitle = "";
  let sectionNumber = "";
  let insideSectionTitle = "";
  const sectionContent: React.ReactElement[] = [];

  const { transitionTo } = usePageTransition();
  const location = useLocation();
  const isMobile = useMobile();

  const goBackLink = () => {
    const currentPath = location.pathname;

    const newPath = currentPath.substring(0, currentPath.lastIndexOf("/"));
    if (newPath === "") {
      return "/";
    }
    return newPath;
  };

  for (const pageProp of pageProps) {
    switch (pageProp.type) {
      case "section":
        sectionTitle = pageProp.pageProp.title;
        sectionNumber = extractNumber(pageProp.pageProp.number);
        break;
      case "title":
        insideSectionTitle = pageProp.pageProp;
        break;
      case "video":
        headingVideoPath = pageProp.pageProp.path;
        headingVideoAlt = pageProp.pageProp.alt;
        break;
      case "text":
        sectionContent.push(
          <p className={styles.fluxText}>{pageProp.pageProp}</p>
        );
        break;
      case "button":
        sectionContent.push(
          <Stack className={styles.fluxButton}>
            <Button
              label={pageProp.pageProp}
              onClick={() => transitionTo(goBackLink())}
            />
          </Stack>
        );
        break;
      case "image": {
        sectionContent.push(
          <Stack direction="row">
            <img
              alt={pageProp.pageProp.alt}
              src={`/src/editorial-contents/${pageProp.pageProp.path}`}
              className={styles.fluxImg}
            />
            {pageProp.pageProp.text && !isMobile && (
              <p>{pageProp.pageProp.text}</p>
            )}
          </Stack>
        );
        break;
      }
      case "project-list":
        sectionContent.push(
          <Stack>
            {isMobile ? (
              <ProjectCardCarrousel
                projects={pageProp.pageProp.map((project) => ({
                  image: project.image,
                  title: project.title,
                  alt: project.alt || project.title,
                  slug: project.slug,
                }))}
                onProjectClick={(slug) => transitionTo(slug)}
              />
            ) : (
              pageProp.pageProp.map((project, i) => (
                <ProjectCard
                  key={`${project.slug}-${i}`}
                  image={project.image}
                  title={project.title}
                  alt={project.alt || project.title}
                  onClick={() => transitionTo(project.slug)}
                />
              ))
            )}
          </Stack>
        );
        break;
      default:
    }
  }

  return (
    <Stack>
      {headingVideoPath && (
        <video
          src={`/src/editorial-contents/${headingVideoPath}`}
          // controls
          aria-label={headingVideoAlt || "null"}
          autoPlay
          muted
          loop
          playsInline
        />
      )}
      <Section
        title={sectionTitle}
        number={sectionNumber}
        insideTitle={insideSectionTitle}
      >
        {sectionContent}
      </Section>
    </Stack>
  );
};

export const RenderedRoutes = () => {
  const routes: React.ReactElement[] = [];

  const buildRoutes = (
    // biome-ignore lint/suspicious/noExplicitAny: <Cannot know exact values>
    routeData: Record<string, any>,
    language: "fr" | "en",
    parentPath = ""
  ) => {
    const endPath = `${parentPath}/${routeData.slug}`.replace(/\/+/g, "/");

    routes.push(
      <Route
        key={`${endPath}`}
        path={`${language}${endPath}`}
        element={<RouteContent pageProps={routeData.pageProps} />}
      />
    );

    if (Array.isArray(routeData.pageProps)) {
      for (const element of routeData.pageProps) {
        if (
          element.type === "project-list" &&
          Array.isArray(element.pageProp)
        ) {
          for (const project of element.pageProp) {
            buildRoutes(project, language, endPath);
          }
        }
      }
    }
  };

  for (const [lang, data] of Object.entries(editorials)) {
    if (Array.isArray(data.routes)) {
      for (const route of data.routes) {
        buildRoutes(route, lang.toLowerCase());
      }
    }
  }

  if (routes.length === 0) return null;
  console.log(routes);

  return routes;
};

export const AllRoutes = () => {
  const { language } = useLang();

  return (
    <Routes>
      <Route path={"/"} element={<Navigate to={`${language}/`} />} />
      <Route path={`${language}/`} element={<Home />} />
      <Route path={`${language}/contact/`} element={<Contact />} />
      {RenderedRoutes()}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export async function prerender(data) {
  const { renderToString } = await import("react-dom/server");
  const { parseLinks } = await import("vite-prerender-plugin/parse");

  const html = await renderToString(<App {...data} />);
  const links = parseLinks(html);

  return { html, links };
}
