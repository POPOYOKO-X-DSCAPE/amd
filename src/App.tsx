import { Heading } from "@ariakit/react";
import { css } from "@styles";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import type {
  JSONEditorials,
  PageProp,
  PagePropType,
} from "./create-editorial-object";
import { Main } from "./layouts/main";
import { Home } from "./pages/Home";

import { Button } from "./components/button";
import Section from "./components/section";
import editorials from "./editorials.json";
const editorialContents: JSONEditorials = editorials as JSONEditorials;

interface IRenderedRoutes {
  pageProps: PageProp[];
}

const RouteContent = ({ pageProps }: IRenderedRoutes) => {
  let headingVideoPath = null;
  let sectionTitle = "";
  let sectionNumber = "";
  let insideSectionTitle = "";
  const sectionContent = [];

  for (let i = 0; i < pageProps.length; i++) {
    const pageProp = pageProps[i];
    switch (pageProp.type) {
      case "section":
        sectionTitle = pageProp.pageProp.title as string;
        sectionNumber = pageProp.pageProp.number as string;
        break;
      case "title":
        insideSectionTitle = pageProp.pageProp as string;
        break;
      case "video":
        headingVideoPath = pageProp.pageProp as string;
        break;
      case "button":
        sectionContent.push(<Button label={pageProp.pageProp} />);
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
  const routes = [];

  for (let i = 0; i < Object.entries(editorialContents).length; i++) {
    const language = Object.entries(editorialContents)[i];
    if (language[0] === "FR") {
      for (let i = 0; i < language[1].routes.length; i++) {
        const route = language[1].routes[i];
        routes.push(
          <Route
            key={i}
            path={route.slug}
            element={<RouteContent pageProps={route.pageProps} />}
          />
        );
      }
    }
  }

  if (routes.length === 0) {
    return null;
  }
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
