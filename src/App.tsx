import { css } from "@styles";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Main } from "./layouts/main";
import { Home } from "./pages/Home";

import { Stack } from "@packages/ui";
import type React from "react";
import { Button } from "./components/button";
import ListElement from "./components/list-element";
import Section from "./components/section";
import { editorials } from "./editorials";

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
  let sectionTitle = "";
  let sectionNumber = "";
  let insideSectionTitle = "";
  const sectionContent: React.ReactElement[] = [];

  const navigate = useNavigate();

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
        headingVideoPath = pageProp.pageProp;
        break;
      case "text":
        sectionContent.push(
          <p className={css({ textStyle: "body.s" })}>{pageProp.pageProp}</p>
        );
        break;
      case "button":
        sectionContent.push(<Button label={pageProp.pageProp} />);
        break;
      case "image":
        sectionContent.push(
          <img
            alt={pageProp.pageProp.alt}
            src={`/src/editorial-contents/${pageProp.pageProp.path}`}
          />
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
    <Section
      title={sectionTitle}
      number={sectionNumber}
      insideTitle={insideSectionTitle}
    >
      {sectionContent}
    </Section>
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
    console.log(routeData);

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

  console.log("Routes", routes);
  return routes;
};

const AMD = () => {
  return (
    <Router>
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
          {RenderedRoutes()}
        </Routes>
      </Main>
    </Router>
  );
};

export default AMD;
