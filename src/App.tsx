import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Main } from "./layouts/main";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";

const AMD = () => {
  return (
    <Router>
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Main>
    </Router>
  );
};

export default AMD;
