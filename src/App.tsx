import { css } from "@styles";
import {
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
import Section from "./components/section";
import { ColorModeProvider } from "./contexts/color-mode-context";
import { editorials } from "./editorials";
import { Contact } from "./pages/Contact";

type LangKey = keyof typeof editorials;
type EditorialLang = (typeof editorials)[LangKey];
type EditorialRoute = EditorialLang["routes"][number];
type RealPageProp = EditorialRoute["pageProps"][number];

interface IRenderedRoutes {
  pageProps: RealPageProp[];
}

const styles = {
  fluxImg: css({
    _desktop: {
      maxWidth: "60%",
    },
  }),
  fluxText: css({
    maxWidth: "70ch",
    textStyle: "body.s",
  }),
  fluxButton: css({
    _desktop: {
      maxWidth: "30%",
    },
  }),
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

const RouteContent = ({ pageProps }: IRenderedRoutes) => {
  let headingVideoPath: string | null = null;
  let headingVideoAlt: string | null = null;
  let sectionTitle = "";
  let sectionNumber = "";
  let insideSectionTitle = "";
  const sectionContent: React.ReactElement[] = [];

  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => {
    const currentPath = location.pathname;

    const newPath = currentPath.substring(0, currentPath.lastIndexOf("/"));
    if (newPath === "") {
      console.log(newPath);
      navigate("/");
    } else {
      navigate(newPath);
    }
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
            <Button label={pageProp.pageProp} onClick={() => handleGoBack()} />
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

  const buildRoutes = (
    lang: string,
    // biome-ignore lint/suspicious/noExplicitAny: <Cannot know exact values>
    routeData: Record<string, any>,
    parentPath = ""
  ) => {
    const fullPath = `${parentPath}/${routeData.slug}`.replace(/\/+/g, "/");

    routes.push(
      <Route
        key={`${lang}-${fullPath}`}
        path={fullPath}
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
            buildRoutes(lang, project, fullPath);
          }
        }
      }
    }
  };

  for (const [lang, data] of Object.entries(editorials)) {
    if (Array.isArray(data.routes)) {
      for (const route of data.routes) {
        buildRoutes(lang, route);
      }
    }
  }

  if (routes.length === 0) return null;

  return routes;
};

const AMD = () => {
  return (
    <ColorModeProvider>
      <Router>
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            {RenderedRoutes()}
          </Routes>
        </Main>
      </Router>
    </ColorModeProvider>
  );
};

export default AMD;
