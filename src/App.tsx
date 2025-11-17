import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Main } from "./layouts/main";
import { Home } from "./pages/Home";

import { Stack } from "@packages/ui";
import type React from "react";
import { Button } from "./components/button";
import ListElement from "./components/list-element";
import { PageChangeAnimation } from "./components/pageChangeAnimation/page-change-animation";
import Section from "./components/section";
import { AnimationProvider } from "./contexts/animation-context";
import { ColorModeProvider } from "./contexts/color-mode-context";
import { LanguageProvider, useLang } from "./contexts/language-context";
import { editorials } from "./editorials";
import usePageTransition from "./hooks/usePageTransition";
import { Contact } from "./pages/Contact";
import { styles } from "./styles";

type LangKey = keyof typeof editorials;
type EditorialLang = (typeof editorials)[LangKey];
type EditorialRoute = EditorialLang["routes"][number];
type RealPageProp = EditorialRoute["pageProps"][number];

interface IRenderedRoutes {
  pageProps: RealPageProp[];
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

const RouteContent = ({ pageProps }: IRenderedRoutes) => {
  let headingVideoPath: string | null = null;
  let headingVideoAlt: string | null = null;
  let sectionTitle = "";
  let sectionNumber = "";
  let insideSectionTitle = "";
  const sectionContent: React.ReactElement[] = [];

  const navigate = useNavigate();
  const { transitionTo } = usePageTransition();
  const location = useLocation();

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
      case "image":
        sectionContent.push(
          <Stack>
            <img
              alt={pageProp.pageProp.alt}
              src={`/src/editorial-contents/${pageProp.pageProp.path}`}
              className={styles.fluxImg}
            />
          </Stack>
        );
        break;
      case "project-list":
        sectionContent.push(
          <Stack>
            {pageProp.pageProp.map((a, i) => (
              <ListElement
                label={kebabToCustomCase(a.slug)}
                onClick={() => navigate(a.slug)}
                key={`${a.slug}-${i}`}
              />
            ))}
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

  console.log(routes.map((route) => route.props?.path).join("\n"));

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
      <Route path="*" element={"404"} />
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
