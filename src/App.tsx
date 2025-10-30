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

import Section from "./components/section";
import editorials from "./editorials.json";
const editorialContents: JSONEditorials = JSON.parse(editorials);

interface IRenderedRoutes {
  pageProps: PageProp[];
}

const RouteContent = ({ pageProps }: IRenderedRoutes) => {
  let sectionTitle = "";
  let sectionNumber = "";

  for (let i = 0; i < pageProps.length; i++) {
    const pageProp = pageProps[i];
    if (pageProp.type === "section") {
      sectionTitle = pageProp.pageProp.title;
      sectionNumber = pageProp.pageProp.number;
    }
  }
  return (
    <Section title={sectionTitle} number={sectionNumber}>
      {pageProps[0].type}
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

  //   let sectionElements = [];
  //   let sectionTitle = "";
  //   let sectionNumber = "";

  //   switch (propType) {
  //     case "text":
  //       sectionElements.push(
  //         <p className={css({ textStyle: "body.s" })}>{pageProp}</p>
  //       );
  //     case "title":
  //       sectionTitle = pageProp;
  //     default:
  //       sectionElements.push("error component not found"); // Handle other cases or errors
  //   }
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
