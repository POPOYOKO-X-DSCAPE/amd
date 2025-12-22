import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Main } from "./layouts/main";

import { Stack } from "@packages/ui";
import useMobile from "@packages/ui/hooks/use-mobile";
import type React from "react";
import ArrowLeft from "../src/assets/svgs/ArrowLeft.svg?react";
import { Button } from "./components/button";
import ListElement from "./components/list-element";
import { PageChangeAnimation } from "./components/pageChangeAnimation/page-change-animation";
import { ProjectCard } from "./components/project-card";
import { ProjectCardCarrousel } from "./components/project-card-carrousel";
import Section from "./components/section";
import { AnimationProvider } from "./contexts/animation-context";
import { ColorModeProvider } from "./contexts/color-mode-context";
import { LanguageProvider, useLang } from "./contexts/language-context";
import { editorials } from "./editorials";
import usePageTransition from "./hooks/usePageTransition";
import { PageNotFound } from "./pages/404";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { styles } from "./styles";

type LangKey = keyof typeof editorials;
type EditorialLang = (typeof editorials)[LangKey];
type EditorialRoute = EditorialLang["routes"][number];
type RealPageProp = EditorialRoute["pageProps"][number];

interface ProjectInfo {
  slug: string;
  title: string;
  image: string;
  alt?: string;
}

interface IRenderedRoutes {
  pageProps: RealPageProp[];
  currentPath?: string;
  language?: "fr" | "en";
}

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

const getCategoryProjects = (
  language: "fr" | "en",
  categorySlug: string
): ProjectInfo[] => {
  const langData = editorials[language.toUpperCase() as LangKey];

  const findCategory = (routes: any[]): any => {
    for (const route of routes) {
      if (route.slug === categorySlug) {
        return route;
      }
      if (Array.isArray(route.pageProps)) {
        for (const prop of route.pageProps) {
          if (prop.type === "project-list" && Array.isArray(prop.pageProp)) {
            for (const project of prop.pageProp) {
              if (project.slug === categorySlug) {
                return project;
              }
            }
          }
        }
      }
    }
    return null;
  };

  const category = findCategory(langData.routes);
  if (!category) return [];

  const projects: ProjectInfo[] = [];
  if (Array.isArray(category.pageProps)) {
    for (const prop of category.pageProps) {
      if (prop.type === "project-list" && Array.isArray(prop.pageProp)) {
        for (const project of prop.pageProp) {
          let firstImage = "";
          let altText = "";
          if (Array.isArray(project.pageProps)) {
            for (const projectProp of project.pageProps) {
              if (projectProp.type === "image" && projectProp.pageProp.path) {
                firstImage = `/src/editorial-contents/${projectProp.pageProp.path}`;
                altText = projectProp.pageProp.alt || "";
                break;
              }
            }
          }

          projects.push({
            slug: project.slug,
            title: kebabToCustomCase(project.slug),
            image: firstImage,
            alt: altText,
          });
        }
      }
    }
  }

  return projects;
};

const RouteContent = ({
  pageProps,
  currentPath,
  language,
}: IRenderedRoutes) => {
  let headingVideoPath: string | null = null;
  let headingVideoAlt: string | null = null;
  let sectionTitle = "";
  let sectionNumber = "";
  let insideSectionTitle = "";
  const sectionContent: React.ReactElement[] = [];

  const navigate = useNavigate();
  const { transitionTo } = usePageTransition();
  const location = useLocation();
  const isMobile = useMobile(1100);

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
              level="secondary"
              onClick={() => transitionTo(goBackLink())}
            >
              <ArrowLeft />
              {pageProp.pageProp}
            </Button>
          </Stack>
        );
        break;
      case "image":
        sectionContent.push(
          <Stack direction="row" alignItems="end">
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
      case "project-list":
        sectionContent.push(
          <Stack>
            {pageProp.pageProp.map((a, i) => (
              <ListElement
                label={kebabToCustomCase(a.slug)}
                onClick={() => transitionTo(a.slug)}
                key={`${a.slug}-${i}`}
              />
            ))}
          </Stack>
        );
        break;
      default:
    }
  }

  const isProjectPage =
    currentPath &&
    language &&
    !pageProps.some((prop) => prop.type === "project-list");

  let categoryProjects: ProjectInfo[] = [];
  if (isProjectPage && currentPath && language) {
    const pathParts = currentPath.split("/").filter((p) => p);
    const allProjectsIndex = pathParts.findIndex(
      (part) => part === "all-projects"
    );
    if (allProjectsIndex !== -1 && allProjectsIndex + 1 < pathParts.length) {
      const categorySlug = pathParts[allProjectsIndex + 1];
      categoryProjects = getCategoryProjects(language, categorySlug);
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
      {categoryProjects.length > 0 &&
        (isMobile ? (
          <ProjectCardCarrousel children={categoryProjects} />
        ) : (
          <ProjectCard children={categoryProjects} />
        ))}
    </Stack>
  );
};

const RenderedRoutes = () => {
  const routes: React.ReactElement[] = [];
  const { language } = useLang();

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
        element={
          <RouteContent
            pageProps={routeData.pageProps}
            currentPath={endPath}
            language={language}
          />
        }
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

  return routes;
};

const AllRoutes = () => {
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

const AMD = () => {
  return (
    <ColorModeProvider>
      <AnimationProvider>
        <Router>
          <LanguageProvider>
            <PageChangeAnimation />
            <Main>
              <AllRoutes />
            </Main>
          </LanguageProvider>
        </Router>
      </AnimationProvider>
    </ColorModeProvider>
  );
};

export default AMD;
