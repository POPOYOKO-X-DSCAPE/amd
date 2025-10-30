import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import editorials from "./editorials.json";
import { Main } from "./layouts/main";
import { Home } from "./pages/Home";

const AMD = () => {
  return (
    <Router>
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
          {editorials.FR.routes.map((route, index) => {
            return (
              <Route
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={index}
                path={route.slug}
                element={route.pageProps.toString()}
              />
            );
          })}
        </Routes>
      </Main>
    </Router>
  );
};

export default AMD;
