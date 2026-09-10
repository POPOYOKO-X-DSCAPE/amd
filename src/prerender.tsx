import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter, StaticRouter } from "react-router-dom";

import { PageChangeAnimation } from "./components/pageChangeAnimation/page-change-animation";
import { AnimationProvider } from "./contexts/animation-context";
import { ColorModeProvider } from "./contexts/color-mode-context";
import { LanguageProvider } from "./contexts/language-context";
import { AllRoutes } from "./routes/routes";
import { Main } from "./layouts/main";
import { routerBasename } from "./router-base";
import "../../../styled-system/styles.css";

export function App({ url = "/" }) {
  const isServer = typeof window === "undefined";

  const RoutesTree = (
    <LanguageProvider>
      <PageChangeAnimation />
      <Main>
        <AllRoutes />
      </Main>
    </LanguageProvider>
  );

  return (
    <ColorModeProvider>
      <AnimationProvider>
        {isServer ? (
          <StaticRouter
            location={
              routerBasename ? `${routerBasename}${url}` : url
            }
            basename={routerBasename}
          >
            {RoutesTree}
          </StaticRouter>
        ) : (
          <BrowserRouter basename={routerBasename}>{RoutesTree}</BrowserRouter>
        )}
      </AnimationProvider>
    </ColorModeProvider>
  );
}

if (typeof window !== "undefined") {
  const target = document.getElementById("root");
  if (target) {
    import.meta.env.DEV
      ? createRoot(target).render(<App />)
      : hydrateRoot(target, <App />);
  }
}

interface PrerenderData {
  ssr: boolean;
  url: string;
  route: unknown;
}

export async function prerender(data: PrerenderData) {
  const { renderToString } = await import("react-dom/server");
  const { parseLinks } = await import("vite-prerender-plugin/parse");

  const html = await renderToString(<App url={data.url} />);
  const links = parseLinks(html);

  return { html, links };
}
