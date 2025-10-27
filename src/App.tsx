import React, { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { componentMap } from "./componentMap.tsx";
import { Main } from "./layouts/main";

import websiteTree from "../website-tree.json";

type PageNode = {
  name: string;
  path: string;
  children?: PageNode[];
};

const renderRoutes = (pages: PageNode[]): JSX.Element[] =>
  pages.flatMap((page) => {
    const Component = componentMap[page.path] || componentMap["/notfound"];
    const routes = [
      <Route key={page.path} path={page.path} element={<Component />} />,
    ];

    if (page.children) {
      routes.push(...renderRoutes(page.children));
    }

    return routes;
  });

const AMD = () => {
  return (
    <Router>
      <Main>
        <Routes>
          {renderRoutes(websiteTree.pages)}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </Main>
    </Router>
  );
};

export default AMD;
