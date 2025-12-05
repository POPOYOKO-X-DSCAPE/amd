import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { StaticRouter } from "react-router-dom";

import { useLang } from "./contexts/language-context.tsx";
import { PageNotFound } from "./pages/404/index.tsx";
import { Contact } from "./pages/Contact/index.tsx";
import { Home } from "./pages/Home/index.tsx";
import { RenderedRoutes } from "./routes/routes.js";
import "../../../styled-system/styles.css";

// Is this really the going practice?
const Router = typeof window !== "undefined" ? BrowserRouter : StaticRouter;

export function App({ url }) {
  let language: string | undefined = "fr";
  if (typeof window !== "undefined") {
    language = useLang()?.language.toString();
  }
  return (
    <Router location={url}>
      <main>
        <Routes>
          <Route path={"/"} element={<Home />} />
          {/* <Route path={`${language}/contact/`} element={<Contact />} /> */}
          {/* {RenderedRoutes()} */}
          {/* <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
      </main>
    </Router>
  );
}

if (typeof window !== "undefined") {
  const target = document.getElementById("app");
  if (target) {
    import.meta.env.DEV
      ? createRoot(target).render(<App />)
      : hydrateRoot(target, <App />);
  }
}

export async function prerender(data) {
  const { renderToString } = await import("react-dom/server");
  const { parseLinks } = await import("vite-prerender-plugin/parse");

  const html = await renderToString(<App {...data} />);
  const links = parseLinks(html);

  return { html, links };
}
