import { BrowserRouter as Router } from "react-router-dom";
import { Main } from "./layouts/main";

import { PageChangeAnimation } from "./components/pageChangeAnimation/page-change-animation";
import { AnimationProvider } from "./contexts/animation-context";
import { ColorModeProvider } from "./contexts/color-mode-context";
import { LanguageProvider } from "./contexts/language-context";
import { AllRoutes } from "./routes/routes";

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
